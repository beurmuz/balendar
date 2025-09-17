import classNames from "classnames";
import { getMonthGrid, isSameMonthAndYear } from "../../../shared/lib/date";

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
  const { start, weeks } = getMonthGrid(new Date());

  return (
    <section className="w-full flex flex-col p-3">
      <span className="font-bold py-2 text-base ">
        {start.getFullYear()}년 {start.getMonth() + 1}월
      </span>

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
            >
              <span
                className={classNames(
                  "text-xs flex items-center justify-center w-6 h-6 rounded-full",
                  colorClass,
                  {
                    "bg-yellow-200 rounded-full": today, // 조건부 클래스: 조건식
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
