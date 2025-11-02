import type { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { isSameDay } from "./date.utils";

// Sort events by start time
export const sortEventsByTime = (events: CalendarEvent[]) =>
  [...events].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

// Group events by day
export const groupEventsByDay = (events: CalendarEvent[]) => {
  const map = new Map<string, CalendarEvent[]>();
  events.forEach((ev) => {
    const key = ev.startDate.toDateString();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(ev);
  });
  map.forEach((arr) => arr.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()));
  return map;
};

// Get events for a particular day
export const getEventsForDay = (events: CalendarEvent[], date: Date) =>
  events.filter((ev) => isSameDay(ev.startDate, date));

// Color utility — auto assign color if missing
export const assignEventColor = (event: CalendarEvent, index: number): CalendarEvent => {
  if (event.color) return event;
  const palette = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];
  return { ...event, color: palette[index % palette.length] };
};

// Check if two events overlap
export const doEventsOverlap = (a: CalendarEvent, b: CalendarEvent) =>
  a.startDate < b.endDate && b.startDate < a.endDate;

// Merge overlapping events into clusters
export const clusterEvents = (events: CalendarEvent[]): CalendarEvent[][] => {
  if (events.length === 0) return [];
  const sorted = sortEventsByTime(events);
  const clusters: CalendarEvent[][] = [];
  let currentCluster: CalendarEvent[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = currentCluster[currentCluster.length - 1];
    const curr = sorted[i];
    if (doEventsOverlap(prev, curr)) {
      currentCluster.push(curr);
    } else {
      clusters.push(currentCluster);
      currentCluster = [curr];
    }
  }
  clusters.push(currentCluster);
  return clusters;
};

// Responsive truncation for event titles
export const getShortTitle = (title: string, screenWidth: number) => {
  if (screenWidth < 640) return title.slice(0, 10) + (title.length > 10 ? "…" : "");
  if (screenWidth < 1024) return title.slice(0, 18) + (title.length > 18 ? "…" : "");
  return title;
};