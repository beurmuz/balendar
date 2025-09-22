import CalendarPage from "../features/calendar/CalendarPage";
// import Footer from "../shared/ui/Footer";
import Header from "../shared/ui/Header";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <CalendarPage />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
