import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// ─── Config ───────────────────────────────────────────────────────────────────
export const MAX_BOOKINGS_PER_DAY = 2;
export const MIN_ADVANCE_DAYS = 7; // must book at least 7 days out

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DayInfo {
  dateStr: string;
  isPast: boolean;
  isBlocked: boolean;
  bookingCount: number;
  slotsLeft: number;
  available: boolean;
}

interface Props {
  selectedDate: string; // YYYY-MM-DD or ''
  onSelect: (date: string) => void;
  disabled?: boolean;
  /** Admin mode: show all booking counts even for past dates */
  adminMode?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// ─── Component ────────────────────────────────────────────────────────────────
export function CateringScheduler({ selectedDate, onSelect, disabled = false, adminMode = false }: Props) {
  const today = new Date();
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>({});
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const year  = view.getFullYear();
  const month = view.getMonth();

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      setLoading(true);
      const start = toDateStr(year, month, 1);
      const end   = toDateStr(year, month, daysInMonth(year, month));
      try {
        // Fetch active bookings for this month
        const bSnap = await getDocs(
          query(collection(db, 'catering_bookings'),
            where('date', '>=', start),
            where('date', '<=', end))
        );
        const counts: Record<string, number> = {};
        bSnap.forEach(doc => {
          const { date, status } = doc.data() as { date: string; status: string };
          if (status !== 'cancelled') counts[date] = (counts[date] ?? 0) + 1;
        });

        // Fetch blocked dates
        const blSnap = await getDocs(
          query(collection(db, 'catering_blocked_dates'),
            where('date', '>=', start),
            where('date', '<=', end))
        );
        const blocked = new Set<string>();
        blSnap.forEach(doc => blocked.add((doc.data() as { date: string }).date));

        if (!cancelled) {
          setBookingCounts(counts);
          setBlockedDates(blocked);
        }
      } catch (e) {
        console.error('CateringScheduler fetch error', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch();
    return () => { cancelled = true; };
  }, [year, month]);

  // Min bookable date
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + MIN_ADVANCE_DAYS);

  function getDayInfo(day: number): DayInfo {
    const dateStr = toDateStr(year, month, day);
    const date = new Date(year, month, day);
    const isPast = date < minDate;
    const isBlocked = blockedDates.has(dateStr);
    const bookingCount = bookingCounts[dateStr] ?? 0;
    const slotsLeft = Math.max(0, MAX_BOOKINGS_PER_DAY - bookingCount);
    const available = !isPast && !isBlocked && slotsLeft > 0;
    return { dateStr, isPast, isBlocked, bookingCount, slotsLeft, available };
  }

  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays    = daysInMonth(year, month);
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const prevMonth = () => setView(new Date(year, month - 1, 1));
  const nextMonth = () => setView(new Date(year, month + 1, 1));

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white select-none">
      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>
        <span className="text-sm font-bold text-brand-navy">
          {view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-2">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-px p-2">
        {loading ? (
          <div className="col-span-7 py-10 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-brand-orange animate-spin" />
          </div>
        ) : cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const info = getDayInfo(day);
          const isSelected = selectedDate === info.dateStr;

          let cls = 'relative w-full aspect-square flex flex-col items-center justify-center text-xs font-semibold rounded-xl transition-all ';
          if (isSelected) {
            cls += 'bg-brand-orange text-white shadow-md shadow-brand-orange/30';
          } else if (adminMode && info.bookingCount > 0) {
            cls += info.slotsLeft === 0
              ? 'bg-red-100 text-red-700 cursor-pointer hover:bg-red-200'
              : 'bg-amber-50 text-amber-700 cursor-pointer hover:bg-amber-100';
          } else if (!info.available) {
            cls += 'text-gray-300 bg-gray-50 cursor-not-allowed';
          } else if (info.slotsLeft === 1) {
            cls += 'text-amber-700 bg-amber-50 hover:bg-amber-100 cursor-pointer';
          } else {
            cls += 'text-brand-navy hover:bg-brand-orange/10 cursor-pointer';
          }

          const canClick = (adminMode ? true : info.available) && !disabled;

          return (
            <button
              key={i}
              className={cls}
              disabled={!canClick}
              onClick={() => { if (canClick) onSelect(info.dateStr); }}
              title={info.isBlocked ? 'Blocked' : info.slotsLeft === 0 ? 'Fully booked' : info.isPast ? 'Too soon' : `${info.slotsLeft} slot(s) left`}
            >
              {day}
              {/* Booking dots for admin mode */}
              {adminMode && info.bookingCount > 0 && !isSelected && (
                <span className="text-[8px] font-bold leading-none">{info.bookingCount}/{MAX_BOOKINGS_PER_DAY}</span>
              )}
              {/* Single dot for 1 slot left (customer mode) */}
              {!adminMode && info.slotsLeft === 1 && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-4 py-2.5 border-t border-gray-100 flex flex-wrap gap-3">
        {[
          { color: 'bg-white border border-gray-200', label: 'Available' },
          { color: 'bg-amber-50 border border-amber-200', label: '1 slot left' },
          { color: 'bg-gray-100', label: 'Unavailable' },
          { color: 'bg-brand-orange', label: 'Selected' },
        ].map(l => (
          <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className={`w-3 h-3 rounded ${l.color} shrink-0`} /> {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
