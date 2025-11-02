import React, { useMemo } from "react";
import CalendarCell from "./CalendarCell";
import {
  getCalendarGrid,
  isSameDay,
  type CalendarEvent,
} from "./CalendarView.types";

// Props for MonthView component
interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (d: Date) => void;
  onEventClick: (ev: CalendarEvent) => void;
  onMoreClick: (d: Date) => void;
}

const MonthView: React.FC<Props> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick,
}) => {
  console.log("=== MonthView Render: events prop ===", events);

  const grid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);

  // Group events by date for efficient lookup
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((ev) => {
      const sd = new Date(ev.startDate);
      const key = new Date(
        sd.getFullYear(),
        sd.getMonth(),
        sd.getDate()
      ).toISOString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    });
    console.log("=== MonthView eventsByDate ===", map);
    return map;
  }, [events]);

  return (
    <section
      aria-label="Month view"
      className="
        bg-white rounded-xl shadow-md border border-neutral-200
        overflow-hidden flex flex-col transition-all
      "
    >
      <header className="grid grid-cols-7 bg-neutral-50 text-neutral-700 ...">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div key={w} className="py-2 ...">{w}</div>
        ))}
      </header>
      <main className="w-full h-full bg-neutral-100 overflow-x-auto sm:overflow-visible">
        <div className="grid grid-cols-7 w-full bg-neutral-200">
          {grid.map((date, idx) => {
            const key = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            ).toISOString();
            const dayEvents = eventsByDate.get(key) ?? [];
            return (
              <CalendarCell
                key={idx}
                date={date}
                currentMonth={currentDate.getMonth()}
                events={dayEvents}
                isToday={isSameDay(date, new Date())}
                onDayClick={onDayClick}
                onEventClick={onEventClick}
              />
            );
          })}
        </div>
      </main>
      <footer className="hidden md:block text-xs text-neutral-500 text-right pr-3 py-1">
        showing {grid.length} days
      </footer>
    </section>
  );
};

export default MonthView;