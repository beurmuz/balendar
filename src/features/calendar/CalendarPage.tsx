import { useState } from "react";
import { addMonths, startOfMonth } from "date-fns";
import MonthGrid from "./components/MonthGrid";

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goPrevMonth = () =>
    setViewDate((date) => startOfMonth(addMonths(date, -1)));
  const goNextMonth = () =>
    setViewDate((date) => startOfMonth(addMonths(date, 1)));

  return (
    <>
      <div>
        <MonthGrid
          viewDate={viewDate}
          selectedDate={selectedDate}
          onCellClick={setSelectedDate}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
        />
      </div>
      <div>
        <button>오늘의 건강 상태 기록하기 </button>
      </div>
    </>
  );
}
