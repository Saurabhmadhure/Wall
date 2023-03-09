// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Form } from "react-bootstrap";
// import DashboardItem from "./DashboardItem";

// const Dashboard = () => {
//   const [balance, setBalance] = useState(0);

//   const handleDeposit = async (amount) => {
//     const jwtToken = localStorage.getItem("token");

//     const headers = {
//       Authorization: `Bearer ${jwtToken}`,
//       "Content-Type": "application/json",
//     };
//     const accountNumber = localStorage.getItem("account");
//     if (amount > 0) {
//       const requestData = {
//         uid: accountNumber,
//         amount: amount,
//       };

//       console.log(requestData);

//       const response = await axios.post(
//         "http://localhost:8080/api/v1/all/login/",
//         requestData,
//         {
//           headers,
//         }
//       );
//       toast.success("Money has been added Succesfully");
//       const updatedBalance = balance + parseInt(amount);
//       setBalance(updatedBalance);
//     } else {
//       toast.error("Please Enter Amount");
//     }
//   };

//   return (
//     <>
//       <DashboardItem balance={balance} />
//       <DepositForm handleDeposit={handleDeposit} />
//       <ToastContainer theme="dark" />
//     </>
//   );
// };

// const DepositForm = ({ handleDeposit }) => {
//   const [data, setData] = useState({
//     amount: "",
//   });
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setData({ ...data, [name]: value });
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(event);
//     handleDeposit(data.amount);
//   };

//   return (
//     <>
//       <Form bg="dark" variant="dark" onSubmit={handleSubmit}>
//         <Form.Group className="mb-1">
//           <Form.Label>Amount</Form.Label>
//           <Form.Control
//             type="text"
//             name="amount"
//             value={data.amount}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <br />
//         <button type="submit">Deposit</button>
//       </Form>
//     </>
//   );
// };

// export default Dashboard;
