import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import Card from "../../Component/Card";
import React, { useContext } from "react";
import UserContext, { MyContext } from "../../Pages/Dashboard/UserContext";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../Services/user-Service";
import context from "react-bootstrap/esm/AccordionContext";
import OTP from "../OTP";

const LoginModel = ({
  handleOTPVerification,
  isOTPVerified,
  handleUserInfo,
  onHide,
  ...props
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // const [loginResponseData, setLoginResponseData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const tempOtpVerifiedFlag = localStorage.getItem("otpVerification");

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };
  const otpStatusFromModal = (otpdata) => {
    setOtpStatus(otpdata);
  };
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (data.email.trim().length === 0) {
      toast.error("Email is Empty");
      return;
    }
    if (data.password.trim().length === 0) {
      toast.error("Password is Empty");
      return;
    }
    loginUser(data)
      .then((jwtTokenData) => {
        // doLogin(jwtTokenData, () => {});
        // console.log(jwtTokenData);
        var token = jwtTokenData;
        // console.log(token);
        // console.log(isOTPVerified);
        // setLoginResponseData(token);
        handleUserInfo(token);

        localStorage.setItem("tokens", token?.token);
        localStorage.setItem("userName", token.name);
        localStorage.setItem("tokens", token.token);
        localStorage.setItem("accounts", token?.accNo);
        localStorage.setItem("email", token.email);
        localStorage.setItem("name", token.name);
        localStorage.setItem("userData", JSON.stringify(token));

        toast.success("Succesfully Logged in");
        localStorage.setItem("accounts", token?.accNo);
        setData({ email: "", password: "" });
        handleModalClose();
        // const tempOtpVerifiedFlag = localStorage.getItem("otpVerification");
        // console.log(isOTPVerified);
        // if (isOTPVerified || tempOtpVerifiedFlag === true) {
        //   navigate("home");
        // }
        // // else {
        // //   navigate("/home/otp");
        // // }
        const tempOtpVerifiedFlag = localStorage.getItem("otpVerification");
        console.log(isOTPVerified);
        if (isOTPVerified || Boolean(tempOtpVerifiedFlag)) {
          navigate("/home");
        } else {
          navigate("otp");
        }
      })
      .catch((error) => {
        if (error.response.status === 403 || error.response.status === 400) {
          toast.error("Insert a Valid Email and Password");
          setData({ email: "", password: "" });
        } else {
          toast.error("Something Went Wrong !!");
          setData({ email: "", password: "" });
        }
      });
  };
  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Login Here</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <h1 align="center">Login Here</h1>
          <br />

          <Form bg="dark" variant="dark" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>
                <h5>Email address</h5>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={data.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>
                <h5>Password</h5>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onHide}>
              Submit
            </Button>
          </Form>
        </Card>

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* {!isOTPVerified ||
          (!tempOtpVerifiedFlag && (
            <OTP
              onHide={handleModalClose}
              isOTPVerified={isOTPVerified}
              handleOTPVerification={handleOTPVerification}
            />
          ))} */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModel;
