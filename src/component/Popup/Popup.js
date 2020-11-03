import { Modal } from "react-bootstrap";
import React from "react";

function Popup( {props} ) {
  const { title, content ,hidePopup} = props;
  return (
    <Modal show onHide={hidePopup}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{content}</Modal.Body>

    </Modal>
  );
}

export default Popup;
