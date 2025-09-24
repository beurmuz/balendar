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
    e.preventDefault();
    onAddLog(text);
    setText("");
  };

  return (
    <section className="">
      {date ? (
        <div className="border-t-1 border-gray-200 py-4">
          <h3 className="font-bold text-sm mb-2">
            {date.getMonth() + 1}월 {date.getDate()}일의 기록
          </h3>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <input
              className="flex-1 border-1 border-gray-200 rounded text-sm p-2"
              placeholder="기록을 입력하세요"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="p-2 bg-gray-200 rounded text-sm">추가</button>
          </form>

          <ul className="mt-3 divide-y text-sm">
            {logs.map((l) => (
              <li
                key={l.id}
                className="py-2 flex items-center justify-between gap-2"
              >
                <div className="flex-1">{l.text}</div>
                <div className="flex items-center gap-3 shrink-0 text-gray-500">
                  <button
                    className="px-2 py-1 border rounded text-xs"
                    onClick={() => onDeleteLog(l.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
            {logs.length === 0 && (
              <li className="py-3 text-gray-400">기록 없음</li>
            )}
          </ul>
        </div>
      ) : (
        <p>날짜를 선택하세요.</p>
      )}
    </section>
  );
}
