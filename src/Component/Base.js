import React, { useState } from "react";
import NavigationBar from "../Pages/AfterLoginNavigationBar";

const Base = ({ handleUserInfo, userDetails }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoggedInStatus = (status) => {
    setLoggedIn(status); // Set the state when it's updated from the child component
  };
  return (
    <>
      <NavigationBar
        handleUserInfo={handleUserInfo}
        userDetails={userDetails}
      />
    </>
  );
};
export default Base;
