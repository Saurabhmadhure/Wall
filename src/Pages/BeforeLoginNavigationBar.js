// import React from "react";
// import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import CustomModal from "./Modals/LoginModel";
// import Signup from "./Signup";
// import Card from "../Component/AllCards/Card";

// const BeforeLoginNavigationBar = () => {
//   const [modalShow, setModalShow] = useState(false);

//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">Wallet Banking</Navbar.Brand>
//           <Navbar.Toggle />
//           <Navbar.Collapse className="justify-content-end">
//             <CustomModal show={modalShow} onHide={() => setModalShow(false)} />
//             <Navbar.Toggle />
//             <Button variant="primary" onClick={() => setModalShow(true)}>
//               Login
//             </Button>
//             <CustomModal show={modalShow} onHide={() => setModalShow(false)} />
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <Card>
//         <Signup />
//       </Card>
//     </>
//   );
// };

// export default BeforeLoginNavigationBar;
