import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { doLogin } from "../../Component/Auth/Index";
import Card from "../../Component/Card";
import { loginUser } from "../../Services/user-Service";

const LoginModel = ({ handleUserInfo, onHide, ...props }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };

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
        doLogin(jwtTokenData, () => {});

        var token = jwtTokenData;

        handleUserInfo(token);
        localStorage.setItem("tokens", token?.token);

        localStorage.setItem("username", token.name);
        console.log(token);

        localStorage.setItem("accounts", token?.accNo);

        setData({ email: "", password: "" });
        handleModalClose();
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
          <Form bg="dark" variant="dark" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={data.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
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

        <ToastContainer theme="dark" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModel;
