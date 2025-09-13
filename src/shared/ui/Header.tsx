import calendarLogo from "@/assets/images/calendar_logo.svg";

export default function Header() {
  return (
    <header className="w-full flex items-center h-12 px-3 py-2  border-b border-gray-200 gap-1 ">
      <div>
        <img src={calendarLogo} alt="Calendar Logo" className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-medium">Balendar</h1>
    </header>
  );
}
