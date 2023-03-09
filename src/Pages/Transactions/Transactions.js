import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import NavigationBar from "../AfterLoginNavigationBar";
import "./Transaction.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const jwtToken = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/all/transactions/", { headers })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, []);

  const formattedDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="transaction-list">
      <Container>
        <table className="table">
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Message</th>
              <th>Status</th>
              <th>Cashback</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td>{formattedDate(transaction.date)}</td>
                <td>{transaction.message}</td>
                <td>{transaction.status}</td>
                <td>{transaction.cashback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Transaction;
