import { useMemo, useState } from "react";
import type { DailyLog } from "../types";
import { isSameDay } from "date-fns";
import BottomSheet from "../../../shared/ui/BottomSheet";
import { useBottomsheet } from "../../../shared/hooks/useBottomsheet";

type Props = {
  date: Date;
  logs: DailyLog[];
  onCreateLog: (text: string) => void;
  onDeleteLog: (id: string) => void;
  onUpdateLog: (id: string, patch: { text?: string; memo?: string }) => void;
  onToggleDone: (id: string) => void;
};

export default function DayLogSection({
  date,
  logs,
  onCreateLog,
  onDeleteLog,
  onUpdateLog,
  onToggleDone,
}: Props) {
  const [text, setText] = useState("");

  // bottom sheet state
  const [openId, setOpenId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editMemo, setEditMemo] = useState("");

  const sheet = useBottomsheet();

  const dateHeader = isSameDay(date, new Date())
    ? "오늘"
    : `${date.getMonth() + 1}월 ${date.getDate()}일`;

  // 시트가 열려 있을 때 현재 항목(파생)
  const current = useMemo(
    () => (openId ? logs.find((l) => l.id === openId) ?? null : null),
    [logs, openId]
  );
  const done = current?.done ?? false;

  const submitLog = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateLog(text);
    setText("");
  };

  // bottom Sheet open
  const openSheet = (log: DailyLog) => {
    setOpenId(log.id);
    setEditText(log.text);
    setEditMemo(log.memo || "");
    sheet.openSheet();
  };

  // bottom Sheet close
  const closeSheet = () => {
    setOpenId(null);
    setEditText("");
    setEditMemo("");
    sheet.closeSheet();
  };

  // 수정한 내용 저장
  const saveEdit = () => {
    if (!openId) return;
    const newText = editText.trim();
    onUpdateLog(openId, {
      text: newText || undefined,
      memo: editMemo.trim() || undefined,
    });
    closeSheet();
  };

  // 일정 삭제
  const deleteSheet = () => {
    if (!openId) return;
    onDeleteLog(openId);
    closeSheet();
  };

  // 완료 토글(즉시 반영: 부모 상태 변경 → logs 업데이트 → 파생 done 갱신)
  const toggleDoneInSheet = () => {
    if (!current) return;
    onToggleDone(current.id);
  };

  return (
    <section className="">
      <div className="border-t-1 border-gray-200 py-4">
        <h3 className="font-bold text-sm mb-2">{dateHeader}</h3>

        {/* 입력폼 */}
        <form
          onSubmit={submitLog}
          className="flex gap-2 mt-2 p-3 border border-gray-200 rounded"
        >
          <input
            className="flex-1 text-sm focus:outline-none"
            placeholder="새 일정 등록하기"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="rounded pl-2 text-sm">등록</button>
        </form>

        {/* 등록한 일정 리스트 */}
        <ul className="mt-3 gap-2 text-sm flex flex-items-center flex-col border-t-1 border-gray-200 pt-3">
          {logs.map((log) => {
            const hasMemo =
              typeof log.memo === "string" && log.memo.trim().length > 0;

            const hasDone = log.done === true;

            return (
              <li
                key={log.id}
                className={`w-full p-3 flex justify-between items-center gap-2 bg-gray-100 rounded cursor-pointer ${
                  log.done ? "" : "border-r-4 border-blue-300"
                }`}
                onClick={() => openSheet(log)}
              >
                <div
                  className={`truncate 
                    ${hasDone ? "line-through text-gray-500" : ""}`}
                >
                  {log.text}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {hasMemo && (
                    <span className="bg-amber-400 px-1 py-0.5 rounded text-white text-xs font-medium">
                      메모
                    </span>
                  )}
                  {hasDone && (
                    <span className="bg-lime-500 px-1 py-0.5 rounded text-white text-xs font-medium">
                      완료
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* bottom sheet */}
      <BottomSheet open={sheet.open} onClose={closeSheet}>
        {openId && current && (
          <>
            {/* 일정명 */}
            <input
              className="w-full rounded mb-3 text-xl font-bold
              focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />

            {/* 메모 */}
            <label className="block py-1 text-sm font-medium">
              메모
              <span className="text-xs text-gray-500 ml-1">
                ({editMemo.length}/{150})
              </span>
            </label>
            <textarea
              className="block w-full rounded bg-gray-200 mb-7 p-2 text-sm
               ring-1 ring-gray-300
               focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent
               resize-none h-30 appearance-none"
              rows={4}
              placeholder="메모를 적어보세요."
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
              maxLength={150}
            />

            {/* 버튼 */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-400 text-white p-2 rounded"
                onClick={deleteSheet}
              >
                삭제
              </button>
              <button
                className="flex-1 bg-blue-400 text-white p-2 rounded disabled:opacity-50"
                onClick={saveEdit}
                disabled={!editText.trim()}
              >
                확인
              </button>
              <button
                className={`flex-1 text-white p-2 rounded 
                  ${done ? "bg-lime-500" : "bg-gray-400"}`}
                onClick={toggleDoneInSheet}
              >
                {done ? "완료" : "미완료"}
              </button>
            </div>
          </>
        )}
      </BottomSheet>
    </section>
  );
}
