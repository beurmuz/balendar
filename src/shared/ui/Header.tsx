import calendarLogo from "@/assets/images/calendar_logo.svg";

export default function Header() {
  return (
    <header className="w-full flex items-center h-10 px-3 py-2  border-b border-gray-200 gap-1 ">
      <div>
        <img src={calendarLogo} alt="Calendar Logo" className="h-4 w-4" />
      </div>
      <h1 className="text-base font-medium">Balendar</h1>
    </header>
  );
}
