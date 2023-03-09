import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import DashboardItem from "./DashboardItem";

const DepositForm = ({ userDetails, handleDepositSuccess }) => {
  const [data, setData] = useState({
    uid: "",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balance, setBalance] = useState(userDetails?.balance || 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const accountNumber = userDetails?.accNo;
  console.log(userDetails?.accNo);
  const amountVar = data.amount;

  const requestData = {
    uid: accountNumber,
    amount: amountVar,
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    console.log(event);
    const jwtToken = userDetails?.token;
    console.log(userDetails?.token);
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    if (data.amount > 0) {
      axios
        .post("http://localhost:8080/api/v1/all/login/", requestData, {
          headers,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          handleDepositSuccess(response.data);
          localStorage.setItem("balance", response);
          setBalance(response.data);
        })
        .catch((error) => {
          if ((error.response.status = 404)) {
            toast.error("Decimal Value Not Allowed");
          } else {
            toast.error(error.response.data.message);
          }
        });
    } else {
      toast.error("Please Enter Amount");
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Form bg="dark" variant="dark">
        <Form.Group className="mb-1">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            name="amount"
            value={data.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          Deposit
        </button>
      </Form>
      <ToastContainer theme="dark" />
    </>
  );
};

export default DepositForm;
