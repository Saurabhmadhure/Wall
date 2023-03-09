import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

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

  const amountVar = data.amount;

  const requestData = {
    uid: accountNumber,
    amount: amountVar,
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const jwtToken = userDetails?.token;

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
          handleDepositSuccess(response.data);
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

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
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? handleSubmit : null}
          // onClick={handleSubmit}
        >
          {isLoading ? "Depositing..." : "Deposit"}
        </Button>
      </Form>
      <ToastContainer theme="dark" />
    </>
  );
};

export default DepositForm;
