import { useState } from "react";
import { addMonths, startOfMonth } from "date-fns";
import MonthGrid from "./components/MonthGrid";
import DayLogSection from "./components/DayLogSection";

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goPrevMonth = () =>
    setViewDate((date) => startOfMonth(addMonths(date, -1)));
  const goNextMonth = () =>
    setViewDate((date) => startOfMonth(addMonths(date, 1)));

  return (
    <div className="flex flex-col p-4">
      <section>
        <MonthGrid
          viewDate={viewDate}
          selectedDate={selectedDate}
          onCellClick={setSelectedDate}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
        />
      </section>
      <section>
        <DayLogSection date={selectedDate} />
      </section>
    </div>
  );
}
