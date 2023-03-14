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
  var balancefetched = localStorage.getItem("balance");
  // setBalance(balancefetched);

  var acNo = userDetails?.accNo;
  const jwtToken = userDetails?.token;

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };

  const balAvailable = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/acc/${acNo}`,
        { headers }
      );

      setBalance(response);
      setShowDepositContainer(false);
      setBalanceAvailable(true);
      setBalance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const errorHandler = () => {
    setModalOpen(false);
  };
  const handleDepositClick = () => {
    setShowDepositContainer(!showDepositContainer);
  };
  const handleBalanceClick = async () => {
    setShowBalance(!showBalance);
    if (!balanceAvailable) {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/acc/${acNo}`,
          {
            headers,
          }
        );
        console.log(response);
        setBalance(response.data.balance);
        setBalanceAvailable(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleBalanceUpdate = async (updatedBalance) => {
    setBalance(updatedBalance);
    setShowDepositContainer(false);
    toast.success("Amount deposited successfully");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/all/acc/${acNo}`,
        { headers }
      );
      console.log(response);
      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
      toast.error("Failed to retrieve updated balance");
    }
  };
  useEffect(() => {
    if (userDetails) {
      balAvailable();
    }
  }, [userDetails]);
  const handleDepositSuccess = (data) => {
    setBalance(data);
  };

  const handleClick = () => {
    navigate("/home/transaction", { state: { userDetails: userDetails } });
  };

  return (
    <Card>
      <Container>
        <div className="row">
          <div className="col-lg-4 col-md-3 col-6">
            <h5>Account Number:</h5>
            <h2>
              <strong>{acNo}</strong>
            </h2>
          </div>
          <div className="col-lg-4 col-md-3 col-6 text-center">
            <Button variant="secondary" onClick={handleBalanceClick}>
              {showBalance ? "Hide Balance" : "Show Balance"}
            </Button>

            {showBalance && <h2>₹{balance}</h2>}
          </div>
          <div className="d-grid gap-9 col-3 mx-auto">
            <ul className="list-group">
              <Button variant="outline-primary" onClick={handleClick}>
                {" "}
                View Transactions{" "}
              </Button>

              <ul className="list-group">
                <Button variant="outline-success" onClick={handleDepositClick}>
                  Deposit Amount
                </Button>
              </ul>
              {showDepositContainer && (
                <DepositForm
                  userDetails={userDetails}
                  handleDepositSuccess={handleDepositSuccess}
                  balanceAvailable={balanceAvailable}
                />
              )}
              <Button
                variant="outline-dark"
                onClick={() => {
                  setModalOpen(true);
                }}>
                {" "}
                Send Money
              </Button>
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
            <SendMoneyForm
              setOpenModal={setModalOpen}
              userDetails={userDetails}>
              Send Money
            </SendMoneyForm>
          </Modal>
        )}
      </Container>
    </Card>
  );
};

export default DashboardItem;
