import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard/UserDashBoard";
import Profile from "./Pages/Profile";
import AllTransaction from "./Pages/Transactions/AllTransaction";
import SendMoney from "./Pages/MoneyTransfer/SendMoney";
import HomePage from "./Pages/Home/LandinngPage";
import OTP from "./Pages/OTP";
import { useState } from "react";
import UserContext from "./Pages/Dashboard/UserContext";
function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="send" element={<SendMoney />} />
          </Route>
          <Route path="/home/transaction" element={<AllTransaction />} />
          <Route path="/home/otp" element={<OTP />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </UserContext.Provider>{" "}
    </BrowserRouter>
  );
}

export default App;
