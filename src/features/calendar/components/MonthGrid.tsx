import { getMonthRange } from "../../../shared/lib/date";

export default function MonthGrid() {
  const { start, end } = getMonthRange(new Date());
  console.log(start, end);
  return <div>MonthGrid</div>;
}
