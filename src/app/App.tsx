import MonthGrid from "../features/calendar/components/MonthGrid";
import Footer from "../shared/ui/Footer";
import Header from "../shared/ui/Header";

function App() {
  return (
    <div className="App flex flex-col  justify-between min-h-screen">
      <Header />
      <MonthGrid />
      <Footer />
    </div>
  );
}

export default App;
