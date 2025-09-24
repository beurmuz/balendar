import { startOfMonth, getDaysInMonth, addDays, format } from "date-fns";

export const ymd = (date: Date) => format(date, "yyyy-MM-dd");
export const hm = (ms: number) => format(ms, "HH:mm");

// 달력의 출발점, 종료점 등 화면에 렌더링 될 기간을 구하는 함수
export function getMonthGrid(date: Date) {
  const start = startOfMonth(date);
  const startDay = start.getDay(); // 0: 일 ~ 6: 토

  const beforeRestDays = (startDay + 6) % 7; // 월요일(1)을 기준으로 변경
  const totalDates = getDaysInMonth(start); // 해당 월의 총 일수

  const totalWeeks = Math.ceil((beforeRestDays + totalDates) / 7); // 총 몇 주가 필요한지
  const totalCells = totalWeeks * 7; // 총 몇 칸이 필요한지

  // Grid 시작일 (이전달로 이동한 날짜)
  const gridStart = addDays(start, -beforeRestDays);

  // 6주 x 7일 = 42칸 고정
  const days: Date[] = Array.from(
    { length: totalCells },
    (_, i) => addDays(gridStart, i) // (시작일, 0~41번째)
  );

  const weeks: Date[][] = [];
  for (let i = 0; i < totalCells; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return { start, weeks };
}

// 같은 연, 월인지 검사하는 함수
export function isSameMonthAndYear(date: Date, base: Date) {
  return (
    date.getFullYear() === base.getFullYear() &&
    date.getMonth() === base.getMonth()
  );
}
