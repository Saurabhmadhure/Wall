import { useEffect, useState } from "react";
import { signUps } from "../Services/user-Service";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import ErrorModal from "../ErrorModels/ErrorModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function Signup({ handleUserInfo, onHide, ...props }) {
  const [account, setAccount] = useState("");
  // const [handleOtpSubmit, setHandleOtpSubmit] = useState(null);
  // const [showOTPModal, setShowOTPModal] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const handleChange = (event, property) => {
    setUser({ ...user, [property]: event.target.value });
  };
  const resetData = () => {
    setUser({
      name: "",
      email: "",

      password: "",
    });
  };
  const navigate = useNavigate();
  // const handleOtpSubmit = (generatedOtp) => (event) => {
  //   event.preventDefault();
  //   if (generatedOtp === otp) {
  //     setShowOTPModal(false);
  //     toast.success("Succesfully Signed in");
  //     console.log("OTP submitted: ", otp);
  //     navigate("/");
  //   } else {
  //     toast.error("Invalid OTP");
  //   }
  // };

  const submitData = (event) => {
    event.preventDefault();
    if (user.name.trim().length === 0) {
      setError({
        titleofError: "Invalid input",
        message: "Please enter Name.",
      });
      return;
    }
    if (user.password.trim().length < 1) {
      setError({
        titleofError: "Invalid Password",
        message: "Password Should be more than 6 digit.",
      });
      return;
    }

    signUps(user)
      .then((response) => {
        console.log(response);
        var res = response;
        console.log(res);
        handleUserInfo(response);
        setAccount(response.accNo);
        // var responseOtp = response.otp;
        // console.log(responseOtp);

        // setShowOTPModal(true);
        // console.log(generatedOtp);
        // const handleOtpSubmit = (event) => {
        //   event.preventDefault();
        //   console.log(Number(generatedOtp) === Number(responseOtp));
        //   console.log(generatedOtp);
        // if (responseOtp === generatedOtp) {
        localStorage.setItem("isVerified", true);
        toast.success("Succesfully Signed in");
        console.log(response);
        // console.log("OTP submitted: ", generatedOtp);

        // toast.success("User is Registered");

        localStorage.setItem("token", response.token);
        localStorage.setItem("account", response.accNo);
        localStorage.setItem("username", response.user.name);
        console.log(response.user.details.name);
        localStorage.setItem("balance", response.balance);
        localStorage.setItem("accDetails", JSON.stringify(response));
        // props.onSignupSuccess();
        // props.show(false);
        navigate("/");
        setUser({
          name: "",
          email: "",

          password: "",
        });

        // }
        // else {
        //   toast.error("Invalid OTP");
        // }
        // // };
        // setGeneratedOtp(response.otp);
        // setHandleOtpSubmit(() => handleOtpSubmit);
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Container>
      {error && (
        <ErrorModal
          title={error.titleofError}
          placeholder="enter a title"
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <h1 align="center">Register Here</h1>
      <Form bg="dark" variant="dark" onSubmit={submitData}>
        <Form.Group className="mb-1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="Enter Name"
            onChange={(e) => handleChange(e, "name")}
            value={user.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            onChange={(e) => handleChange(e, "email")}
            value={user.email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, "password")}
            value={user.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={props.onHide}>
          Submit
        </Button>
        <Button variant="danger" type="reset" onClick={resetData}>
          Reset
        </Button>
      </Form>

      <ToastContainer theme="dark" />
      {/* <Modal
        show={showOTPModal}
        onHide={() => setShowOTPModal(false)}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOtpSubmit}>
            <Form.Group controlId="formBasicOTP">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={generatedOtp}
                onChange={handleOTPChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
}

export default Signup;
