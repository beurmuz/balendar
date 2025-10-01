import { useEffect, useState } from "react";
// import { hm } from "../../../shared/lib/date";
import type { DailyLog } from "../types";
import { isSameDay } from "date-fns";

type Props = {
  date: Date;
  logs: DailyLog[];
  onAddLog: (text: string) => void;
  onDeleteLog: (id: string) => void;
  onUpdateLog?: (id: string, patch: { text?: string; memo?: string }) => void;
};

export default function DayLogSection({
  date,
  logs,
  onAddLog,
  onDeleteLog,
  onUpdateLog,
}: Props) {
  const [text, setText] = useState("");

  const [openId, setOpenId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editMemo, setEditMemo] = useState("");

  const isToday = date.toDateString() === new Date().toDateString();
  const dateHeader = isSameDay(date, new Date())
    ? "오늘"
    : `${date.getMonth() + 1}월 ${date.getDate()}일`;

  const submitNew = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 실행 방지
    onAddLog(text);
    setText("");
  };

  const openSheet = (log: DailyLog) => {
    setOpenId(log.id);
    setEditText(log.text);
    setEditMemo(log.memo || "");
  };

  const closeSheet = () => {
    setOpenId(null);
    setEditText("");
    setEditMemo("");
  };

  const saveEdit = () => {
    if (!openId) return;
    const t = editText.trim();
    onUpdateLog(openId, {
      text: t || undefined,
      memo: editMemo.trim() || undefined,
    });
    closeSheet();
  };

  const deleteFromSheet = () => {
    if (!openId) return;
    onDeleteLog(openId);
    closeSheet();
  };

  // ESC 로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="">
      <div className="border-t-1 border-gray-200 py-4">
        <h3 className="font-bold text-sm mb-2">{dateHeader}</h3>

        {/* 입력폼 */}
        <form
          onSubmit={submitNew}
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
              className="w-full p-3 flex justify-between gap-2 bg-blue-200 rounded cursor-pointer"
              onClick={() => openSheet(log)}
            >
              <div className="flex-1">
                <div className="font-medium">
                  {log.text}
                  {log.updatedAt && log.updatedAt > log.createdAt && (
                    <span className="ml-2 text-[10px] text-gray-700">
                      편집됨
                    </span>
                  )}
                </div>
                {log.memo && (
                  <div className="text-xs text-gray-700 mt-0.5 line-clamp-1">
                    {log.memo}
                  </div>
                )}
              </div>
            </li>
          ))}
          {logs.length === 0 && null}
        </ul>
      </div>

      {/* 바텀시트 */}
      {openId && (
        <>
          {/* overlay */}
          <div className="fixed inset-0 bg-black/30" onClick={closeSheet} />
          {/* sheet */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-0 right-0 bottom-0 rounded-t-2xl bg-white p-4 shadow-2xl
                       animate-[slideUp_160ms_ease-out] max-h-[70vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">일정 상세</h4>
                <button className="text-gray-500 text-sm" onClick={closeSheet}>
                  닫기
                </button>
              </div>

              <label className="block text-xs text-gray-500 mb-1">제목</label>
              <input
                className="w-full border rounded p-2 text-sm mb-3"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />

              <label className="block text-xs text-gray-500 mb-1">
                메모 (선택)
              </label>
              <textarea
                className="w-full border rounded p-2 text-sm min-h-[80px]"
                placeholder="간단한 메모를 적어보세요"
                value={editMemo}
                onChange={(e) => setEditMemo(e.target.value)}
              />

              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 bg-blue-600 text-white rounded py-2 text-sm disabled:opacity-50"
                  onClick={saveEdit}
                  disabled={!editText.trim()}
                >
                  저장
                </button>
                <button
                  className="flex-1 border border-red-500 text-red-600 rounded py-2 text-sm"
                  onClick={deleteFromSheet}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideUp { from { transform: translateY(16px); opacity: .8 } to { transform: translateY(0); opacity: 1 } }
          `}</style>
        </>
      )}
    </section>
  );
}
