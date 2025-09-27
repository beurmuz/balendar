import classNames from "classnames";
import {
  getMonthGrid,
  isSameMonthAndYear,
  ymd,
} from "../../../shared/lib/date";
import { isSameDay } from "date-fns";

const WEEK_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

type Props = {
  viewDate: Date;
  selectedDate: Date | null;
  onCellClick: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  indicatorsByYMD: Record<string, number>;
};

export default function MonthGrid({
  viewDate,
  selectedDate,
  onCellClick,
  onPrevMonth,
  onNextMonth,
  indicatorsByYMD,
}: Props) {
  const { start, weeks } = getMonthGrid(viewDate);

  return (
    <section className="w-full h-full flex flex-col ">
      {/* 헤더 (이전달, 다음달, 오늘) */}
      <nav className="flex justify-center items-center mb-3 gap-4">
        <button className="w-5" onClick={onPrevMonth}>
          {"<"}
        </button>
        <span className="font-bold text-base ">
          {start.getFullYear()}년 {start.getMonth() + 1}월
        </span>
        <button className="w-5" onClick={onNextMonth}>
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

          const key = ymd(day);
          const count = (inMonth && indicatorsByYMD[key]) || 0;

          return (
            <button
              type="button"
              key={idx}
              className={"min-h-20 grid items-start justify-items-center p-1"}
              onClick={() => inMonth && onCellClick(day)}
            >
              {/* 날짜 숫자 */}
              <span
                className={classNames(
                  "text-xs flex items-center justify-center w-6 h-6 rounded-full ",
                  colorClass,
                  {
                    "bg-gray-200": selected,
                    "bg-yellow-200 rounded-full": !selected && today, // 조건부 클래스: 조건식
                  }
                )}
              >
                {day.getDate()}
              </span>

              {/* 일정 개수 표시 */}
              {count > 0 && (
                <span className="text-xs text-white bg-blue-400 w-4 h-4 rounded-full flex items-center justify-center mt-1">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}