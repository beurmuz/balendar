import { useEffect, useMemo, useState } from "react";
import { addMonths, startOfMonth } from "date-fns";
import MonthGrid from "./components/MonthGrid";
import DayLogSection from "./components/DayLogSection";
import type { DailyLog } from "./types";
import { ymd } from "../../shared/lib/date";

const STORAGE_KEY = "balendar-logs-v1";

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [allLogs, setAllLogs] = useState<DailyLog[]>([]);

  // 마운트 시 로컬스토리지에서 기록 불러오기
  useEffect(() => {
    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) return;
    try {
      const parsed = JSON.parse(rawData) as any[];
      setAllLogs(parsed);
    } catch {
      /* noop */
    }
  }, []);

  // 기록이 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allLogs));
  }, [allLogs]);

  // 선택된 날짜를 YMD 문자열로 변환
  const selectedYMD = useMemo(
    () => (selectedDate ? ymd(selectedDate) : null),
    [selectedDate]
  );

  // 

  // 추가 함수
  const addLog = (text: string) => {
    if (!selectedYMD) return;
    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    const item: DailyLog = {
      id,
      date: selectedYMD,
      text: text.trim(),
      createdAt: Date.now(),
    };

    if (!item.text) return;
    setAllLogs((logs) => [item, ...logs]);
  };

  const deleteLog = (id: string) => {
    setAllLogs((logs) => logs.filter((log) => log.id !== id));
  };

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
        <DayLogSection
          date={selectedDate}
          logs={logsOfDay}
          onAddLog={addLog}
          onDeleteLog={deleteLog}
        />
      </section>
    </div>
  );
}
