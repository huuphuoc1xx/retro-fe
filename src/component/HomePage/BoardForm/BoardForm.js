import React from "react";
import { Form } from "react-bootstrap";

function BoardForm({ props }) {
  const { newBoardName, setNewBoardName } = props;
  return (
    <Form>
      <Form.Group controlId="boardName">
        <Form.Label>Board name</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          placeholder="Enter name"
          onChange={(e) => {
            setNewBoardName(e.target.value);
          }}
          value={newBoardName}
        />
      </Form.Group>
    </Form>
  );
}

export default BoardForm;
