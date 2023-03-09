// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import ErrorModal from "../../ErrorModels/ErrorModel";
// import Container from "react-bootstrap/esm/Container";
// import NavigationBar from "../AfterLoginNavigationBar";
// import WalletCard from "../../Component/WalletCard";

// const CreateWallet = (userId) => {
//   const [balance, setBalance] = useState(0);
//   const [accNo, setAccNo] = useState(0);
//   const [uname, setUname] = useState("");
//   const [walletCreated, setWalletCreated] = useState(false);

//   const [details, setDetails] = useState({
//     userId: 0,
//     name: "",
//     email: "",
//     phoneNumber: 0,
//     password: "",
//   });

//   const handleDetailsChange = (event) => {
//     const { name, value } = event.target;
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: name === "phoneNumber" ? parseInt(value, 10) : value,
//     }));
//   };

//   const handleBalanceChange = (event) => {
//     setBalance(parseFloat(event.target.value));
//   };

//   const navigate = useNavigate();
//   const [error, setError] = useState();

//   const resetData = () => {
//     setDetails({
//       userId: 0,
//       name: "",
//       email: "",
//       phoneNumber: 0,
//       password: "",
//     });
//     setBalance(0);
//   };

//   const submitData = async (event) => {
//     event.preventDefault();
//     if (details.name.trim() === "") {
//       setError({
//         titleofError: "Invalid input",
//         message: "Please enter Name.",
//       });
//       return;
//     }
//     if (details.password.trim().length < 1) {
//       setError({
//         titleofError: "Invalid Password",
//         message: "Password Should be more than 6 digit.",
//       });
//       return;
//     }
//     if (details.phoneNumber.length < 10) {
//       setError({
//         titleofError: "Invalid Phone Number",
//         message: "Phone number Should be  10 digit.",
//       });
//       return;
//     }
//     const accountDetails = {
//       balance: balance,
//       details: details,
//     };
//     const jwtToken = localStorage.getItem("token");

//     const headers = {
//       Authorization: `Bearer ${jwtToken}`,
//       "Content-Type": "application/json",
//     };

//     await axios
//       .post("http://localhost:8080/api/v1/all/create", accountDetails, {
//         headers,
//       })
//       .then((response) => {
//         console.log(response);
//         handleAccNumber(response.data.accNumber);
//         console.log(response.data.accNumber);
//         var data = response;

//         localStorage.setItem("accDetails", JSON.stringify(data.data));
//         localStorage.setItem("accNumber", data.data.accNumber);
//         setAccNo(data.data.accNumber);
//         setUname(data.data.username);
//         console.log("Sussfull Log");
//         toast.success("UserWallet is Registered");
//         resetData();
//         navigate("/home");
//         setWalletCreated(true);
//         console.log(accountDetails);
//         localStorage.setItem("username", uname);
//         localStorage.setItem("balance", balance);
//         localStorage.setItem("account", accNo);
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log("Error Printed");
//       });
//   };
//   const handleAccNumber = (data) => {
//     setDetails(data);
//   };
//   const errorHandler = () => {
//     setError(null);
//   };

//   return (
//     <>
//       <NavigationBar />
//       <WalletCard>
//         <Container>
//           {error && (
//             <ErrorModal
//               title={error.titleofError}
//               placeholder="enter a title"
//               message={error.message}
//               onConfirm={errorHandler}
//             />
//           )}
//           <h1 align="center">Create New Wallet</h1>
//           {walletCreated ? (
//             <div>
//               <p>Welcome, {details.name}!</p>

//               <p>Welcome, {details._id}!</p>
//               <p>Your email address is {details.email}.</p>
//             </div>
//           ) : (
//             <Form bg="dark" variant="dark" onSubmit={submitData}>
//               <Form.Group className="mb-1">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   id="name"
//                   placeholder="UserName"
//                   name="name"
//                   value={details.name}
//                   onChange={handleDetailsChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-1">
//                 <Form.Label>UserId</Form.Label>
//                 <Form.Control
//                   type="number"
//                   id="userId"
//                   placeholder="Unique Id"
//                   name="userId"
//                   value={details.userId}
//                   onChange={handleDetailsChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   placeholder="Enter email"
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={details.email}
//                   onChange={handleDetailsChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Phone.No</Form.Label>
//                 <Form.Control
//                   type="tel"
//                   placeholder="Enter Phone number"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   value={details.phoneNumber}
//                   onChange={handleDetailsChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={details.password}
//                   onChange={handleDetailsChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Add Money</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Balance"
//                   onChange={handleBalanceChange}
//                   value={balance}
//                 />
//               </Form.Group>

//               <Button variant="primary" type="submit">
//                 Create
//               </Button>
//               <Button variant="danger" type="reset" onClick={resetData}>
//                 Reset
//               </Button>
//             </Form>
//           )}
//           ;<>{JSON.stringify({ details, balance })}</>
//           <ToastContainer theme="dark" />
//         </Container>
//       </WalletCard>
//     </>
//   );
// };

// export default CreateWallet;
