import { useState, useCallback, useMemo } from "react";

// Custom hook for calendar logic
export function useCalendar(initialView: "month" | "week" = "month") {
  const [view, setView] = useState<"month" | "week">(initialView);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Helpers
  const startOfDay = useCallback((d: Date) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  // Navigation functions for changing current date
  const goToday = useCallback(() => {
    setCurrentDate(startOfDay(new Date()));
  }, [startOfDay]);

  const goNext = useCallback(() => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        : new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7)
    );
  }, [view]);

  const goPrev = useCallback(() => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7)
    );
  }, [view]);

  // Formatted label for current view and date
  const formattedLabel = useMemo(() => {
    if (view === "month") {
      return currentDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    } else {
      const start = new Date(currentDate);
      const end = new Date(currentDate);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      })} - ${end.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`;
    }
  }, [currentDate, view]);

  return {
    view,
    currentDate,
    setView,
    goNext,
    goPrev,
    goToday,
    formattedLabel,
  };
}

export default useCalendar;