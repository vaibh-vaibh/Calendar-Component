import React, { useState } from "react";
import { useEventStore } from "../../store/eventStore";
import type { CalendarEvent } from "./CalendarView.types";

interface EventModalProps {
  event?: CalendarEvent;
  onClose: () => void;
}

// Some Preset colors for event labels , you choose as you want
const presetColors = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4",
];

// EventModal component for creating/editing events
const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const addEvent = useEventStore((s) => s.addEvent);
  const updateEvent = useEventStore((s) => s.updateEvent);
  const deleteEvent = useEventStore((s) => s.deleteEvent);

  const isEditing = !!(event && event.id);

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [startDateStr, setStartDateStr] = useState(
    event ? datetimeLocal(event.startDate) : ""
  );
  const [endDateStr, setEndDateStr] = useState(
    event ? datetimeLocal(event.endDate) : ""
  );
  const [color, setColor] = useState(event?.color ?? presetColors[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // function for converting Date to datetime-local string format
  function datetimeLocal(d: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function parseLocal(s: string) {
    return new Date(s);
  }

  // validation function for form fields
  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Title required";
    if (title.length > 100) e.title = "Max 100 chars";
    const sd = parseLocal(startDateStr);
    const ed = parseLocal(endDateStr);
    if (isNaN(sd.getTime()) || isNaN(ed.getTime()))
      e.date = "Valid start/end required";
    if (sd >= ed) e.date = "End must be after start";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // handle save action
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload: CalendarEvent = {
      id: event?.id ?? `evt-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      startDate: parseLocal(startDateStr),
      endDate: parseLocal(endDateStr),
      color,
    };
    if (isEditing) updateEvent(payload.id, payload);
    else addEvent(payload);
    onClose();
  };

  const handleDelete = () => {
    if (isEditing && event) {
      deleteEvent(event.id);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="
          relative bg-white rounded-xl shadow-xl z-10
          w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[35%]
          max-h-[90vh] overflow-y-auto
          p-4 sm:p-6 md:p-7
        "
        role="document"
      >
        <header className="flex justify-between items-start mb-4">
          <h2
            id="modal-title"
            className="text-lg sm:text-xl md:text-2xl font-semibold"
          >
            {isEditing ? "Edit Event" : "Create Event"}
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-neutral-500 text-xl sm:text-2xl hover:text-neutral-700"
          >
            ×
          </button>
        </header>
        <form
          onSubmit={handleSave}
          className="space-y-4 sm:space-y-5"
        >
          <div>
            <label className="block text-sm sm:text-base font-medium">
              Title
            </label>
            <input
              className="mt-1 block w-full border border-neutral-300 p-2 sm:p-2.5 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium">
              Description
            </label>
            <textarea
              className="mt-1 block w-full border border-neutral-300 p-2 sm:p-2.5 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm sm:text-base font-medium">
                Start
              </label>
              <input
                type="datetime-local"
                className="mt-1 block w-full border border-neutral-300 p-2 sm:p-2.5 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium">
                End
              </label>
              <input
                type="datetime-local"
                className="mt-1 block w-full border border-neutral-300 p-2 sm:p-2.5 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
              />
            </div>
          </div>
          {errors.date && (
            <p className="text-xs text-red-600 -mt-2">{errors.date}</p>
          )}

          <div>
            <label className="block text-sm sm:text-base font-medium">
              Color
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {presetColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Choose color ${c}`}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all
                    ${color === c ? "ring-2 ring-offset-2 ring-blue-500" : ""}
                  `}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-3 sm:pt-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-neutral-300 hover:bg-neutral-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;