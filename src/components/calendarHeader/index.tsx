import dayjs from "dayjs";
import { FaArrowLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Button from "../ui/button";

interface CalendarHeaderProps {
  title: string;
  handlePrevious: () => void;
  handleNext: () => void;
  handleView: () => void;
  isButtonDisable?: boolean;
}

function CalendarHeader({
  title,
  handleView,
  handlePrevious = () => {},
  handleNext = () => {},
  isButtonDisable = false,
}: CalendarHeaderProps) {
  return (
    <div className="w-full flex flex-row items-center justify-center p-1">
      <div className="w-12 text-xs">
        <Button
          variant="text"
          color="info"
          onClick={handlePrevious}
          disabled={isButtonDisable}
        >
          <FaAngleLeft />
        </Button>
      </div>
      <div
        onClick={handleView}
        className="w-full text-center cursor-pointer hover:bg-slate-100"
      >
        <p className="text-slate-600 font-semibold tracking-wide text-base">
          {title}
        </p>
      </div>
      <div className="w-12 text-xs">
        <Button
          variant="text"
          color="info"
          onClick={handleNext}
          disabled={isButtonDisable}
        >
          <FaAngleRight />
        </Button>
      </div>
    </div>
  );
}

export default CalendarHeader;
