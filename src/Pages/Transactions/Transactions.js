import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "../../Component/Card";
import NavigationBar from "../AfterLoginNavigationBar";
import "./Transaction.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const jwtToken = localStorage.getItem("tokens");
  console.log(jwtToken);

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };
  var accNo = localStorage.getItem("accounts");
  console.log(accNo);

  useEffect(() => {
    fetch(`http://localhost:8080/users/transaction/${accNo}`, { headers })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, []);

  const formattedDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="projects">
      <Card>
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
      </Card>
    </div>
  );
};

export default Transaction;
