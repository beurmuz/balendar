import { getMonthGrid } from "../../../shared/lib/date";

export default function MonthGrid() {
  const { start, end, weeks } = getMonthGrid(new Date());
  console.log(`start: ${start}`);
  console.log(`end: ${end}`);
  console.log(weeks);
  return <div>MonthGrid</div>;
}
