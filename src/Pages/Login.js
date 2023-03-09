// import { Fragment, useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { Navigate, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { doLogin } from "../Component/Auth/Index";
// import Card from "../Component/Card";
// import { loginUser } from "../Services/user-Service";
// import CustomModal from "./Modals/CustomModal";
// import SignInModel from "./Modals/SignInModal";
// import ProgressBar from "react-bootstrap/ProgressBar";

// function Login(props) {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [name, setName] = useState("");
//   const [token, setToken] = useState("");
//   const [signModalShow, setSignModalShow] = useState(false);
//   const [modalShow, setModalShow] = useState(false);

//   const handleChange = (event, field) => {
//     setData({ ...data, [field]: event.target.value });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log(data);

//     if (data.email.trim().length === 0) {
//       toast.error("Email is Empty");
//       return;
//     }
//     if (data.password.trim().length === 0) {
//       toast.error("Password is Empty");
//       return;
//     }

//     loginUser(data)
//       .then((jwtTokenData) => {
//         doLogin(jwtTokenData, () => {});
//         console.log("hitting");
//         console.log(jwtTokenData);
//         var token = jwtTokenData;

//         setName(token.user.name);
//         localStorage.setItem("token", token.token);
//         localStorage.setItem("username", token.user.name);
//         console.log(token.user.name);
//         localStorage.setItem("account", token.accNo);
//         console.log(token.accNo);
//         const navigate = Navigate;
//         navigate("/");
//         props.onLoginSuccess();
//         setToken(token.token);

//         // toast.success("Enter The Token received on Entered Mail");
//         setData({
//           email: "",
//           password: "",
//         });
//         handleModalClose();
//         navigate("/");
//       })
//       .catch((error) => {
//         if (error.response.status === 403 || error.response.status === 400) {
//           toast.error("Insert a Valid Email and Password");
//         } else {
//           toast.error("Something Went Wrong !!");
//         }
//       });
//   };
//   const handleModalClose = () => {
//     setModalShow(false);
//     setSignModalShow(false);
//   };

//   return (
//     <Fragment>
//       <Card>
//         <h1 align="center">Login Here</h1>
//         <Form bg="dark" variant="dark" onSubmit={handleFormSubmit}>
//           <Form.Group className="mb-1">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={data.email}
//               onChange={(e) => handleChange(e, "email")}
//             />
//           </Form.Group>
//           <Form.Group className="mb-1">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => handleChange(e, "password")}
//               value={data.password}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </Card>

//       <CustomModal show={modalShow} onHide={handleModalClose} />
//       <ToastContainer theme="dark" />
//     </Fragment>
//   );
// }

// export default Login;
