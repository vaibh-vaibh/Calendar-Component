import { create } from "zustand";
import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

// Event management store
type EventStore = {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: Date) => CalendarEvent[];
};

// Event management store using Zustand
export const useEventManager = create<EventStore>((set, get) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((ev) =>
        ev.id === id ? { ...ev, ...updates } : ev
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((ev) => ev.id !== id),
    })),
  getEventsByDate: (date) => {
    const sameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
    return get().events.filter((ev) => sameDay(ev.startDate, date));
  },
}));

export default useEventManager;