import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { signUps } from "../../Services/user-Service";
import { ToastContainer } from "react-toastify";

import Form from "react-bootstrap/Form";
import ErrorModal from "../../ErrorModels/ErrorModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../Component/Auth/Index";
import axios from "axios";

const SignInModel = ({ handleUserInfo, onHide, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const handleSignupSuccess = () => {
    setShowModal(false);
  };
  const [responseData, setResponseData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [account, setAccount] = useState(null);
  const [verifyOtp, seVerifyOtp] = useState(null);
  const [email, setEmail] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log();
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

  const submitData = (event) => {
    event.preventDefault();
    try {
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
          if (response && response.balance === 0) {
            doLogin(response, () => {});
            console.log(response);
            localStorage.setItem("tokens", response.token);
            localStorage.setItem("accounts", response?.accNo);
            console.log(response.otp);

            console.log();
            setEmail(response.email);
            setAccount(response.accNo);
            console.log(account);
            seVerifyOtp(response.otp);
            setResponseData(response);

            console.log(email);

            setUser({
              name: "",
              email: "",
              password: "",
            });
            toast.success("Otp has been Sent To your Registered Email");
            setShowOTPModal(true);
            console.log(email);
            const sendMail = {
              to: response.email,
              otp: response.otp,
            };
            console.log(sendMail);
            axios.post("http://localhost:8080/reg/sendmail", sendMail);
          } else {
            if (error && error.status === 400) {
              toast.error("Something went wrong, please try again later");
            } else {
              toast.error(
                "This Email Id is Already Present Please Try Another One"
              );
            }
          }
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    console.log(otp);
    axios
      .post("http://localhost:8080/reg/verify", {
        generatedOTP: verifyOtp,
        userEnteredOTP: otp,
        accNumber: account,
      })
      .then((otpResponse) => {
        console.log(otpResponse);
        if (otpResponse.data === true) {
          toast.success("Succesfully Registered");

          handleUserInfo(responseData);
          setOtp("");
          setShowOTPModal(false);
          onHide();
        } else {
          setOtp("");
          toast.error("Invalid Otp. Please try again");
        }
      });
  };
  const errorHandler = () => {
    setError(null);
  };
  const handleModalClose = () => {
    props.setSignModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      {error && (
        <ErrorModal
          title={error.titleofError}
          placeholder="enter a title"
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Register Yourself
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="danger" type="reset" onClick={resetData}>
            Reset
          </Button>
        </Form>

        {/* <Signup onSignupSuccess={handleSignupSuccess} /> */}
        <Modal
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
      <ToastContainer theme="dark" />
    </Modal>
  );
};
export default SignInModel;
