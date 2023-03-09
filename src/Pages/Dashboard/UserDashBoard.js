import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { setUserInfo } from "../Signup";

const UserDashboard = ({ userDetails, walletBalance }) => {
  const [uname, setUname] = useState("");
  const [accountNo, setAccountNo] = useState(0);
  const [idelBalance, setBalance] = useState(0);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    var name = userDetails?.user.name;
    console.log(userDetails);
    console.log(userDetails?.user.name);

    setUname(name);

    var acNo = userDetails?.accNo;
    setAccountNo(acNo);
  }, []);
  console.log(userDetails?.accNo);

  useEffect(() => {
    var storedData = localStorage.getItem("accDetails");
  });
  useEffect(() => {
    if (idelBalance === 0) {
      setBalance(0);
      return;
    }

    axios
      .get(`http://localhost:8080/api/v1/all/acc/${accountNo}`, accountNo)
      .then((response) => {
        console.log("avai bal" + response.data);
        var balance = response.data;

        console.log(balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accountNo]);
  const handleBalance = (data) => {
    setMoney(data);
  };

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center"> Wallet</h1>
            <br />

            <br />
            <div className="card text-center">
              <div className="card-header bg-secondary text-white">
                <h1>WelCome {userDetails?.user.name}</h1>
              </div>
            </div>
            <hr />

            <DashboardItem userDetails={userDetails} />

            {/* {setUserInfo(userDetails, walletBalance)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
