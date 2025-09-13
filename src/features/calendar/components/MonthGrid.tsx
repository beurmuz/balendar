import { format } from "date-fns";

export default function MonthGrid() {
  console.log(format(new Date(), "yyyy-MM-dd"));

  return <div>MonthGrid</div>;
}
