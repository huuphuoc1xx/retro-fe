import { Button, Modal } from "react-bootstrap";
import React from "react";

function Popup({ props }) {
  const { title, actionName, action, content, show, hidePopup } = props;
  return (
    <Modal show={show} onHide={hidePopup}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{content}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hidePopup}>
          Close
        </Button>
        <Button variant="primary" onClick={action}>
          {actionName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
