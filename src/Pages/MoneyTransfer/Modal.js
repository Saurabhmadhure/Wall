import React from "react";
import Button from "react-bootstrap/esm/Button";
import WalletCard from "../../Component/WalletCard";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <WalletCard className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        {props.children}

        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Close</Button>
        </footer>
      </WalletCard>
    </div>
  );
};

export default Modal;
