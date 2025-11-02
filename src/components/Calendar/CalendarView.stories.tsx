import type { Meta, StoryObj } from "@storybook/react";
import CalendarView from "./CalendarView";
import type { CalendarEvent } from "./CalendarView.types";

// for all screenshots and stories, define custom viewports
const customViewports = {
  smallMobile: {
    name: "Small Mobile",
    styles: { width: "375px", height: "667px" },
    type: "mobile",
  },
  sm: {
    name: "Large Mobile (sm ≥640px)",
    styles: { width: "640px", height: "960px" },
    type: "mobile",
  },
  md: {
    name: "Tablet (md ≥768px)",
    styles: { width: "768px", height: "1024px" },
    type: "tablet",
  },
  lg: {
    name: "Desktop (lg ≥1024px)",
    styles: { width: "1024px", height: "768px" },
    type: "desktop",
  },
  xl: {
    name: "Large Desktop (xl ≥1280px)",
    styles: { width: "1280px", height: "800px" },
    type: "desktop",
  },
};

const meta: Meta<typeof CalendarView> = {
  title: "Components/Calendar/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "fullscreen",
    viewport: { viewports: customViewports, defaultViewport: "md" },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// initial events for stories
const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    description: "Daily sync with the team",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 9, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 9, 30),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "evt-2",
    title: "Design Review",
    description: "Review new component designs",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 14, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 15, 30),
    color: "#10b981",
    category: "Design",
  },
  {
    id: "evt-3",
    title: "Client Presentation",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 10, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 11, 30),
    color: "#f59e0b",
    category: "Meeting",
  },
];

const fixedNow = new Date();
const fixedEvents = sampleEvents.map((e) => ({ ...e }));

export const Default: Story = {
  args: {
    initialView: "month",
    initialDate: fixedNow,
    initialEvents: fixedEvents,
  },
};

export const Empty: Story = {
  args: {
    initialView: "month",
    initialDate: new Date(),
    initialEvents: [],
  },
};

export const WeekView: Story = {
  args: {
    initialView: "week",
    initialDate: new Date(),
    initialEvents: sampleEvents,
  },
};

export const ManyEvents: Story = {
  args: {
    initialView: "month",
    initialDate: new Date(),
    initialEvents: Array.from({ length: 22 }).map((_, i) => {
      const d = new Date();
      d.setDate(1 + (i % 28));
      return {
        id: `many-${i}`,
        title: `Event ${i + 1}`,
        startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9 + (i % 6)),
        endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 10 + (i % 6)),
        color: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"][i % 4],
      } as CalendarEvent;
    }),
  },
};

export const Interactive: Story = {
  args: {
    initialView: "month",
    initialDate: new Date(),
    initialEvents: sampleEvents,
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};