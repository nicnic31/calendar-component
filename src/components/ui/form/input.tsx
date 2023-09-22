"use client";
import Calendar, { HandleCalendar } from "@/components/Calendar";
import { useCalendar } from "@/components/Calendar/context";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";

interface IInputProps {
  value?: string | null;
  onChange?: HandleCalendar;
  format?: string;
}

type Display = {
  displayYr: string;
  displayMonth: string;
  displayDate: string;
};

const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const convertStringToArray = (text: string) => {
  return text.split("");
};

export default function Input({ value, onChange, format }: IInputProps) {
  const {
    open,
    year,
    day,
    month,
    openCalendar,
    closeCalendar,
    setCalendar,
    setSelectedDate,
  } = useCalendar((state) => ({
    open: state.open,
    year: state.year,
    month: state.month,
    day: state.day,
    openCalendar: state.openCalendar,
    closeCalendar: state.closeCalendar,
    setCalendar: state.setCalendar,
    setSelectedDate: state.setSelectedDate,
  }));

  const [display, setDisplay] = useState<Display>({
    displayYr: "",
    displayMonth: "",
    displayDate: "",
  });

  // clicking the calendar button to open the calendar component
  const handleOpenCalendar = () => {
    if (open) {
      closeCalendar();
    } else {
      openCalendar();
    }
  };

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to convert it into array to get the last value
    const stringToArr = convertStringToArray(e.target.value);

    if (!numberKeys.includes(stringToArr[e.target.value.length - 1])) {
      setDisplay((prev) => ({ ...prev, displayYr: "" }));
    } else {
      setDisplay((prev) => ({ ...prev, displayYr: e.target.value }));
      setCalendar(month, Number(e.target.value), day);
      setSelectedDate(dayjs(`${Number(e.target.value)}-${month + 1}-${day}`));
    }
  };

  const handleChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to convert it into array to get the last value
    const stringToArr = convertStringToArray(e.target.value);

    if (!numberKeys.includes(stringToArr[e.target.value.length - 1])) {
      setDisplay((prev) => ({ ...prev, displayMonth: "" }));
    } else {
      setDisplay((prev) => ({ ...prev, displayMonth: e.target.value }));
      setCalendar(Number(e.target.value) - 1, year, day);
      setSelectedDate(dayjs(`${year}-${Number(e.target.value)}-${day}`));
    }
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to convert it into array to get the last value
    const stringToArr = convertStringToArray(e.target.value);

    if (!numberKeys.includes(stringToArr[e.target.value.length - 1])) {
      setDisplay((prev) => ({ ...prev, displayDate: "" }));
    } else {
      setDisplay((prev) => ({ ...prev, displayDate: e.target.value }));
      setCalendar(month, year, Number(e.target.value));
      setSelectedDate(dayjs(`${year}-${month + 1}-${e.target.value}`));
    }
  };

  useEffect(() => {
    if (value) {
      const yrValue = value.slice(0, 4);
      const monthValue = value.slice(5, 7);
      const dateValue = value.slice(8, value.length);

      setCalendar(Number(monthValue) - 1, Number(yrValue), Number(dateValue));
      setDisplay({
        displayYr: yrValue,
        displayMonth: Number(monthValue) > 9 ? monthValue : `0${monthValue}`,
        displayDate: dateValue,
      });
      setSelectedDate(dayjs(`${yrValue}-${Number(monthValue)}-${dateValue}`));
    } else {
      setDisplay({
        displayYr: "",
        displayMonth: "",
        displayDate: "",
      });
    }
  }, [value]);

  useEffect(() => {
    setDisplay({
      displayYr: String(year),
      displayMonth: String(month + 1),
      displayDate: String(day),
    });
  }, [year, month, day]);

  return (
    <div className="relative text-slate-600 w-full bg-white outline outline-2 outline-slate-200 py-4 pl-12 cursor-pointer pr-4 rounded text-base hover:outline-slate-500 active:border-none active:outline active:outline-blue-500">
      <div className="w-full flex flex-row justify-start items-center">
        <input
          type="text"
          value={String(display.displayYr)}
          className="w-12 text-right focus:outline-none active:outline:none active:outline-none"
          maxLength={4}
          onChange={handleChangeYear}
          placeholder="YYYY"
        />
        <span className="mx-1">-</span>
        <input
          type="textppoo"
          value={String(display.displayMonth)}
          onChange={handleChangeMonth}
          className="w-7 text-center focus:outline-none active:outline:none active:outline-none"
          maxLength={2}
          placeholder="MM"
        />
        <span className="mx-1">-</span>
        <input
          value={String(display.displayDate)}
          onChange={handleChangeDate}
          maxLength={2}
          className="w-7 text-center focus:outline-none active:outline:none active:outline-none"
          placeholder="DD"
        />
      </div>
      <div className="absolute h-3 top-3 left-3 p-1 rounded-full bg-white text-center h-full text-slate-400 hover:text-slate-600">
        <button onClick={handleOpenCalendar}>
          <FaCalendarDays />
        </button>
      </div>

      {open ? (
        <div className="absolute left-0 top-16 transition-all ease-in-out ">
          <Calendar handleCalendar={onChange} />
        </div>
      ) : null}
    </div>
  );
}
