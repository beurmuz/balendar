import { useState } from "react";
// import { hm } from "../../../shared/lib/date";
import type { DailyLog } from "../types";

type Props = {
  date: Date | null;
  logs: DailyLog[];
  onAddLog: (text: string) => void;
  onDeleteLog: (id: string) => void;
};

export default function DayLogSection({
  date,
  logs,
  onAddLog,
  onDeleteLog,
}: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 실행 방지
    onAddLog(text);
    setText("");
  };

  return (
    <section className="">
      {date ? (
        <div className="border-t-1 border-gray-200 py-4">
          <h3 className="font-bold text-sm mb-2">
            {date.getMonth() + 1}월 {date.getDate()}일
          </h3>
          {/* 입력폼 */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 mt-2 p-3 bg-gray-100 rounded"
          >
            <input
              className="flex-1  text-sm focus:outline-none"
              placeholder="새 일정 등록하기"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="rounded pl-2 text-sm">등록</button>
          </form>

          {/* 일정 리스트 */}
          <ul className="mt-3 gap-2 text-sm flex flex-items-center flex-col">
            {logs.map((log) => (
              <li
                key={log.id}
                className="p-3 flex justify-between gap-2 bg-blue-200 rounded"
              >
                <div className="flex-1">{log.text}</div>
                <div className="flex items-center gap-3 shrink-0 text-gray-700">
                  <button
                    className="pl-2 text-sm"
                    onClick={() => onDeleteLog(log.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
            {logs.length === 0 && null}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
