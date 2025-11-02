import React, { useMemo } from "react";
import { isSameDay, type CalendarEvent } from "./CalendarView.types";

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeSlotClick: (d: Date) => void;
  onEventClick: (ev: CalendarEvent) => void;
}

const WeekView: React.FC<Props> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  // Start of current week (Sunday)
  const startOfWeek = useMemo(() => {
    const d = new Date(currentDate);
    const diff = d.getDate() - d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), diff);
  }, [currentDate]);

  // Exactly 7 days render
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return day;
    });
  }, [startOfWeek]);

  // 24-hour slots
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // filter events per day
  const eventsForDay = (day: Date) =>
    events.filter((ev) => isSameDay(new Date(ev.startDate), day));

  return (
    <section
      aria-label="Week view"
      className="
        bg-white rounded-xl shadow-md border border-neutral-200
        overflow-x-auto transition-all
      "
    >
      <div className="min-w-[720px] lg:min-w-0">
        {/* Header row — days of week */}
        <header
          className="
            grid grid-cols-[70px_repeat(7,1fr)]
            border-b border-neutral-200 bg-neutral-50
            text-[10px] sm:text-xs md:text-sm lg:text-base
          "
        >
          <div className="p-2 text-center font-semibold text-neutral-600">
            Time
          </div>
          {days.map((d) => (
            <div
              key={d.toISOString()}
              className="
                text-center p-2 font-medium border-l border-neutral-200 truncate
              "
            >
              {d.toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
          ))}
        </header>

        {/* Time slots + events */}
        <div
          className="
            grid grid-cols-[70px_repeat(7,1fr)]
            text-[10px] sm:text-xs md:text-sm
          "
        >
          {/* Time column */}
          <aside className="border-r border-neutral-200 bg-neutral-50 sticky left-0 z-10">
            {hours.map((h) => (
              <div
                key={h}
                className="
                  h-14 sm:h-16 md:h-20 border-b border-neutral-100
                  text-center text-neutral-600 p-1 sm:p-2
                "
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </aside>

          {/* 7 day columns */}
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className="border-r border-neutral-200 relative"
            >
              {/* hourly slots */}
              {hours.map((h) => {
                const slotDate = new Date(
                  day.getFullYear(),
                  day.getMonth(),
                  day.getDate(),
                  h,
                  0
                );
                return (
                  <div
                    key={h}
                    className="
                      h-14 sm:h-16 md:h-20 border-b border-dashed border-neutral-100
                      hover:bg-blue-50 cursor-pointer transition-colors
                    "
                    onClick={() => onTimeSlotClick(slotDate)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        onTimeSlotClick(slotDate);
                    }}
                  />
                );
              })}

              {/* events */}
              {eventsForDay(day).map((ev) => {
                const start = new Date(ev.startDate);
                const end = new Date(ev.endDate);
                const startHour = start.getHours() + start.getMinutes() / 60;
                const endHour = end.getHours() + end.getMinutes() / 60;
                const top = startHour * 64;
                const height = Math.max((endHour - startHour) * 64, 28);

                return (
                  <div
                    key={ev.id}
                    className="
                      absolute left-1 right-1 sm:left-2 sm:right-2
                      p-1 sm:p-2 rounded text-[10px] sm:text-xs text-white shadow-md
                      overflow-hidden transition-transform hover:scale-[1.02]
                    "
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      backgroundColor: ev.color ?? "#0ea5e9",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(ev);
                    }}
                  >
                    <div className="font-medium truncate">
                      {ev.title || "Untitled"}
                    </div>
                    <div className="opacity-90 text-[9px] sm:text-[10px]">
                      {start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekView;