import { addMonths, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MonthSwitcherProps {
  initialSelectedDate?: Date;
  onDateChange: (date: Date | null) => void;
}
const MonthSwitcher: React.FC<MonthSwitcherProps> = ({
  initialSelectedDate,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  );
  useEffect(() => {
    // Notify parent component about the initial selected date
    onDateChange(selectedDate ?? null);
  }, [selectedDate, onDateChange]);

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) =>
      prevDate ? subMonths(prevDate, 1) : undefined
    );
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) =>
      prevDate ? addMonths(prevDate, 1) : undefined
    );
  };

  return (
    <div className="flex items-center">
      <button onClick={handlePrevMonth}>
        <FaChevronLeft />
      </button>
      <div>
        <DatePicker
          selected={selectedDate ?? null}
          onChange={(date: Date | null) => {
            setSelectedDate(date ?? undefined);
            onDateChange(date);
          }}
          dateFormat="MMMM yyyy"
          className=" inline-flex max-w-max text-center"
        />
      </div>
      <button onClick={handleNextMonth}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default MonthSwitcher;
