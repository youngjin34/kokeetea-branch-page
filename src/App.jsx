import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SalesStatistics from './pages/SalesStatistics';
import style from './App.module.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/Footer';
import DailyStatistics from './pages/DailyStatistics';
import MonthlyStatistics from './pages/MonthlyStatistics';
import ManageStock from './pages/ManageStock';
import ManageBranch from './pages/ManageBranch';
import BranchDetail from './pages/branchDetail';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className={style.App}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sales_statistics" element={<SalesStatistics />} />
            <Route path="/daily_statistics" element={<DailyStatistics />} />
            <Route path="/monthly_statistics" element={<MonthlyStatistics />} />
            <Route path="/manage_stock" element={<ManageStock />} />
            <Route path="/manage_branch" element={<ManageBranch />} />
            <Route path="/branch/:id" element={<BranchDetail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
