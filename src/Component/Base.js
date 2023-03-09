import React from "react";
import NavigationBar from "../Pages/AfterLoginNavigationBar";

const Base = ({ handleUserInfo }) => {
  return (
    <>
      <NavigationBar handleUserInfo={handleUserInfo} />
    </>
  );
};
export default Base;
