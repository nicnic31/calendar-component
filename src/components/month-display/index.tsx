import { useState } from "react";
import { shortMonthLabels } from "@/utils/constant";
import CalendarHeader from "../calendarHeader";
import cn from "classnames";
import { useCalendar } from "../Calendar/context";
export default function MonthDisplay() {
  const { month, year, day, selectedDate, setCalendar, setView } = useCalendar(
    (state) => ({
      day: state.day,
      selectedDate: state.selectedDate,
      month: state.month,
      year: state.year,
      setCalendar: state.setCalendar,
      setView: state.setView,
    })
  );

  const [monthText, setMonthText] = useState<number>(month);

  const handleSelectMonth = (idx: number) => {
    setCalendar(idx, year, day);
    setView("DATE_DISPLAY");
  };

  const handlePrevious = () => {
    if (monthText === 0) {
      setMonthText(11);
    } else {
      setMonthText(monthText - 1);
    }
  };

  const handleNext = () => {
    if (monthText === 11) {
      setMonthText(0);
    } else {
      setMonthText(monthText + 1);
    }
  };

  return (
    <>
      <CalendarHeader
        title={`${year}`}
        handleView={() => setView("YEAR_DISPLAY")}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />

      <div className="grid grid-cols-4 gap-9 mt-9 mb-3">
        {shortMonthLabels.map((label, idx) => (
          <div
            className={cn(
              "cursor-pointer text-center py-5 h-16 rounded-full hover:bg-slate-100 hover:text-slate-600 hover:font-normal",
              selectedDate?.month() === idx
                ? "bg-red text-white font-semibold"
                : "bg-white text-slate-600",
              monthText === idx && "border-2 border-slate-600"
            )}
            key={idx}
            onClick={() => handleSelectMonth(idx)}
          >
            <p className="text-sm tracking-wider">{label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
