import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SalesStatistics from "./pages/SalesStatistics";
import style from "./App.module.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import DailyStatistics from "./pages/DailyStatistics";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={style.App}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sales_statistics" element={<SalesStatistics />} />
          <Route path="/daily_statistics" element={<DailyStatistics />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
