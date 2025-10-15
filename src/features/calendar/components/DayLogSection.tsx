import { useEffect, useState } from "react";
// import { hm } from "../../../shared/lib/date";
import type { DailyLog } from "../types";
import { isSameDay } from "date-fns";

type Props = {
  date: Date;
  logs: DailyLog[];
  onCreateLog: (text: string) => void;
  onDeleteLog: (id: string) => void;
  onUpdateLog: (id: string, patch: { text?: string; memo?: string }) => void;
};

export default function DayLogSection({
  date,
  logs,
  onCreateLog,
  onDeleteLog,
  onUpdateLog,
}: Props) {
  const [text, setText] = useState("");

  // bottom sheet state
  const [openId, setOpenId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editMemo, setEditMemo] = useState("");

  const dateHeader = isSameDay(date, new Date())
    ? "오늘"
    : `${date.getMonth() + 1}월 ${date.getDate()}일`;

  const submitLog = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 실행 방지
    onCreateLog(text);
    setText("");
  };

  // bottom Sheet open
  const openSheet = (log: DailyLog) => {
    setOpenId(log.id);
    setEditText(log.text);
    setEditMemo(log.memo || "");
  };

  // bottom Sheet close
  const closeSheet = () => {
    setOpenId(null);
    setEditText("");
    setEditMemo("");
  };

  // 수정한 내용 저장
  const saveEdit = () => {
    if (!openId) return;

    const newText = editText.trim();
    onUpdateLog(openId, {
      text: newText || undefined,
      memo: editMemo.trim() || undefined,
    });
    closeSheet(); // 자동 닫기
  };

  // 일정 삭제
  const deleteSheet = () => {
    if (!openId) return;
    onDeleteLog(openId);
    closeSheet();
  };

  return (
    <section className="">
      <div className="border-t-1 border-gray-200 py-4">
        <h3 className="font-bold text-sm mb-2">{dateHeader}</h3>

        {/* 입력폼 */}
        <form
          onSubmit={submitLog}
          className="flex gap-2 mt-2 p-3 border-1 border-gray-200 rounded"
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
          {logs.map((log) => (
            <li
              key={log.id}
              className="w-full p-3 flex justify-between gap-2 bg-gray-100 rounded cursor-pointer"
              onClick={() => openSheet(log)}
            >
              <div>{log.text}</div>
              <div>
                {log.memo && (
                  <span className="bg-pink-400 m-1 px-1 py-0.5 rounded text-white text-xs font-medium">
                    메모
                  </span>
                )}
                {log.updatedAt && log.updatedAt > log.createdAt && (
                  <span className="bg-orange-400 mr-1 px-1 py-0.5 rounded text-white text-xs font-medium">
                    수정됨
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* bottom sheet */}
      {openId && (
        <>
          {/* overlay */}
          <div className="fixed inset-0 bg-black/30" onClick={closeSheet} />

          {/* sheet */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-0 right-0 bottom-0 bg-white max-h-[70vh] rounded-t-2xl px-4 py-7 animate-[slideUp_160ms_ease-out]"
          >
            <label className="block py-1">일정명</label>
            <input
              className="w-full border border-gray-300 rounded p-2 mb-7
              focus:outline-none
              focus-visible:outline-none
              focus:ring-0
              focus-visible:ring-0
              focus:border-blue-400
              "
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <label className="block py-1">
              메모{" "}
              <span className="text-xs text-gray-500">
                ({editMemo.length} / {150})
              </span>
            </label>
            <textarea
              className="block w-full rounded bg-white mb-7 p-2
               ring-1 ring-gray-300
               focus:outline-none focus:ring-1
               focus:ring-blue-400
               focus:border-transparent
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
                className="flex-1 bg-blue-400 text-white p-2 rounded"
                onClick={saveEdit}
                disabled={!editText.trim()}
              >
                저장
              </button>
              <button
                className="flex-1 bg-gray-400 text-white p-2 rounded"
                onClick={deleteSheet}
              >
                삭제
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
