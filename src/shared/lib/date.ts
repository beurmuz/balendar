import { startOfMonth, endOfMonth } from "date-fns";

export function getMonthRange(date: Date) {
  // 달력의 출발점, 종료점 등 화면에 렌더링 될 기간을 구하는 함수
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return { start, end };
}

// export function getDaysInMonth(date: Date) {
//   // 해당 달의 모든 날짜를 배열로 반환하는 함수
//   const start = startOfMonth(date);
//   const end = endOfMonth(date);
//   const days = [];
//   for (let day = start; day <= end; day = addDays(day, 1)) {
//     days.push(day);
//   }
//   return days;
// }
