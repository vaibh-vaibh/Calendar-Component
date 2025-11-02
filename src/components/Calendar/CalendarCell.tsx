import React from "react";
import type { CalendarEvent } from "./CalendarView.types";

interface Props {
  date: Date;
  currentMonth: number;
  events: CalendarEvent[];
  isToday?: boolean;
  onDayClick: (d: Date) => void;
  onEventClick: (ev: CalendarEvent) => void;
}

/* CalendarCell — single date cell with events */
const CalendarCell: React.FC<Props> = ({
  date,
  currentMonth,
  events,
  isToday = false,
  onDayClick,
  onEventClick,
}) => {
  const inCurrentMonth = date.getMonth() === currentMonth;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${date.toDateString()}. ${events.length} events.`}
      onClick={() => onDayClick(date)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onDayClick(date);
      }}
      className={`
        border border-neutral-200 
        cursor-pointer transition-colors duration-150 
        flex flex-col justify-between 
        p-1.5 sm:p-2 md:p-3 
        h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40
        hover:bg-neutral-50
        ${inCurrentMonth ? "bg-white" : "bg-neutral-100 text-neutral-400"}
      `}
    >
      {/* Header section- date number */}
      <header className="flex justify-between items-start mb-1">
        <span
          className={`text-[11px] sm:text-xs md:text-sm font-medium ${
            isToday ? "sr-only" : ""
          }`}
        >
          {date.getDate()}
        </span>

        {isToday && (
          <span className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full text-white text-[11px] sm:text-xs flex items-center justify-center">
            {date.getDate()}
          </span>
        )}
      </header>

      {/* Events section */}
      <div className="space-y-0.5 sm:space-y-1 overflow-hidden">
        {events.slice(0, 3).map((ev) => (
          <div
            key={ev.id}
            role="button"
            tabIndex={0}
            aria-label={`Event ${ev.title}`}
            className="
              px-1.5 py-0.5 sm:px-2 sm:py-1 rounded 
              truncate text-[10px] sm:text-xs md:text-sm
              text-white/90
            "
            style={{ backgroundColor: ev.color }}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(ev);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onEventClick(ev);
              }
            }}
          >
            {ev.title || "Untitled"}
          </div>
        ))}

        {events.length > 3 && (
          <button
            className="
              text-[10px] sm:text-xs text-blue-600 
              hover:underline truncate
            "
            onClick={(e) => {
              e.stopPropagation();
              onDayClick(date);
            }}
          >
            +{events.length - 3} more
          </button>
        )}
      </div>
    </article>
  );
};

export default React.memo(CalendarCell);