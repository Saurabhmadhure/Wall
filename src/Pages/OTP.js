import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../Component/Base";
import Card from "../Component/Card";
import UserContext from "../Pages/Dashboard/UserContext";

const OTP = ({ handleOTPVerification }) => {
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleUserInfo = (data) => {
    setUserInfo(data);
  };

  const navigate = useNavigate();
  const handleActivateAccount = () => {
    setShowOtpForm(true);
  };
  const handleOtpSubmit = (event) => {
    event.preventDefault();
    console.log(handleOTPVerification);
    var email = localStorage.getItem("email");

    console.log(otp);
    axios
      .post("http://localhost:8080/users/verify", {
        email: email,
        userEnteredOTP: otp,
      })
      .then((otpResponse) => {
        console.log(otpResponse);
        if (otpResponse.data === true) {
          console.log();
          localStorage.setItem("otpVerification", true);
          // handleOTPVerification(true);

          toast.success("Succesfully Registered");
          navigate("/home");
          setOtp("");
        } else {
          console.log({
            userEnteredOTP: otp,
            email: email,
          });
          setOtp("");

          toast.error("Invalid Otp. Please try again");
        }
      });
  };

  return (
    <>
      <Base />
      <div>
        {!showOtpForm && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}>
            <h1 style={{ marginBottom: "1rem" }}>Inactive Account</h1>
            {!showOtpForm && (
              <Button variant="primary" onClick={handleActivateAccount}>
                Activate Account
              </Button>
            )}
            {showOtpForm && (
              <Card>
                <Form
                  bg="dark"
                  variant="dark"
                  onSubmit={handleOtpSubmit}></Form>
              </Card>
            )}
          </div>
        )}
        {showOtpForm && (
          <div className="projects">
            <div className="container">
              <div className="row">
                <div className="row justify-content-center">
                  <div className="col-md-1"></div>
                  <Container>
                    <Card>
                      <h1 align="center">Activate Your Account</h1>
                      <br />
                      <Form bg="dark" variant="dark" onSubmit={handleOtpSubmit}>
                        <Form.Group className="mb-1">
                          <Form.Label>
                            Insert OTP received on registered mail
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Otp"
                            value={otp}
                            onChange={(event) => {
                              const value = event.target.value;
                              const regex = /^[0-9]*$/;
                              if (regex.test(value)) {
                                setOtp(value);
                              }
                            }}
                          />
                          <Form.Text className="text-muted">
                            Activate Account
                          </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Card>
                  </Container>
                </div>
              </div>{" "}
            </div>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default OTP;
