import { useMemo, useState } from "react";
import { useCalendar } from "../Calendar/context";
import CalendarHeader from "../calendarHeader";
import cn from "classnames";

export default function YearDisplay() {
  const { month, year, day, selectedDate, setView, setCalendar } = useCalendar(
    (state) => ({
      day: state.day,
      month: state.month,
      year: state.year,
      selectedDate: state.selectedDate,
      setView: state.setView,
      setCalendar: state.setCalendar,
    })
  );

  const minimumYr = year - 19;

  const [yearText, setYearText] = useState<number>(year);

  const listOfYrs = useMemo(() => {
    const arrYrs: number[] = [];

    for (let i = minimumYr; i <= year; i++) {
      arrYrs.push(i);
    }

    return arrYrs;
  }, [year]);

  const handleSelectYr = (yr: number) => {
    setCalendar(month, yr, day);
    setView("DATE_DISPLAY");
  };

  const handlePrevious = () => {
    setYearText(yearText - 1);

    // set the another year if it reaches the minimumYear range
    if (yearText === minimumYr) {
      setCalendar(month, yearText - 1, day);
    }
  };

  const handleNext = () => {
    setYearText(yearText + 1);

    // moved the year display if it reaches the maximum year range
    if(yearText === year) {
        setCalendar(month, yearText + 19, day);
    }
  }

  return (
    <>
      <CalendarHeader
        title={`${minimumYr} - ${year}`}
        handleView={() => setView("MONTH_DISPLAY")}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
      <div className="grid grid-cols-5 gap-5 my-5 ">
        {listOfYrs.map((yr, idx) => (
          <div
            key={idx}
            className={cn(
              "cursor-pointer text-center py-5 h-16 rounded-full hover:bg-slate-100 hover:text-slate-600 hover:font-normal",
              selectedDate?.year() === yr
                ? "bg-red text-white font-semibold"
                : "bg-white text-slate-600",
              yearText === yr && "border-2 border-slate-600"
            )}
            onClick={() => handleSelectYr(yr)}
          >
            <p className="text-sm">{yr}</p>
          </div>
        ))}
      </div>
    </>
  );
}
