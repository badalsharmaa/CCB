import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat, ArrowLeft, Send, Check, Users, Star, MapPin,
  Plus, Minus, X, CreditCard, Lock, Loader2, CheckCircle2,
  Search, ShoppingBag,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { MENU_ITEMS, CATEGORIES } from '../data/menu';

// ─── AI init ──────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

// ─── Guards ───────────────────────────────────────────────────────────────────
const MAX_MSGS        = 40;
const COOLDOWN_SECS   = 2;
const MAX_INPUT_LEN   = 500;
const CONTEXT_WINDOW  = 12;
const SESSION_KEY     = 'cc_catering_session';

const CODE_PATTERNS = [
  /```/, /\bfunction\s*\(/, /\b(const|let|var)\s+\w+\s*=/, /\bimport\s+/,
  /\bexport\s+(default|const|function)/, /\bclass\s+\w+/, /\bdef\s+\w+\s*\(/,
  /<script[\s>]/, /\bSELECT\b.*\bFROM\b/i, /\bINSERT\s+INTO\b/i,
  /\bDROP\s+TABLE\b/i, /=>/, /\bconsole\.(log|error)\(/, /\bdocument\./,
];
const OFF_TOPIC_PATTERNS = [
  /\b(hack|exploit|inject|sql|xss|csrf|ddos|malware|phishing)\b/i,
  /\b(politic|election|vote|president|congress|parliament)\b/i,
  /\b(religion|hindu|muslim|christian|church|mosque|temple)\b/i,
  /\b(sex|porn|adult|nude|naked|escort)\b/i,
  /\b(kill|murder|weapon|gun|bomb|terrorist)\b/i,
  /\b(competitor|zomato|swiggy|doordash|ubereats|grubhub)\b/i,
  /\b(invest|stock|crypto|bitcoin|ethereum|nft)\b/i,
  /\b(lawsuit|sue|legal action|attorney)\b/i,
];
const SENSITIVE_PATTERNS = [
  /\b(racist|racism|discrimination|slur)\b/i,
  /\b(hate|stupid|idiot|dumb|loser)\b.*\b(you|your|staff|owner)\b/i,
];

interface FilterResult { blocked: true; reason: string }
function preFilter(text: string): FilterResult | { blocked: false } {
  if (text.length > MAX_INPUT_LEN)
    return { blocked: true, reason: `Please keep messages under ${MAX_INPUT_LEN} characters.` };
  for (const p of CODE_PATTERNS)
    if (p.test(text))
      return { blocked: true, reason: "I'm your catering concierge — I can only help with food & event planning! 🍽️" };
  for (const p of OFF_TOPIC_PATTERNS)
    if (p.test(text))
      return { blocked: true, reason: "I can only help with catering, our menu, and restaurant questions. How can I help plan your event?" };
  for (const p of SENSITIVE_PATTERNS)
    if (p.test(text))
      return { blocked: true, reason: "Let's keep things friendly! I'm here to help plan your perfect event. 😊" };
  return { blocked: false };
}

function postValidate(text: string) {
  const cleaned = text.replace(/```[\s\S]*?```/g, '').trim();
  if (cleaned.length > 1000) return cleaned.slice(0, 1000) + '…';
  return cleaned;
}

function parseAction(raw: string): { text: string; action: string | null } {
  const m = raw.match(/\nACTION:(show_packages|show_custom_builder|show_booking)\s*$/);
  if (m) return { text: raw.replace(m[0], '').trim(), action: m[1] };
  return { text: raw, action: null };
}

interface SessionData { msgCount: number; lastMsgTime: number; }
function getSession(): SessionData {
  try { const r = sessionStorage.getItem(SESSION_KEY); if (r) return JSON.parse(r); } catch {}
  return { msgCount: 0, lastMsgTime: 0 };
}
function saveSession(d: SessionData) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(d)); } catch {}
}

// ─── Packages ─────────────────────────────────────────────────────────────────
interface CateringPackage { id: string; name: string; tagline: string; pricePerPerson: number; minGuests: number; includes: string[]; badge?: string; }

const PACKAGES: CateringPackage[] = [
  {
    id: 'street-party', name: 'Street Food Party', tagline: 'Calcutta on your table',
    pricePerPerson: 22, minGuests: 20,
    includes: ['Fuchka / Pani Puri', 'Pav Bhaji', 'Samosa Chaat', 'Jhal Muri', 'Singara (Samosa)', 'Gobi Manchurian', 'Mango Lassi'],
  },
  {
    id: 'classic-feast', name: 'Classic Bengali Feast', tagline: 'A full meal experience',
    pricePerPerson: 38, minGuests: 25, badge: 'Most Popular',
    includes: ['4 street food starters', 'Calcutta Dum Biryani', '2 curries of choice', 'Garlic Naan', 'Gulab Jamun or Rasmalai', 'Masala Tea'],
  },
  {
    id: 'royal-spread', name: 'Royal Premium Spread', tagline: 'The full Calcutta experience',
    pricePerPerson: 58, minGuests: 30,
    includes: ['6 street food starters', 'Calcutta Dum Biryani', 'Tandoori Chicken & Paneer Tikka', '3 premium curries', 'Assorted Naan', 'Full dessert bar', 'Mango Lassi + soft drinks'],
  },
];

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Priya, the catering concierge for Calcutta Chaat & Bakery — authentic Bengali street food in the Bay Area, California.

ABOUT US:
- Locations: Fremont (4906 Paseo Padre Pkwy) and Milpitas (81 S Main St)
- Hours: Mon–Thu 11am–9:30pm, Fri–Sat 11am–10pm, Sun 11am–9:30pm | Phone: 507-419-4523
- 500+ events catered | 10–2,000 guests | Bay Area wide

CATERING PACKAGES:
1. Street Food Party — $22/person (min 20): Fuchka, Pav Bhaji, Samosa Chaat, Jhal Muri, Singara, Gobi Manchurian, Mango Lassi
2. Classic Bengali Feast — $38/person (min 25): Street starters + Biryani + 2 curries + Naan + Dessert + Tea
3. Royal Premium Spread — $58/person (min 30): Full street spread + Biryani + Tandoori + 3 curries + Naan + Dessert bar + Drinks
4. Biryani & Kosha Trays — available in Full/Half trays (serves 20-22). Prices: Goat Biryani ($144.99 Full / $84.99 Half), Chicken Biryani ($134.99 Full / $79.99 Half), Goat Kosha ($220.00 Tray).
5. Custom Package — choose from our full menu, team provides quote

BOOKING: 25% advance deposit secures the date. Balance due on event day.

RULES:
- Only discuss catering, our menu, restaurant, Bengali/Indian food, and event planning
- Never discuss politics, religion, coding, finance, competitors, or anything unrelated
- Keep responses warm, concise (under 150 words per message), helpful
- Never invent prices or items outside what is listed above

ACTIONS — append exactly one of these on its own new line at the END of your reply ONLY when it makes sense:
- User asks to see packages / pricing / options → append: ACTION:show_packages
- User wants to pick specific items / build custom → append: ACTION:show_custom_builder
- User has chosen a package and wants to book / proceed / pay / advance → append: ACTION:show_booking
- For general questions, do NOT append any action.`;

// ─── Types ────────────────────────────────────────────────────────────────────
type ChatMsg =
  | { from: 'user'; text: string }
  | { from: 'ai'; text: string }
  | { from: 'ai'; widget: 'packages' }
  | { from: 'ai'; widget: 'custom_builder' }

interface BookingForm {
  name: string; email: string; phone: string;
  eventType: string; date: string; guests: string; venue: string; notes: string;
}
interface CardForm { name: string; number: string; expiry: string; cvv: string; }

// ─── Package Cards (inline chat widget) ───────────────────────────────────────
function PackageCards({ onSelect }: { onSelect: (pkg: CateringPackage) => void }) {
  return (
    <div className="grid gap-3 my-1">
      {PACKAGES.map(pkg => (
        <div key={pkg.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-brand-navy text-sm">{pkg.name}</h3>
                  {pkg.badge && <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full">{pkg.badge}</span>}
                </div>
                <p className="text-xs text-gray-400">{pkg.tagline}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-brand-orange">${pkg.pricePerPerson}</span>
                <span className="text-xs text-gray-400">/person</span>
                <p className="text-[10px] text-gray-400">min {pkg.minGuests} guests</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-1 mb-3">
              {pkg.includes.map(item => (
                <li key={item} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
                  <Check className="w-2.5 h-2.5 text-green-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect(pkg)}
              className="w-full py-2 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-orange transition-colors"
            >
              Select this package →
            </button>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-400 text-center">Want something different? Ask me to build a custom package.</p>
    </div>
  );
}

const CategoryIcon = ({ icon }: { icon: string }) => {
  if (icon.startsWith('/') || icon.startsWith('http')) {
    return <img src={icon} alt="" className="w-4 h-4 object-contain" />;
  }
  return <span>{icon}</span>;
};

// ─── Custom Item Builder (inline chat widget) ─────────────────────────────────
function CustomBuilder({ onComplete }: { onComplete: (items: { id: number; name: string; price: number; qty: number }[]) => void }) {
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState('Street Foods');

  const cats = CATEGORIES.filter(c => c.id !== 'All');
  const filtered = MENU_ITEMS.filter(i =>
    i.category === activeCategory &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find(i => i.id === Number(id));
    return sum + (item ? item.price * (qty as number) : 0);
  }, 0);
  const itemCount = Object.values(quantities).reduce((a, b) => (a as number) + (b as number), 0) as number;

  const adjust = (id: number, delta: number) => {
    setQuantities(prev => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) { const { [id]: _, ...rest } = prev; return rest; }
      return { ...prev, [id]: next };
    });
  };

  const handleCreate = () => {
    const items = Object.entries(quantities).map(([id, qty]) => {
      const item = MENU_ITEMS.find(i => i.id === Number(id))!;
      return { id: item.id, name: item.name, price: item.price, qty: qty as number };
    });
    onComplete(items);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden my-1">
      <div className="p-4 border-b border-gray-100">
        <p className="font-bold text-brand-navy text-sm mb-1">Build Your Custom Package</p>
        <p className="text-xs text-gray-400">Choose items — our team will confirm per-person pricing.</p>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search menu..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto p-3 scrollbar-hide">
        {cats.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeCategory === cat.id ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <CategoryIcon icon={cat.icon} /> {cat.name}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="max-h-52 overflow-y-auto divide-y divide-gray-50 px-3">
        {filtered.map(item => {
          const qty = quantities[item.id] ?? 0;
          return (
            <div key={item.id} className="flex items-center gap-2 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-navy truncate">{item.name}</p>
                <p className="text-[11px] text-brand-orange font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {qty > 0 && (
                  <>
                    <button onClick={() => adjust(item.id, -1)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-100 transition-colors">
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{qty}</span>
                  </>
                )}
                <button onClick={() => adjust(item.id, 1)} className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors text-brand-orange">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-xs text-gray-400 py-4 text-center">No items found.</p>}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-gray-400">{itemCount} item type{itemCount !== 1 ? 's' : ''} selected</p>
          {total > 0 && <p className="text-sm font-black text-brand-orange">~${total.toFixed(2)} base</p>}
        </div>
        <button
          onClick={handleCreate}
          disabled={itemCount === 0}
          className="px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl disabled:opacity-40 hover:bg-brand-orange transition-colors"
        >
          Create Package →
        </button>
      </div>
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
interface BookingModalProps {
  packageName: string;
  priceEstimate: number;
  onClose: () => void;
}

function BookingModal({ packageName, priceEstimate, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'confirmed'>('form');
  const [form, setForm] = useState<BookingForm>({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', venue: '', notes: '' });
  const [card, setCard] = useState<CardForm>({ name: '', number: '', expiry: '', cvv: '' });
  const [bookingId, setBookingId] = useState('');

  const advance = priceEstimate > 0 ? priceEstimate * 0.25 : 0;
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    // Auto-format MM/DD/YYYY
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = value.slice(0, 2);
      if (value.length > 2) {
        formattedValue += '/' + value.slice(2, 4);
        if (value.length > 4) {
          formattedValue += '/' + value.slice(4, 8);
        }
      }
    }
    setForm(f => ({ ...f, date: formattedValue }));
  };

  const fieldCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-orange transition-colors';

  const handleFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    await new Promise(r => setTimeout(r, 2200));
    setBookingId(`CAT-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    setStep('confirmed');
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <p className="font-bold text-brand-navy">{step === 'confirmed' ? 'Booking Confirmed!' : 'Book Your Catering'}</p>
              <p className="text-xs text-gray-400">{packageName}</p>
            </div>
            {step !== 'processing' && step !== 'confirmed' && (
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          <div className="p-6">

            {/* Step 1: Event Details */}
            {step === 'form' && (
              <form onSubmit={handleFormNext} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={fieldCls} />
                  <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={fieldCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={fieldCls} />
                  <input required placeholder="Event type (e.g. Wedding)" value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} className={fieldCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="MM/DD/YYYY" value={form.date} onChange={handleDateInput} maxLength={10} className={fieldCls} />
                  <input required placeholder="Guest count" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} className={fieldCls} />
                </div>
                <input placeholder="Venue / address" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} className={fieldCls} />
                <textarea placeholder="Special requests, dietary notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} className={`${fieldCls} resize-none`} />

                {advance > 0 && (
                  <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4">
                    <p className="text-xs text-gray-500">Advance deposit (25%)</p>
                    <p className="text-2xl font-black text-brand-orange">${advance.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">Balance due on event day</p>
                  </div>
                )}

                <button type="submit" className="w-full py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-orange transition-colors text-sm">
                  Continue to Payment →
                </button>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <form onSubmit={handlePayment} className="space-y-3">
                <div className="bg-brand-orange/5 rounded-xl p-4 mb-1">
                  <p className="text-xs text-gray-500 mb-1">Advance deposit</p>
                  <p className="text-2xl font-black text-brand-orange">${advance > 0 ? advance.toFixed(2) : '—'}</p>
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input required placeholder="Name on card" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} className={`${fieldCls} pl-10`} />
                </div>
                <input required placeholder="Card number" maxLength={19} value={card.number}
                  onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim() }))}
                  className={fieldCls} />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="MM/YY" maxLength={5} value={card.expiry}
                    onChange={e => { const v = e.target.value.replace(/\D/g,''); setCard(c => ({ ...c, expiry: v.length > 2 ? v.slice(0,2)+'/'+v.slice(2) : v })); }}
                    className={fieldCls} />
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required placeholder="CVV" maxLength={4} value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g,'') }))} className={`${fieldCls} pl-10`} />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Demo mode — no real charge</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep('form')} className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">Back</button>
                  <button type="submit" className="flex-1 py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-navy transition-colors text-sm">Pay ${advance > 0 ? advance.toFixed(2) : '0.00'} →</button>
                </div>
              </form>
            )}

            {/* Processing */}
            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
                <p className="font-semibold text-brand-navy">Processing your booking…</p>
                <p className="text-xs text-gray-400">Please don't close this window.</p>
              </div>
            )}

            {/* Confirmed */}
            {step === 'confirmed' && (
              <div className="py-8 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-brand-navy text-lg">Booking Confirmed!</p>
                  <p className="text-xs text-gray-400 mt-1">Reference: <span className="font-mono font-bold">{bookingId}</span></p>
                </div>
                <p className="text-sm text-gray-600">We'll reach out to {form.email} within 24 hours to finalise details. For urgent queries call <strong>507-419-4523</strong>.</p>
                <div className="flex gap-2 w-full mt-2">
                  <button onClick={onClose} className="flex-1 py-2.5 bg-brand-navy text-white text-sm font-bold rounded-xl hover:bg-brand-orange transition-colors">Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function CateringConcierge() {
  const [messages, setMessages]       = useState<ChatMsg[]>([]);
  const [input, setInput]             = useState('');
  const [isLoading, setIsLoading]     = useState(false);
  const [cooldownMsg, setCooldownMsg] = useState('');
  const [sessionCapped, setSessionCapped] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; priceEstimate: number } | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Keep Gemini history for context window
  const historyRef = useRef<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);

  useEffect(() => {
    const session = getSession();
    if (session.msgCount >= MAX_MSGS) { setSessionCapped(true); return; }
    // Opening greeting
    setMessages([{ from: 'ai', text: "Namaskar! 🙏 I'm Priya, your catering concierge. Tell me about your event — or ask to see our catering packages and pricing!" }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || sessionCapped) return;

    const session = getSession();
    if (session.msgCount >= MAX_MSGS) { setSessionCapped(true); return; }

    const secsSince = (Date.now() - session.lastMsgTime) / 1000;
    if (session.lastMsgTime && secsSince < COOLDOWN_SECS) {
      const wait = Math.ceil(COOLDOWN_SECS - secsSince);
      setCooldownMsg(`Please wait ${wait}s…`);
      setTimeout(() => setCooldownMsg(''), (wait + 0.5) * 1000);
      return;
    }

    const filter = preFilter(trimmed);
    if (filter.blocked) {
      setMessages(prev => [...prev, { from: 'user', text: trimmed }, { from: 'ai', text: filter.reason }]);
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    setIsLoading(true);

    session.msgCount += 1;
    session.lastMsgTime = Date.now();
    saveSession(session);
    if (session.msgCount >= MAX_MSGS) setSessionCapped(true);

    try {
      if (!ai) throw new Error('AI not configured');

      // Build context from last N chat text messages
      const textMessages = messages.filter((m): m is { from: 'user' | 'ai'; text: string } => 'text' in m);
      const context = textMessages.slice(-CONTEXT_WINDOW).map(m => ({
        role: m.from === 'ai' ? 'model' as const : 'user' as const,
        parts: [{ text: m.text }],
      }));
      context.push({ role: 'user', parts: [{ text: trimmed }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: context,
        config: { systemInstruction: SYSTEM_PROMPT },
      });

      const raw = response.text ?? "I'm having trouble right now. Please try again!";
      const validated = postValidate(raw);
      const { text: cleanText, action } = parseAction(validated);

      const newMsgs: ChatMsg[] = [{ from: 'ai', text: cleanText }];
      if (action === 'show_packages') newMsgs.push({ from: 'ai', widget: 'packages' });
      else if (action === 'show_custom_builder') newMsgs.push({ from: 'ai', widget: 'custom_builder' });
      else if (action === 'show_booking') setShowBooking(true);

      setMessages(prev => [...prev, ...newMsgs]);
    } catch {
      setMessages(prev => [...prev, { from: 'ai', text: "Sorry, I'm having a moment! Try again in a bit. 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, sessionCapped, messages]);

  const handlePackageSelect = (pkg: CateringPackage) => {
    setSelectedPackage({ name: pkg.name, priceEstimate: 0 }); // priceEstimate needs guest count
    setMessages(prev => [...prev, { from: 'ai', text: `Great choice! The **${pkg.name}** is at $${pkg.pricePerPerson}/person (min ${pkg.minGuests} guests). How many guests are you expecting? Once you tell me, I can calculate your advance deposit.` }]);
  };

  const handleCustomComplete = (items: { id: number; name: string; price: number; qty: number }[]) => {
    const baseTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    setSelectedPackage({ name: 'Custom Package', priceEstimate: baseTotal });
    const summary = items.map(i => `${i.name} ×${i.qty}`).join(', ');
    setMessages(prev => [...prev, { from: 'ai', text: `Perfect selection! I've noted: ${summary}. Our team will calculate your per-person price based on guest count. Ready to lock in the date? Click the button below to proceed with booking!` }]);
  };

  const handleGuestCountFromMessage = () => {
    if (!selectedPackage) return null;
    // Try to parse guest count from last user message
    const lastUser = [...messages].reverse().find(m => m.from === 'user' && 'text' in m);
    if (lastUser && 'text' in lastUser) {
      const match = lastUser.text.match(/\d+/);
      if (match) {
        const pkg = PACKAGES.find(p => p.name === selectedPackage.name);
        if (pkg) return pkg.pricePerPerson * parseInt(match[0]);
      }
    }
    return selectedPackage.priceEstimate;
  };

  // Render a single message or widget
  function renderMessage(msg: ChatMsg, i: number) {
    if ('widget' in msg) {
      return (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="ml-11"
        >
          {msg.widget === 'packages' && <PackageCards onSelect={handlePackageSelect} />}
          {msg.widget === 'custom_builder' && <CustomBuilder onComplete={handleCustomComplete} />}
        </motion.div>
      );
    }

    return (
      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className={`flex items-end gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.from === 'ai' ? 'bg-gradient-to-br from-brand-yellow to-brand-orange' : 'bg-brand-navy'}`}>
          {msg.from === 'ai' ? <ChefHat className="w-4 h-4 text-brand-navy" /> : <span className="text-white text-[10px] font-bold">You</span>}
        </div>
        <div className={`max-w-[80%] md:max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.from === 'ai' ? 'bg-white text-brand-navy rounded-bl-sm border border-brand-navy/8' : 'bg-brand-navy text-white rounded-br-sm'}`}>
          {msg.text}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-cream-light">

      {/* ── LEFT PANEL ──────────────────────────────────────────────────────────── */}
      <div className="relative hidden lg:flex lg:w-[38%] flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop" alt="Catering spread" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center mb-8 shadow-xl">
            <ChefHat className="w-6 h-6 text-brand-navy" />
          </div>
          <p className="text-brand-yellow text-xs font-bold uppercase tracking-[0.25em] mb-4">Catering Concierge</p>
          <h1 className="font-serif text-5xl text-white leading-[1.1] mb-6">Every event<br />deserves a<br /><span className="italic text-brand-yellow">Bengali feast.</span></h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">Chat with Priya — our AI concierge — to explore menus, build a custom package, and secure your date with an advance.</p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[{ icon: <Star className="w-4 h-4" />, label: '500+', sub: 'Events catered' }, { icon: <Users className="w-4 h-4" />, label: '10–2,000', sub: 'Guests served' }, { icon: <MapPin className="w-4 h-4" />, label: 'Bay Area', sub: 'Service region' }].map(item => (
            <div key={item.label} className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="text-brand-yellow mb-1">{item.icon}</div>
              <p className="text-white font-bold text-sm">{item.label}</p>
              <p className="text-white/40 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-brand-navy/10 bg-white">
          <Link to="/" className="flex items-center gap-1.5 text-brand-navy/60 hover:text-brand-navy text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center">
              <ChefHat className="w-3.5 h-3.5 text-brand-navy" />
            </div>
            <span className="font-bold text-brand-navy text-sm">Catering Concierge</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-5 md:px-10 lg:px-12 py-8 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => renderMessage(msg, i))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center shadow-sm">
                <ChefHat className="w-4 h-4 text-brand-navy" />
              </div>
              <div className="bg-white px-5 py-3 rounded-2xl rounded-bl-sm border border-brand-navy/8 shadow-sm flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-brand-navy/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Session cap */}
          {sessionCapped && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">Session limit reached. <a href="tel:+15074194523" className="text-brand-orange font-bold">Call us: 507-419-4523</a></p>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Sticky "Book Now" bar — appears once a package is chosen */}
        <AnimatePresence>
          {selectedPackage && !showBooking && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="mx-5 md:mx-10 lg:mx-12 mb-3 bg-brand-navy text-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-brand-yellow shrink-0" />
              <span className="text-sm font-semibold flex-1">{selectedPackage.name} selected</span>
              <button onClick={() => setShowBooking(true)} className="px-4 py-1.5 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-white hover:text-brand-navy transition-colors">
                Book & Pay Advance →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="px-5 md:px-10 lg:px-12 pb-6 pt-3 border-t border-brand-navy/8 bg-white/60 backdrop-blur-sm">
          {cooldownMsg && <p className="text-xs text-amber-600 mb-2">{cooldownMsg}</p>}

          {/* Quick prompts */}
          {messages.length <= 1 && !isLoading && (
            <div className="flex flex-wrap gap-2 mb-3">
              {['Show me catering packages', 'What events do you cater?', 'Build a custom menu', 'Pricing & availability'].map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors font-medium">
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder={sessionCapped ? 'Session ended — call 507-419-4523' : 'Ask about menus, packages, pricing…'}
              disabled={isLoading || sessionCapped}
              maxLength={MAX_INPUT_LEN}
              className="flex-1 border-2 border-brand-navy/15 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 bg-white"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || sessionCapped}
              className="w-11 h-11 rounded-2xl bg-brand-orange flex items-center justify-center disabled:opacity-40 hover:bg-brand-navy transition-colors self-end"
            >
              {isLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
            </button>
          </div>
          <p className="text-[10px] text-gray-300 mt-1.5 text-right">{input.length}/{MAX_INPUT_LEN}</p>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedPackage && (
          <BookingModal
            packageName={selectedPackage.name}
            priceEstimate={handleGuestCountFromMessage() ?? 0}
            onClose={() => setShowBooking(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
