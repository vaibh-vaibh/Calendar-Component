import { useEffect, useState } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
}

export type ViewMode = "month" | "week";

export interface CalendarViewProps {
  initialView?: ViewMode;
  initialDate?: Date;
  initialEvents?: CalendarEvent[];
}

/** Responsive breakpoints */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const getCurrentBreakpoint = (): BreakpointKey => {
  if (typeof window === "undefined") return "lg";
  const width = window.innerWidth;
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "sm";
};

export const useResponsiveBreakpoint = (): BreakpointKey => {
  const [bp, setBp] = useState<BreakpointKey>(getCurrentBreakpoint());
  useEffect(() => {
    const handler = () => setBp(getCurrentBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDayIndex = firstDay.getDay();
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - startDayIndex);
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return grid;
};

export const isToday = (d: Date) => isSameDay(d, new Date());

export const getGridColumns = (bp: BreakpointKey): number => {
  switch (bp) {
    case "xl":
    case "lg":
      return 7;
    case "md":
      return 5;
    case "sm":
    default:
      return 3;
  }
};