import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

type ViewName = "DATE_DISPLAY" | "MONTH_DISPLAY" | "YEAR_DISPLAY";

interface ICalendarProps {
  open: boolean;
  view: ViewName;
  month: number;
  year: number;
  day: number,
  selectedDate: Dayjs | null;
  setCalendar: (month: number, year: number, day:number) => void;
  setSelectedDate: (selectedDate: Dayjs) => void;
  setView: (view: ViewName) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
}

export const useCalendar = create<ICalendarProps>((set) => ({
  open: false,
  view: "DATE_DISPLAY",
  month: dayjs().month(),
  year: dayjs().year(),
  day: dayjs().date(),
  selectedDate: dayjs(),
  setCalendar: (month: number, year: number, day: number) =>
    set((state) => ({ ...state, month, year, day })),
  setSelectedDate: (selectedDate: Dayjs) =>
    set((state) => ({ ...state, selectedDate })),
  setView: (view: ViewName) => set((state) => ({ ...state, view })),
  openCalendar: () => set((state) => ({ ...state, open: true })),
  closeCalendar: () => set((state) => ({ ...state, open: false })),
}));
