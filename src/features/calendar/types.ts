import type { ID, YMD } from "../../shared/types";

export type DailyLog = {
  id: ID;
  date: YMD;
  text: string;
  createdAt: number;
};
