import { useEffect, useMemo, useState } from "react";
import { addMonths, startOfMonth } from "date-fns";
import MonthGrid from "./components/MonthGrid";
import DayLogSection from "./components/DayLogSection";
import type { DailyLog } from "./types";
import { ymd } from "../../shared/lib/date";

const STORAGE_KEY = "balendar-logs-v1";

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [allLogs, setAllLogs] = useState<DailyLog[]>([]);

  // 마운트 시 localStorage에서 기록 불러오기
  useEffect(() => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;

    try {
      const parsed = JSON.parse(rawData) as any[];
      const toMs = (v: any) => {
        if (typeof v === "number" && Number.isFinite(v)) return v;
        const t = new Date(v).getTime();
        return Number.isFinite(t) ? t : undefined;
      };
      const fixed: DailyLog[] = parsed.map((l) => ({
        ...l,
        createdAt: toMs(l.createdAt) ?? Date.now(),
        updatedAt: toMs(l.updatedAt), // 없거나 이상하면 undefined
        done: typeof l.done === "boolean" ? l.done : false,
      }));
      setAllLogs(fixed);
    } catch {
      /* noop */
    }
  }, []);

  // 기록이 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allLogs));
  }, [allLogs]);

  // 날짜를 YMD 문자열로 변환
  const dateToYMD = useMemo(() => ymd(selectedDate), [selectedDate]);

  // 선택된 날짜의 기록만 골라서 DayLogSection에 전달
  const selectedDayLog = useMemo(
    () => (dateToYMD ? allLogs.filter((log) => log.date === dateToYMD) : []),
    [allLogs, dateToYMD]
  );

  // 최근 생성된 기록이 위로 오도록 정렬하기
  const logsOfDay = useMemo(() => {
    return [...selectedDayLog].sort((a, b) => b.createdAt - a.createdAt);
  }, [selectedDayLog]);

  // Create
  const createLog = (text: string) => {
    if (!dateToYMD) return;

    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    const item: DailyLog = {
      id,
      date: dateToYMD,
      text: text.trim(),
      createdAt: Date.now(),
      done: false,
    };

    if (!item.text) return; // 빈 입력 방지
    setAllLogs((logs) => [item, ...logs]);
  };

  // Delete
  const deleteLog = (id: string) => {
    setAllLogs((logs) => logs.filter((log) => log.id !== id));
  };

  // Update
  const updateLog = (id: string, patch: { text?: string; memo?: string }) => {
    setAllLogs((prev) =>
      prev.map((log) =>
        log.id === id ? { ...log, ...patch, updatedAt: Date.now() } : log
      )
    );
  };

  // done check
  const toggleDone = (id: string) => {
    setAllLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, done: !log.done } : log))
    );
  };

  const goPrevMonth = () =>
    setViewDate((date) => startOfMonth(addMonths(date, -1)));
  const goNextMonth = () =>
    setViewDate((date) => startOfMonth(addMonths(date, 1)));

  // 날짜별 일정 개수 집계하기 -> allLogs -> { 'YYYY-MM-DD': number }
  const countsByYMD = useMemo(() => {
    const out: Record<string, number> = {};
    for (const l of allLogs) {
      out[l.date] = (out[l.date] ?? 0) + 1;
    }
    return out;
  }, [allLogs]);

  return (
    <div className="flex flex-col p-4">
      <section>
        <MonthGrid
          viewDate={viewDate}
          selectedDate={selectedDate}
          onCellClick={setSelectedDate}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
          indicatorsByYMD={countsByYMD}
        />
      </section>
      <section>
        <DayLogSection
          date={selectedDate}
          logs={logsOfDay}
          onCreateLog={createLog}
          onDeleteLog={deleteLog}
          onUpdateLog={updateLog}
          onToggleDone={toggleDone}
        />
      </section>
    </div>
  );
}
