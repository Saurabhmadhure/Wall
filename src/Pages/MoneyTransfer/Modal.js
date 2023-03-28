import React from "react";
import Button from "react-bootstrap/esm/Button";
import WalletCard from "../../Component/WalletCard";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div>
      <WalletCard className={classes.modal} style={{ Align: "left" }}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        {props.children}
      </WalletCard>
      <div className={classes.backdrop} onClick={props.onConfirm} />
    </div>
  );
};

export default Modal;
