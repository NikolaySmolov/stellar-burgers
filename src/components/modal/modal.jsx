import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";


export default function Modal({onClose, children}) {
  const modalRoot = document.getElementById('modal-root')
  
  const handleClose = () => {
    onClose();
  }


  return ReactDOM.createPortal((
    <>
      <div className={`${styles.container}`}>
        {children}
        <button className={styles.close} onClick={handleClose}>
          <CloseIcon type='primary' />
        </button>
      </div>
      <ModalOverlay/>
    </>

  ), modalRoot);
}