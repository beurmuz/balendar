import classNames from "classnames";
import { getMonthGrid, isSameMonthAndYear } from "../../../shared/lib/date";
import { useState } from "react";
import { addMonths, isSameDay, startOfMonth } from "date-fns";

const WEEK_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export default function MonthGrid() {
  const [chosenDate, setChosenDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { start, weeks } = getMonthGrid(chosenDate);

  const goPrevMonth = () =>
    setChosenDate((date) => startOfMonth(addMonths(date, -1)));
  const goNextMonth = () =>
    setChosenDate((date) => startOfMonth(addMonths(date, 1)));

  return (
    <section className="w-full h-full flex flex-col py-7 px-2">
      {/* 헤더 (이전달, 다음달, 오늘) */}
      <nav className="flex justify-center items-center mb-3 gap-4">
        <button className="w-5" onClick={goPrevMonth}>
          {"<"}
        </button>
        <span className="font-bold text-base ">
          {chosenDate.getFullYear()}년 {chosenDate.getMonth() + 1}월
        </span>
        <button className="w-5" onClick={goNextMonth}>
          {">"}
        </button>
      </nav>

      {/* 요일 */}
      <div className="grid grid-cols-7 gap-[1px]">
        {WEEK_LABELS.map((week, idx) => (
          <div
            key={week}
            className={classNames("py-2 text-sm font-medium text-center", {
              "text-blue-500": idx === 5,
              "text-red-500": idx === 6,
            })}
          >
            {week}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-[1px]">
        {weeks.flat().map((day, idx) => {
          const inMonth = isSameMonthAndYear(day, start);
          const weekend = day.getDay();
          const today = isToday(day);

          const selected = selectedDate && isSameDay(day, selectedDate);

          // 달력에 표시되는 날짜 색상
          const colorClass = inMonth
            ? weekend === 0
              ? "text-red-500"
              : weekend === 6
              ? "text-blue-500"
              : "text-black"
            : "text-gray-400";

          return (
            <button
              type="button"
              key={idx}
              className={"min-h-24 grid items-start justify-items-center p-1"}
              onClick={() => inMonth && setSelectedDate(day)}
            >
              <span
                className={classNames(
                  "text-xs flex items-center justify-center w-6 h-6 rounded-full",
                  colorClass,
                  {
                    "bg-gray-200": selected,
                    "bg-yellow-200 rounded-full": !selected && today, // 조건부 클래스: 조건식
                  }
                )}
              >
                {day.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
