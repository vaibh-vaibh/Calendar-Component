// Helper functions for date formatting, week handling, month grids

export const startOfWeek = (date: Date, weekStartsOn = 0): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfWeek = (date: Date, weekStartsOn = 0): Date => {
  const start = startOfWeek(date, weekStartsOn);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

// Month grid array (with leading/trailing days)
export const buildMonthMatrix = (year: number, month: number): Date[][] => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const start = startOfWeek(first);
  const end = endOfWeek(last);

  const weeks: Date[][] = [];
  let current = new Date(start);
  while (current <= end) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
};

// Formatting helpers
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) =>
  date.toLocaleDateString(undefined, options);

export const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// Comparisons
export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const isToday = (date: Date) => {
  const now = new Date();
  return isSameDay(date, now);
};

// Responsive-friendly date label
export const getResponsiveDateLabel = (date: Date, screenWidth: number) => {
  if (screenWidth < 640)
    return date.toLocaleDateString(undefined, { day: "numeric" });
  if (screenWidth < 1024)
    return date.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};