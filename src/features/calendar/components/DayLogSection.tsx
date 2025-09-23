export default function DayLogSection({ date }: { date: Date | null }) {
  return (
    <section className="">
      {date ? (
        <div className="border-t-1 border-gray-200 py-4">
          <h3 className="font-bold text-sm mb-2">
            {date.getMonth() + 1}월 {date.getDate()}일의 기록
          </h3>
          <form className="flex gap-2 mt-2">
            <input
              className="flex-1 border-1 border-gray-200 rounded text-sm p-2"
              placeholder="기록을 입력하세요"
            />
            <button className="p-2 bg-gray-200 rounded text-sm">추가</button>
          </form>
        </div>
      ) : (
        <p>날짜를 선택하세요.</p>
      )}
    </section>
  );
}
