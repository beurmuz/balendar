import { startOfMonth, endOfMonth, addDays } from "date-fns";

// 달력의 출발점, 종료점 등 화면에 렌더링 될 기간을 구하는 함수
export function getMonthGrid(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  // 0: 일요일 ~ 6: 토요일, 월요일(1)을 기준으로 앞에 이전 달로 몇 칸을 채워야 하는지 계산
  const startDay = start.getDay(); // 0~6
  const beforeRestDays = (startDay + 6) % 7; // 월요일(1)을 기준으로 변경

  // Grid 시작일 (이전달로 이동한 날짜)
  const gridStart = addDays(start, -beforeRestDays);

  // 6주 x 7일 = 42칸 고정
  const days: Date[] = Array.from(
    { length: 42 },
    (_, i) => addDays(gridStart, i) // (시작일, 0~41번째)
  );

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return { start, end, weeks };
}

// 같은 연, 월인지 검사하는 함수
export function isSameMonthAndYear(date: Date, base: Date) {
  return (
    date.getFullYear() === base.getFullYear() &&
    date.getMonth() === base.getMonth()
  );
}
