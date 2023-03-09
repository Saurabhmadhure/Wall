import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard/UserDashBoard";
import Profile from "./Pages/Profile";
import CreateWallet from "./Pages/CreateWallet/CreateWallet";
import AllTransaction from "./Pages/Transactions/AllTransaction";
import SendMoney from "./Pages/MoneyTransfer/SendMoney";
import BeforeLoginNavigationBar from "./Pages/BeforeLoginNavigationBar";
import HomePage from "./Pages/Home/LandinngPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="home/send" element={<SendMoney />} />
        <Route path="home/transaction" element={<AllTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
