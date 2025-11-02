import React from "react";
import "./App.css";
import CalendarView from "./components/Calendar/CalendarView";

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Uzence Calendar</h1>
            <p className="text-sm text-neutral-500">
              Manage & view events — responsive, fast, and clean ✨
            </p>
          </div>
          <div className="hidden sm:flex text-xs text-neutral-400">
            <span>Made using React + Zustand + Tailwind + TypeScript + StoryBook</span>
          </div>
        </div>
      </header>

      {/* Main calendar area */}
      <section className="flex grow items-start justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 md:p-6 lg:p-8">
            <CalendarView
              initialView="month"
              initialDate={new Date()}
              initialEvents={[]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-neutral-200 py-3 mt-auto">
        <div className="max-w-6xl mx-auto text-center px-4 text-xs text-neutral-500">
          <p className="mb-1 sm:mb-0">
            © {new Date().getFullYear()} Uzence Design Studio — Calendar
          </p>
        </div>
      </footer>
    </main>
  );
};

export default App;