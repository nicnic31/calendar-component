"use client";
import { useState, useEffect } from "react";
import  { Dayjs } from "dayjs";
import CalendarHeader from "../calendarHeader";
import { monthLabels, weekLabels } from "@/utils/constant";
import listOfDates, { ListOfDatesValue } from "@/utils/listOfDates";
import cn from "classnames";
import { useCalendar } from "../Calendar/context";
import { HandleCalendar } from "../Calendar";

interface DateDisplayProps {
  handleCalendar?: HandleCalendar;
}

const displayMonthText = (monthIndex: number) => {
  return monthLabels.find((month, index) => index === monthIndex);
};

export default function DateDisplay({ handleCalendar }: DateDisplayProps) {
  const {
    month,
    year,
    day,
    selectedDate,
    setView,
    setSelectedDate,
    setCalendar,
    closeCalendar,
  } = useCalendar((state) => ({
    month: state.month,
    year: state.year,
    day: state.day,
    selectedDate: state.selectedDate,
    setView: state.setView,
    setSelectedDate: state.setSelectedDate,
    setCalendar: state.setCalendar,
    closeCalendar: state.closeCalendar,
  }));
  const [dates, setDates] = useState<ListOfDatesValue[]>([]);

  const handlePrevious = () => {
    if (month !== 0) {
      setCalendar(month - 1, year, day);
    } else {
      setCalendar(11, year - 1, day);
    }
  };

  const handleNext = () => {
    if (month !== 11) {
      setCalendar(month + 1, year, day);
    } else {
      setCalendar(0, year + 1, day);
    }
  };

  const handleSelectedDate = (selectedIdx: number, date: Dayjs) => {
    handleCalendar && handleCalendar(date);

    const datesStorage = dates.map((date) => ({
      date: date.date,
      isCurrentMonth: date.isCurrentMonth,
      today: date.today,
      isSelected: false,
    }));
    datesStorage[selectedIdx].isSelected = true;
    setDates(datesStorage);
    setSelectedDate(date);
    setCalendar(date.month(), date.year(), date.date());
    closeCalendar();
  };

  useEffect(() => {
    setDates(listOfDates(month, year));
  }, [month, year]);

  return (
    <div className="">
      <CalendarHeader
        title={`${displayMonthText(month)} ${year}`}
        handleView={() => setView("MONTH_DISPLAY")}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />

      <div className="grid grid-cols-7 gap-1 mt-4 mb-3 w-full">
        {weekLabels.map((label, idx) => (
          <p
            key={idx}
            className="text-xs font-semibold text-slate-600 text-center"
          >
            {label}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 w-full">
        {dates.map((value, idx) => (
          <div
            key={idx}
            className={cn(
              "text-center text-slate-600 h-12 w-12 py-4 rounded-full cursor-pointer hover:bg-slate-100",
              value?.isSelected ||
                (selectedDate?.toDate().toDateString() as string) ===
                  value?.date.toDate().toDateString()
                ? "bg-red"
                : "bg-white"
            )}
            onClick={() => handleSelectedDate(idx, value?.date)}
          >
            <p
              className={cn(
                "text-xs hover:text-black",
                value?.today && "text-red",
                !value?.isCurrentMonth && "text-gray",
                (value?.isSelected ||
                  (selectedDate?.toDate().toDateString() as string) ===
                    value?.date.toDate().toDateString()) &&
                  "text-white font-semibold"
              )}
            >
              {value?.date?.date()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
