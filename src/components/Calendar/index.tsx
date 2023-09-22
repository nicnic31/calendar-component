import { Dayjs } from "dayjs";
import DateDisplay from "../date-display";
import MonthDisplay from "../month-display";
import YearDisplay from "../year-display";
import { useCalendar } from "./context";

export type HandleCalendar = (date: Dayjs) => void;

const displayView = (view: string, handleCalendar?: HandleCalendar) => {
  if (view === "DATE_DISPLAY") {
    return <DateDisplay handleCalendar={handleCalendar} />;
  } else if (view === "MONTH_DISPLAY") {
    return <MonthDisplay />;
  } else {
    return <YearDisplay />;
  }
};

export default function Calendar({
  handleCalendar,
}: {
  handleCalendar?: HandleCalendar;
}) {
  const { view } = useCalendar((state) => ({ view: state.view }));
  return (
    <div className="w-[400px] h-[400px] p-2 shadow-lg bg-white border border-black rounded-md">
      {displayView(view, handleCalendar)}
    </div>
  );
}
