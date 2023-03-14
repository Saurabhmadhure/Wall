import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";

const SendMoneyForm = ({ userDetails }) => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState();
  const [amount, setAmount] = useState(null);
  const [cashback, setCashback] = useState("");

  const handleSubmit = (event) => {
    var accountNo = userDetails.accNo;

    const data = {
      sid: accountNo,
      rid: receiverId,
      amount: amount,
    };
    const jwtToken = userDetails.token;
    console.log(jwtToken);

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    event.preventDefault();
    axios
      .post("http://localhost:8080/users/send", data, { headers })
      .then((response) => {
        if (response && response.status === 200) {
          console.log(response);
          console.log(response.data.cashback);
          toast.success(response.data.cashback);
          var cashb = response.data.cashback;
          setCashback(cashb);
        }
        // toast.success(cashb);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);

        toast.error("Something Went Wrong");
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
    </>
  );
};

export default SendMoneyForm;
