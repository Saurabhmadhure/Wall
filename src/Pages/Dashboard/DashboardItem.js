import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "../../Component/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import SendMoneyForm from "../MoneyTransfer/SendMoney";
import Modal from "../MoneyTransfer/Modal";
import DepositForm from "./Deposit";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const DashboardItem = ({ userDetails, handleBalance }) => {
  const [balance, setBalance] = useState(null);
  const [balanceAvailable, setBalanceAvailable] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

  const [showDepositContainer, setShowDepositContainer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  var acNo = userDetails?.accNo;

  const balAvailable = async () => {
    var jwtToken = userDetails?.token;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/all/acc/${acNo}`,
        { headers }
      );

      setBalance(response);
      setShowDepositContainer(false);
      setBalance(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   balAvailable();
  // }, []);

  const handleClick = () => {
    navigate("/home/transaction");
  };
  const errorHandler = () => {
    setModalOpen(false);
  };
  const handleDepositClick = () => {
    setShowDepositContainer(!showDepositContainer);
  };
  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleBalanceUpdate = async (updatedBalance) => {
    setBalance(updatedBalance);
    setShowDepositContainer(false);
    toast.success("Amount deposited successfully");

    // Retrieve the updated balance from the server
    const jwtToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/all/acc/${acNo}`,
        { headers }
      );
      console.log(response);
      setBalance(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to retrieve updated balance");
    }
  };
  const handleDepositSuccess = (data) => {
    setBalance(data);
  };

  return (
    <Card>
      <Container>
        <div className="row">
          <div className="col-lg-4 col-md-3 col-6">
            <h5>Account Number:</h5>
            <h3>
              {" "}
              <strong>{acNo}</strong>
            </h3>
          </div>
          <div className="col-lg-4 col-md-3 col-6 text-center">
            <Button variant="secondary" onClick={(balAvailable, toggleBalance)}>
              {showBalance ? "Hide Balance" : "Show Balance"}
            </Button>
            {showBalance && <h1>₹{balance}</h1>}
          </div>
          <div className="d-grid gap-10 col-4 mx-auto">
            <ul className="list-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}>
                View Transactions
              </button>

              <ul className="list-group">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleDepositClick}>
                  Deposit Amount
                </button>
              </ul>
              {showDepositContainer && (
                <DepositForm
                  userDetails={userDetails}
                  handleDepositSuccess={handleDepositSuccess}
                  balanceAvailable={balanceAvailable}
                />
              )}
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  setModalOpen(true);
                }}>
                Send Money
              </button>
            </ul>
          </div>
        </div>

        {modalOpen && (
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            title="Send Money"
            setOpenModal={setModalOpen}
            onConfirm={errorHandler}>
            <SendMoneyForm setOpenModal={setModalOpen}>
              Send Money
            </SendMoneyForm>
          </Modal>
        )}
      </Container>
    </Card>
  );
};

export default DashboardItem;
