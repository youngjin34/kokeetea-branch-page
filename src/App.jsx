import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SalesStatistics from "./pages/SalesStatistics";
import style from "./App.module.css";
import Login from "./pages/Login";
import { useState } from "react";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={style.App}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sales_statistics" element={<SalesStatistics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
