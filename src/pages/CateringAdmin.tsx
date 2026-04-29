import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat, CheckCircle2, XCircle, Clock, Calendar, Users,
  BanIcon, Plus, ArrowLeft, Loader2, RefreshCw, Filter, X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection, query, getDocs, doc, updateDoc,
  addDoc, deleteDoc, orderBy, serverTimestamp, where,
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { CateringScheduler, MAX_BOOKINGS_PER_DAY } from '../components/CateringScheduler';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CateringBooking {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  phone?: string;
  eventType: string;
  packageName: string;
  guestCount: string;
  venue?: string;
  notes?: string;
  advanceAmount: number;
  estimatedTotal: number;
  bookingRef: string;
  createdAt: { seconds: number } | null;
}

interface BlockedDate {
  id: string;
  date: string;
  reason: string;
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(date: string) {
  if (!date) return '—';
  let dateStr = date;
  if (dateStr.includes('/')) {
    const [m, d, y] = dateStr.split('/');
    dateStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  const [y, m, d] = dateStr.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtCreated(ts: { seconds: number } | null) {
  if (!ts) return '—';
  return new Date(ts.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending:   'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status === 'pending'   && <Clock className="w-3 h-3" />}
      {status === 'confirmed' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'cancelled' && <XCircle className="w-3 h-3" />}
      {status}
    </span>
  );
}

// ─── Block Date Modal ─────────────────────────────────────────────────────────
function BlockDateModal({ onClose, onBlocked }: { onClose: () => void; onBlocked: () => void }) {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!date || !reason.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'catering_blocked_dates'), {
        date,
        reason: reason.trim(),
        createdBy: user?.uid ?? 'admin',
        createdAt: serverTimestamp(),
      });
      onBlocked();
      onClose();
    } catch (err) {
      console.error('Block date error', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" onClick={onClose} />
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-brand-navy">Block a Date</h3>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Date</label>
              <input required type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-orange" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Reason</label>
              <input required placeholder="e.g. Holiday, Private event, Maintenance"
                value={reason} onChange={e => setReason(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-orange" />
            </div>
            <button type="submit" disabled={saving}
              className="w-full py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors text-sm disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Block this date'}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

// ─── Booking Detail Modal ─────────────────────────────────────────────────────
function BookingDetailModal({ booking, onClose, onUpdate }: { booking: CateringBooking; onClose: () => void; onUpdate: () => void }) {
  const [updating, setUpdating] = useState<string | null>(null);

  const setStatus = async (status: 'confirmed' | 'cancelled') => {
    setUpdating(status);
    try {
      await updateDoc(doc(db, 'catering_bookings', booking.id), { status, updatedAt: serverTimestamp() });
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Update status error', err);
    } finally {
      setUpdating(null);
    }
  };

  const fieldCls = 'text-sm text-brand-navy font-medium';
  const labelCls = 'text-xs text-gray-400 font-semibold uppercase tracking-wide';

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" onClick={onClose} />
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div>
              <p className="font-bold text-brand-navy">{booking.customerName}</p>
              <p className="text-xs text-gray-400">{booking.bookingRef}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={booking.status} />
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-5 grid grid-cols-2 gap-4">
            {[
              { label: 'Event Date',    value: fmt(booking.date) },
              { label: 'Event Type',    value: booking.eventType },
              { label: 'Package',       value: booking.packageName },
              { label: 'Guest Count',   value: booking.guestCount },
              { label: 'Email',         value: booking.customerEmail },
              { label: 'Phone',         value: booking.phone || '—' },
              { label: 'Venue',         value: booking.venue || '—' },
              { label: 'Advance Paid',  value: booking.advanceAmount > 0 ? `$${booking.advanceAmount.toFixed(2)}` : '—' },
              { label: 'Total Est.',    value: booking.estimatedTotal > 0 ? `$${booking.estimatedTotal.toFixed(2)}` : 'Custom quote' },
              { label: 'Submitted',     value: fmtCreated(booking.createdAt) },
            ].map(({ label, value }) => (
              <div key={label} className={label === 'Email' || label === 'Venue' ? 'col-span-2' : ''}>
                <p className={labelCls}>{label}</p>
                <p className={fieldCls}>{value}</p>
              </div>
            ))}
            {booking.notes && (
              <div className="col-span-2">
                <p className={labelCls}>Notes</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{booking.notes}</p>
              </div>
            )}
          </div>

          {booking.status === 'pending' && (
            <div className="flex gap-2 p-5 pt-0">
              <button onClick={() => setStatus('confirmed')} disabled={!!updating}
                className="flex-1 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors text-sm disabled:opacity-60">
                {updating === 'confirmed' ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : '✓ Confirm'}
              </button>
              <button onClick={() => setStatus('cancelled')} disabled={!!updating}
                className="flex-1 py-2.5 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition-colors text-sm disabled:opacity-60">
                {updating === 'cancelled' ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : '✕ Reject'}
              </button>
            </div>
          )}
          {booking.status === 'confirmed' && (
            <div className="p-5 pt-0">
              <button onClick={() => setStatus('cancelled')} disabled={!!updating}
                className="w-full py-2.5 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition-colors text-sm disabled:opacity-60">
                {updating === 'cancelled' ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Cancel booking'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function CateringAdmin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<CateringBooking[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [calendarDate, setCalendarDate] = useState('');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [detailBooking, setDetailBooking] = useState<CateringBooking | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load bookings + blocked dates
  useEffect(() => {
    if (authLoading) return;
    async function load() {
      setLoading(true);
      try {
        const bSnap = await getDocs(query(collection(db, 'catering_bookings'), orderBy('date', 'asc')));
        setBookings(bSnap.docs.map(d => ({ id: d.id, ...d.data() } as CateringBooking)));

        const blSnap = await getDocs(query(collection(db, 'catering_blocked_dates'), orderBy('date', 'asc')));
        setBlockedDates(blSnap.docs.map(d => ({ id: d.id, ...d.data() } as BlockedDate)));
      } catch (err) {
        console.error('Admin load error', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [authLoading, refreshKey]);

  const refresh = () => setRefreshKey(k => k + 1);

  const deleteBlockedDate = async (id: string) => {
    await deleteDoc(doc(db, 'catering_blocked_dates', id));
    refresh();
  };

  // Stats
  const pending   = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const today = new Date().toISOString().split('T')[0];
  const upcoming  = bookings.filter(b => b.status === 'confirmed' && b.date >= today).length;
  const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + (b.advanceAmount ?? 0), 0);

  const filteredBookings = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (calendarDate && b.date !== calendarDate) return false;
    return true;
  });

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream-light">
        <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream-light">
        <div className="text-center">
          <ChefHat className="w-10 h-10 text-brand-orange mx-auto mb-4" />
          <p className="font-bold text-brand-navy mb-2">Admin access required</p>
          <p className="text-sm text-gray-500">Please sign in with an admin account.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-brand-orange font-bold">← Back to site</Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream-light">
        <div className="text-center">
          <XCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <p className="font-bold text-brand-navy mb-2">Access denied</p>
          <p className="text-sm text-gray-500">Your account does not have admin privileges.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-brand-orange font-bold">← Back to site</Link>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-brand-navy" />
            </div>
            <div>
              <p className="font-bold text-brand-navy text-sm">Catering Admin</p>
              <p className="text-[10px] text-gray-400">Calcutta Chaat & Bakery</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refresh} disabled={loading} className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={() => setShowBlockModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors">
            <BanIcon className="w-3.5 h-3.5" /> Block Date
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pending',    value: pending,              icon: <Clock className="w-5 h-5" />,       color: 'text-amber-600',  bg: 'bg-amber-50' },
            { label: 'Confirmed',  value: confirmed,            icon: <CheckCircle2 className="w-5 h-5" />,color: 'text-green-600',  bg: 'bg-green-50' },
            { label: 'Upcoming',   value: upcoming,             icon: <Calendar className="w-5 h-5" />,    color: 'text-blue-600',   bg: 'bg-blue-50' },
            { label: 'Advances',   value: `$${totalRevenue.toFixed(0)}`, icon: <Users className="w-5 h-5" />, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>{stat.icon}</div>
              <p className="text-2xl font-black text-brand-navy">{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-start">
          {/* Left: calendar + blocked dates */}
          <div className="space-y-6">
            <div>
              <p className="font-bold text-brand-navy mb-3 text-sm">Availability Calendar</p>
              <CateringScheduler
                selectedDate={calendarDate}
                onSelect={d => setCalendarDate(prev => prev === d ? '' : d)}
                adminMode
              />
              {calendarDate && (
                <button onClick={() => setCalendarDate('')} className="mt-2 text-xs text-brand-orange font-semibold">
                  Clear filter ({calendarDate})
                </button>
              )}
            </div>

            {/* Blocked dates list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-brand-navy text-sm">Blocked Dates</p>
                <button onClick={() => setShowBlockModal(true)} className="flex items-center gap-1 text-xs text-brand-orange font-bold hover:underline">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              {blockedDates.length === 0 ? (
                <p className="text-xs text-gray-400 bg-white rounded-xl p-4 border border-gray-100">No blocked dates.</p>
              ) : (
                <div className="space-y-2">
                  {blockedDates.map(bd => (
                    <div key={bd.id} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                      <BanIcon className="w-4 h-4 text-red-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-brand-navy">{fmt(bd.date)}</p>
                        <p className="text-[11px] text-gray-400 truncate">{bd.reason}</p>
                      </div>
                      <button onClick={() => deleteBlockedDate(bd.id)} className="p-1 hover:bg-red-50 rounded-lg transition-colors">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: bookings list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-brand-navy text-sm">
                Bookings {calendarDate ? `— ${fmt(calendarDate)}` : ''}
                <span className="ml-2 text-gray-400 font-normal text-xs">({filteredBookings.length})</span>
              </p>
              {/* Filter tabs */}
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
                {(['all', 'pending', 'confirmed', 'cancelled'] as StatusFilter[]).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors capitalize ${filter === f ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 text-brand-orange animate-spin" />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400">No bookings found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredBookings.map(booking => (
                    <motion.div key={booking.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setDetailBooking(booking)}
                    >
                      <div className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex flex-col items-center justify-center shrink-0">
                          <span className="text-brand-orange font-black text-sm leading-none">
                            {(() => {
                              if (!booking.date) return '?';
                              if (booking.date.includes('/')) return booking.date.split('/')[1];
                              return booking.date.split('-')[2];
                            })()}
                          </span>
                          <span className="text-brand-orange/70 text-[9px] font-bold uppercase">
                            {(() => {
                              if (!booking.date) return '';
                              // Try to handle both YYYY-MM-DD and MM/DD/YYYY
                              let dateStr = booking.date;
                              if (dateStr.includes('/')) {
                                const [m, d, y] = dateStr.split('/');
                                dateStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
                              }
                              const d = new Date(dateStr + 'T12:00:00');
                              return isNaN(d.getTime()) ? '' : d.toLocaleString('en-US', { month: 'short' });
                            })()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-brand-navy text-sm truncate">{booking.customerName}</p>
                            <StatusBadge status={booking.status} />
                          </div>
                          <p className="text-xs text-gray-500 truncate">{booking.packageName} · {booking.guestCount} guests · {booking.eventType}</p>
                          <p className="text-xs text-gray-400">{booking.customerEmail}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {booking.advanceAmount > 0 && (
                            <p className="text-sm font-black text-brand-orange">${booking.advanceAmount.toFixed(0)}</p>
                          )}
                          <p className="text-[10px] text-gray-400">advance</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showBlockModal && <BlockDateModal onClose={() => setShowBlockModal(false)} onBlocked={refresh} />}
        {detailBooking && <BookingDetailModal booking={detailBooking} onClose={() => setDetailBooking(null)} onUpdate={refresh} />}
      </AnimatePresence>
    </div>
  );
}
