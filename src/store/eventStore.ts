import { create } from "zustand";
import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

// Event store with modal management
type Store = {
  events: CalendarEvent[];
  addEvent: (e: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  modalOpen: boolean;
  modalEvent?: CalendarEvent | null;
  openModal: (e?: CalendarEvent | null) => void;
  closeModal: () => void;
};

// Event store using Zustand
export const useEventStore = create<Store>((set) => ({
  events: [],
  addEvent: (e) =>
    set((s) => ({
      events: [
        ...s.events,
        {
          ...e,
          startDate: e.startDate instanceof Date ? e.startDate : new Date(e.startDate),
          endDate: e.endDate instanceof Date ? e.endDate : new Date(e.endDate),
        }
      ]
    })),
  updateEvent: (id, updates) =>
    set((s) => ({
      events: s.events.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              ...updates,
              startDate:
                updates.startDate instanceof Date
                  ? updates.startDate
                  : new Date(updates.startDate ?? ev.startDate),
              endDate:
                updates.endDate instanceof Date
                  ? updates.endDate
                  : new Date(updates.endDate ?? ev.endDate),
            }
          : ev
      ),
    })),
  deleteEvent: (id) =>
    set((s) => ({
      events: s.events.filter((ev) => ev.id !== id),
    })),
  modalOpen: false,
  modalEvent: null,
  openModal: (e) => set({ modalOpen: true, modalEvent: e ?? null }),
  closeModal: () => set({ modalOpen: false, modalEvent: null }),
}));