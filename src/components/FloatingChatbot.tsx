import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, ChefHat, Loader2, Lock } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// ─── Config ───────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const MAX_SESSION_MESSAGES = 30;
const MIN_SECONDS_BETWEEN = 2;
const MAX_INPUT_LENGTH = 500;
const GUEST_MSG_LIMIT = 3;         // messages before lead capture
const CONTEXT_WINDOW = 10;          // last N messages sent to AI

// ─── Pre-AI Content Filters ───────────────────────────────────────────────────
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

type FilterResult = { blocked: true; reason: string } | { blocked: false };

function preFilter(text: string): FilterResult {
  if (text.length > MAX_INPUT_LENGTH)
    return { blocked: true, reason: `Please keep messages under ${MAX_INPUT_LENGTH} characters.` };

  for (const p of CODE_PATTERNS)
    if (p.test(text))
      return { blocked: true, reason: "I'm your food concierge — code questions aren't on the menu! 🍽️ Ask me about our dishes instead." };

  for (const p of OFF_TOPIC_PATTERNS)
    if (p.test(text))
      return { blocked: true, reason: "I can only help with food, menu, catering, and restaurant questions. How can I help with your order today?" };

  for (const p of SENSITIVE_PATTERNS)
    if (p.test(text))
      return { blocked: true, reason: "Let's keep things friendly! Ask me about our delicious Bengali street food. 😊" };

  return { blocked: false };
}

// ─── Post-response validation ─────────────────────────────────────────────────
function postValidate(text: string): string {
  // Strip any code blocks the AI might still generate
  const cleaned = text.replace(/```[\s\S]*?```/g, '[content removed]').trim();
  // If response is suspiciously long (likely off-track), truncate with note
  if (cleaned.length > 800)
    return cleaned.slice(0, 800) + '… (Ask me anything else about our menu!)';
  return cleaned;
}

// ─── Session helpers (localStorage) ──────────────────────────────────────────
const SESSION_KEY = 'cc_chat_session';

interface SessionData {
  msgCount: number;
  startTime: number;
  lastMsgTime: number;
  leadCaptured: boolean;
}

function getSession(): SessionData {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch { }
  return { msgCount: 0, startTime: Date.now(), lastMsgTime: 0, leadCaptured: false };
}

function saveSession(data: SessionData) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch { }
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message { role: 'ai' | 'user' | 'system'; text: string; }
interface LeadForm { name: string; email: string; honeypot: string; }

const QUICK_REPLIES = [
  "What's on the menu?",
  "Vegetarian options",
  "Spicy dishes?",
  "Catering inquiry",
  "Pickup times",
  "Puchka / Chaat",
];

const SYSTEM_PROMPT = `You are the AI culinary concierge for "Calcutta Chaat & Bakery", an authentic Bengali street food restaurant in the Bay Area, California.

STRICT RULES — never break these:
- Only discuss: food menu, Bengali cuisine, catering, restaurant hours/locations, ordering, and Indian street food education.
- Never discuss: politics, religion, competitors, coding, investing, legal matters, or anything unrelated to food/restaurant.
- Never generate code, scripts, or technical content of any kind.
- Keep responses concise (under 120 words), warm, and appetizing.
- If asked about off-topic subjects, politely redirect to food/menu topics.
- Do not make up dishes. Authentic Kolkata/Bengali items: Fuchka (Pani Puri), Kathi Rolls, Ghugni, Jhal Muri, Rosogolla, Mishti Doi, Kosha Mangsho, Chilli Chicken (Tangra style), Egg Rolls, Special Thalis (Brunch/Weekend), Fish & Shrimp Curries, and Catering Trays.
- Locations: Fremont (4906 Paseo Padre Pkwy) and Milpitas (81 S Main St). Hours: Mon–Thu 11am–9:30pm, Fri–Sat 11am–10pm, Sun 11am–9:30pm.`;

// ─── Component ────────────────────────────────────────────────────────────────
export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Namaskar! 🙏 I'm your AI concierge for Calcutta Chaat & Bakery. Ask me about our menu, catering, or Bengali street food!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: '', email: '', honeypot: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [sessionLimitHit, setSessionLimitHit] = useState(false);
  const [cooldownMsg, setCooldownMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const session = getSession();
    if (session.leadCaptured) setLeadSubmitted(true);
    if (session.msgCount >= MAX_SESSION_MESSAGES) setSessionLimitHit(true);
  }, []);

  const userMessageCount = messages.filter(m => m.role === 'user').length;

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || sessionLimitHit) return;

    // Honeypot — bots fill hidden fields
    if (leadForm.honeypot) return;

    const session = getSession();

    // Session message limit
    if (session.msgCount >= MAX_SESSION_MESSAGES) {
      setSessionLimitHit(true);
      return;
    }

    // Cooldown check
    const secondsSinceLast = (Date.now() - session.lastMsgTime) / 1000;
    if (session.lastMsgTime && secondsSinceLast < MIN_SECONDS_BETWEEN) {
      const wait = Math.ceil(MIN_SECONDS_BETWEEN - secondsSinceLast);
      setCooldownMsg(`Please wait ${wait}s before sending another message.`);
      setTimeout(() => setCooldownMsg(''), (wait + 0.5) * 1000);
      return;
    }

    // Lead capture gate — after GUEST_MSG_LIMIT user messages, require name + email
    if (userMessageCount >= GUEST_MSG_LIMIT && !leadSubmitted) {
      setShowLeadForm(true);
      return;
    }

    // Pre-AI filter
    const filter = preFilter(trimmed);
    if (filter.blocked) {
      setMessages(prev => [
        ...prev,
        { role: 'user', text: trimmed },
        { role: 'ai', text: filter.reason },
      ]);
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setIsLoading(true);

    session.msgCount += 1;
    session.lastMsgTime = Date.now();
    saveSession(session);

    if (session.msgCount >= MAX_SESSION_MESSAGES) setSessionLimitHit(true);

    try {
      if (!ai) throw new Error('AI not configured');

      // Context window: only last N messages
      const contextMessages = messages.slice(-CONTEXT_WINDOW);
      const contents = [
        ...contextMessages.map(m => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }],
        })),
        { role: 'user', parts: [{ text: trimmed }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents,
        config: { systemInstruction: SYSTEM_PROMPT },
      });

      const raw = response.text ?? "I'm having trouble right now. Please try again!";
      const validated = postValidate(raw);
      setMessages(prev => [...prev, { role: 'ai', text: validated }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having a moment! Please try again in a bit. 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, sessionLimitHit, leadSubmitted, userMessageCount, messages, leadForm.honeypot]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadForm.honeypot) return; // bot
    if (!leadForm.name.trim() || !leadForm.email.trim()) return;

    const session = getSession();
    session.leadCaptured = true;
    saveSession(session);
    setLeadSubmitted(true);
    setShowLeadForm(false);
    setMessages(prev => [
      ...prev,
      { role: 'ai', text: `Thank you, ${leadForm.name.split(' ')[0]}! 🎉 You're all set. What would you like to know?` },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-brand-navy text-brand-white rounded-full shadow-2xl flex items-center justify-center border-2 border-brand-yellow hover:bg-brand-blue transition-colors duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-8 h-8 absolute top-3 right-3 text-brand-yellow animate-pulse" />
        {/* <MessageSquare className="w-7 h-7" /> */}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-brand-cream rounded-3xl shadow-2xl border border-brand-navy/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-navy p-4 flex items-center justify-between text-brand-white flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-navy">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase">AI Concierge</h3>
                  <p className="text-[10px] text-brand-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-brand-white/50">
                  {MAX_SESSION_MESSAGES - getSession().msgCount} msgs left
                </span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-white/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-brand-blue text-brand-white rounded-tr-sm'
                    : 'bg-brand-cream border border-brand-navy/10 text-brand-navy rounded-tl-sm shadow-sm'
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-brand-cream border border-brand-navy/10 text-brand-navy rounded-2xl rounded-tl-sm p-3 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Session limit reached */}
              {sessionLimitHit && (
                <div className="text-center text-xs text-brand-navy/50 py-2 border-t border-brand-navy/10">
                  Session limit reached. Please call us or <a href="/contact" className="text-brand-blue underline">contact us</a> directly!
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Lead Capture Gate */}
            <AnimatePresence>
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-brand-cream/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 z-10"
                >
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-brand-navy" />
                  </div>
                  <h4 className="font-serif text-xl text-brand-navy text-center mb-2">Stay Connected!</h4>
                  <p className="text-sm text-brand-navy/60 text-center mb-6 leading-relaxed">
                    Share your details to continue chatting and get exclusive offers from Calcutta Chaat.
                  </p>
                  <form onSubmit={handleLeadSubmit} className="w-full space-y-3">
                    {/* Honeypot — hidden from real users, bots fill this */}
                    <input
                      type="text"
                      value={leadForm.honeypot}
                      onChange={e => setLeadForm(prev => ({ ...prev, honeypot: e.target.value }))}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={leadForm.name}
                      onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full bg-white border border-brand-navy/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={leadForm.email}
                      onChange={e => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full bg-white border border-brand-navy/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
                    />
                    <button
                      type="submit"
                      className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-brand-orange/90 transition-colors text-sm tracking-widest uppercase"
                    >
                      Continue Chatting
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className="w-full text-xs text-brand-navy/40 hover:text-brand-navy/60 transition-colors"
                    >
                      Skip for now
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-4 bg-brand-white border-t border-brand-navy/5 flex-shrink-0">
              {cooldownMsg && (
                <p className="text-xs text-brand-orange text-center mb-2">{cooldownMsg}</p>
              )}
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                    placeholder={sessionLimitHit ? 'Session ended' : 'Ask about our menu...'}
                    className="w-full bg-brand-cream border border-brand-navy/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all pr-12"
                    disabled={isLoading || sessionLimitHit}
                    maxLength={MAX_INPUT_LENGTH}
                  />
                  {input.length > MAX_INPUT_LENGTH * 0.8 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-orange">
                      {MAX_INPUT_LENGTH - input.length}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || sessionLimitHit}
                  className="w-12 h-12 bg-brand-orange text-brand-white rounded-full flex items-center justify-center hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>

              {/* Quick Replies */}
              {!sessionLimitHit && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {QUICK_REPLIES.map(reply => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => handleQuickReply(reply)}
                      disabled={isLoading || sessionLimitHit}
                      className="whitespace-nowrap text-[10px] uppercase tracking-widest font-bold bg-brand-cream border border-brand-navy/10 px-3 py-1.5 rounded-full text-brand-navy hover:border-brand-blue hover:text-brand-blue transition-colors disabled:opacity-40"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
