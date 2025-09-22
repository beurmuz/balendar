import { useState } from "react";
import MonthGrid from "./components/MonthGrid";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <MonthGrid />
    </div>
  );
}
