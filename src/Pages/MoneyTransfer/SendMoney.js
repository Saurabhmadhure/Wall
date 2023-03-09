import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";
const SendMoneyForm = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState();
  const [amount, setAmount] = useState(null);
  const [cashback, setCashback] = useState("");

  const handleSubmit = (event) => {
    var accountNo = localStorage.getItem("account");
    console.log(accountNo);
    const data = {
      sid: accountNo,
      rid: receiverId,
      amount: amount,
    };
    console.log(data);
    const jwtToken = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/all/login/send", data, {
        headers,
      })
      .then((response) => {
        console.log(response.data.cashback);
        toast.success(response.data.cashback);
        var cashb = response.data.cashback;
        setCashback(cashb);

        // toast.success(cashb);
      })
      .catch((error) => {
        if (error.response.data === "NotSufficientBalance") {
          toast.error("Not enough balance");
        } else if (error.response && error.response.status === 403) {
          toast.error("Please Enter Valid Account Number!!");
          // } else if (error.response && error.response.status === 403) {
          //   toast.error("Something Went Wrong");
        } else {
          toast.error("Something went Wrong please Login Again");
        }
      });
  };

  return (
    <>
      <Form bg="dark" variant="dark" onSubmit={handleSubmit}>
        <Form.Group className="mb-1">
          <Form.Label>Receiver ID:</Form.Label>
          <Form.Control
            type="text"
            id="receiverId"
            value={receiverId}
            onChange={(event) => setReceiverId(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="text"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
      <ToastContainer theme="dark" />
    </>
  );
};

export default SendMoneyForm;
