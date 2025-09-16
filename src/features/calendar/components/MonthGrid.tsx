import { getMonthGrid, isSameMonthAndYear } from "../../../shared/lib/date";

const WEEK_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

export default function MonthGrid() {
  const { start, weeks } = getMonthGrid(new Date());

  return (
    <section className="w-full flex flex-col p-3">
      <span className="font-bold py-2 text-base ">
        {start.getFullYear()}년 {start.getMonth() + 1}월
      </span>

      {/* 요일 */}
      <div className="grid grid-cols-7 gap-[1px]">
        {WEEK_LABELS.map((week) => (
          <div key={week} className="py-2 text-sm font-medium text-center">
            {week}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-[1px]">
        {weeks.flat().map((day, idx) => {
          const inMonth = isSameMonthAndYear(day, start);

          return (
            <button
              type="button"
              key={idx}
              className={"min-h-24 grid items-start p-1"}
            >
              <span
                className={
                  inMonth ? "text-xs text-black" : "text-gray-400 text-xs"
                }
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
