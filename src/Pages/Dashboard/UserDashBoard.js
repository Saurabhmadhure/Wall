import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { setUserInfo } from "../Signup";
import "./Dashboard.css";
import "../Home.css";

const UserDashboard = ({ userDetails, walletBalance }) => {
  const [accountNo, setAccountNo] = useState(0);
  const [idelBalance, setBalance] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    var name = userDetails?.user.name;

    var acNo = userDetails?.accNo;
    setAccountNo(acNo);
  }, []);

  useEffect(() => {
    if (idelBalance === 0) {
      setBalance(0);
      return;
    }

    axios
      .get(`http://localhost:8080/users/acc/${accountNo}`, accountNo)
      .then((response) => {
        var balance = response.data;

        console.log(balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accountNo]);
  useEffect(() => {
    if (userDetails !== null && userDetails !== undefined) {
      setLoggedIn(true);
    }
  }, [userDetails]);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />

            <br />
            <div className="card text-center">
              <div className="card-header bg-secondary text-white">
                <h1>Welcome {userDetails?.name}</h1>
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
