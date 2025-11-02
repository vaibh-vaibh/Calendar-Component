import React, { useCallback, useEffect, useRef, useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import EventModal from "./EventModal";
import { useEventStore } from "../../store/eventStore";

const CalendarView: React.FC<{
  initialView?: "month" | "week";
  initialDate?: Date;
  initialEvents?: any[];
}> = ({
  initialView = "month",
  initialDate = new Date(),
  initialEvents = [],
}) => {
  const events = useEventStore((s) => s.events);
  const modalOpen = useEventStore((s) => s.modalOpen);
  const modalEvent = useEventStore((s) => s.modalEvent);
  const openModal = useEventStore((s) => s.openModal);
  const closeModal = useEventStore((s) => s.closeModal);

  // Seed initial events ONLY ONCE at first mount
  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current && initialEvents.length > 0) {
      useEventStore.setState((state) =>
        state.events.length === 0
          ? { events: initialEvents.map((e) => ({
              ...e,
              startDate: new Date(e.startDate),
              endDate: new Date(e.endDate),
            }))}
          : state
      );
      seeded.current = true;
    }
    // eslint-disable-next-line
  }, [initialEvents]);

  const [view, setView] = useState<"month" | "week">(initialView);
  const [currentDate, setCurrentDate] = useState(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      initialDate.getDate()
    )
  );

  // for next/prev/today navigation
  const goNext = useCallback(() => {
    setCurrentDate((d) =>
      view === "month"
        ? new Date(d.getFullYear(), d.getMonth() + 1, 1)
        : new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)
    );
  }, [view]);

  const goPrev = useCallback(() => {
    setCurrentDate((d) =>
      view === "month"
        ? new Date(d.getFullYear(), d.getMonth() - 1, 1)
        : new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7)
    );
  }, [view]);

  const goToday = useCallback(() => {
    const t = new Date();
    setCurrentDate(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
  }, []);

  // to create new event on day click
  const onDayClick = useCallback(
    () => {
      openModal();
    },
    [openModal]
  );

  return (
    <section
      aria-label="Calendar section"
      className="mx-auto p-3 sm:p-4 md:p-6 w-full max-w-[95%] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl"
    >
      {/* Header */}
      <header
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between
          gap-3 mb-4"
      >
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Calendar
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Manage events easily — switch view 👇
          </p>
        </div>
        <nav
          aria-label="Calendar navigation"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3"
        >
          <div className="text-sm sm:text-base font-medium text-neutral-800 text-center sm:text-right min-w-[140px]">
            {currentDate.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </div>

          <div className="flex items-center justify-center gap-1 bg-white p-1 rounded-md shadow-sm">
            <button
              aria-label="Previous"
              className="p-2 md:p-2.5 text-lg md:text-xl"
              onClick={goPrev}
            >
              ‹
            </button>
            <button
              aria-label="Today"
              className="px-3 py-1 text-xs sm:text-sm md:text-base rounded font-medium bg-blue-500 text-white hover:bg-blue-600"
              onClick={goToday}
            >
              Today
            </button>
            <button
              aria-label="Next"
              className="p-2 md:p-2.5 text-lg md:text-xl"
              onClick={goNext}
            >
              ›
            </button>
          </div>

          <div className="flex justify-center sm:justify-end items-center gap-2">
            <label className="sr-only" htmlFor="viewToggle">
              View
            </label>
            <select
              id="viewToggle"
              value={view}
              onChange={(e) => setView(e.target.value as "month" | "week")}
              className="bg-white border border-neutral-300 rounded
                px-3 py-1 sm:px-3 sm:py-1.5
                text-xs sm:text-sm md:text-base
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
            </select>
          </div>
        </nav>
      </header>
      <main className="w-full">
        {view === "month" ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDayClick={onDayClick}
            onEventClick={openModal}
            onMoreClick={onDayClick}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onTimeSlotClick={() => openModal()}
            onEventClick={openModal}
          />
        )}
      </main>
      {modalOpen && (
        <EventModal event={modalEvent ?? undefined} onClose={closeModal} />
      )}
      <footer className="mt-4 text-xs sm:text-sm text-neutral-500 text-center sm:text-left">
        <span>{events.length} events total</span>
      </footer>
    </section>
  );
};

export default CalendarView;