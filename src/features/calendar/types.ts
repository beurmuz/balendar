import type { ID, YMD } from "../../shared/types";

export type DailyLog = {
  id: ID;
  date: YMD;
  text: string;
  memo?: string;
  createdAt: number;
  updatedAt: number;
};
