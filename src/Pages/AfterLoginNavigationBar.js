import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SignInModel from "./Modals/SignInModal";
import LoginModel from "./Modals/LoginModel";

const NavigationBar = ({ handleUserInfo, userDetails }) => {
  const [uname, setUname] = useState("");
  const [account, setAccount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [signModalShow, setSignModalShow] = useState(false);
  useEffect(() => {
    var storedData = localStorage.getItem("accDetails");
    // console.log(props.userDetails?.user.name);
    var name = userDetails?.user.name;
    const handleUserInfo = (user) => {
      setUname(user.name);
      // other code to handle user information
    };
    setUname(name);

    var acNo = localStorage.getItem("account");
    setAccount(acNo);
  }, []);

  // useEffect(() => {
  //   if (account === 0) {
  //     setAccount(0);
  //     return;
  //   }
  // }, [account]);
  const Logout = () => {
    localStorage.clear();

    window.location.href = "/";
    toast.success("Successfully Logged Out");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-2">
      <div className="container-fluid  d-flex align-items-center">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link mt-1" href="/">
              <strong>
                <h2>Wallet</h2>
              </strong>{" "}
            </a>
          </li>
        </ul>

        <Navbar.Collapse className="justify-content-end">
          {uname ? (
            <DropdownButton id="dropdown-basic-button" title={uname}>
              <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
            </DropdownButton>
          ) : (
            <>
              <button
                className="btn btn-outline-light mx-2"
                onClick={() => setModalShow(true)}>
                {uname ? uname : "Login"}
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => setSignModalShow(true)}>
                {uname ? uname : "SignUp"}
              </button>
            </>
          )}

          <LoginModel
            handleUserInfo={(user) => {
              setUname(user.user.name);
              console.log(user);
              handleUserInfo(user);
            }}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <SignInModel
            handleUserInfo={(user) => {
              setUname(user.user.name);
              console.log(user);
              handleUserInfo(user);
            }}
            show={signModalShow}
            onHide={() => setSignModalShow(false)}
          />
        </Navbar.Collapse>
      </div>
    </nav>
  );
};

export default NavigationBar;
