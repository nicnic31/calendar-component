"use client";

import dayjs, { Dayjs } from "dayjs";

export type ListOfDatesValue = {
  date: Dayjs;
  isCurrentMonth: boolean;
  today: boolean;
  isSelected: boolean;
};

function listOfDates(month: number, year: number) {
  const startDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const endDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayDates: ListOfDatesValue[] = [];

  // to get the last date of the previous month
  for (let i = 0; i < startDateOfMonth.day(); i++) {
    arrayDates.push({
      date: startDateOfMonth.day(i),
      isCurrentMonth: false,
      today:
        dayjs().toDate().toString() ===
        startDateOfMonth.date(i).toDate().toString(),
      isSelected: false,
    });
  }

  // to get the dates in current / selected month
  for (let i = startDateOfMonth.date(); i <= endDateOfMonth.date(); i++) {
    arrayDates.push({
      date: startDateOfMonth.date(i),
      isCurrentMonth: true,
      today:
        String(startDateOfMonth.date(i).format("MM-DD-YY")) ===
        String(dayjs().format("MM-DD-YY")),
      isSelected: false,
    });
  }

  const remainingDates = 42 - arrayDates.length;

  //   to get the start dates of the upcoming month
  for (
    let i = endDateOfMonth.date() + 1;
    i <= endDateOfMonth.date() + remainingDates;
    i++
  ) {
    arrayDates.push({
      date: endDateOfMonth.date(i),
      isCurrentMonth: false,
      today: false,
      isSelected: false,
    });
  }
  return arrayDates;
}
export default listOfDates;
