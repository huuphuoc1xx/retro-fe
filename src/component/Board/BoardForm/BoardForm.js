import Axios from "axios";
import React, { useState } from "react";
import config from "../../../config/config.json";
import { Form } from "react-bootstrap";

function BoardForm(props) {
  const { action, board, setBoard, hidePopup, item } = props;
  const [name, setName] = useState(item ? item.name : "");
  const SubmitForm = () => {
    if (action === "add") {
      Axios.post(`${config.dev.path}/board`, { name }).then((res) => {
        if (res.data.code === 0) {
          setBoard([...board, res.data.data]);
        }
      });
    } else if (action === "edit") {
      Axios.put(`${config.dev.path}/board`, { id: item.id, name }).then(
        (res) => {
          if (res.data.code === 0) {
            {
              const temp = [...board];
              temp.forEach((e) => {
                if (e.id === item.id) e.name = name;
              });
              setBoard(temp);
            }
          }
        }
      );
    }
    hidePopup();
  };
  return (
    <Form>
      <Form.Group controlId="boardName">
        <Form.Label>Board name</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              SubmitForm();
            }
          }}
          value={name}
        />
      </Form.Group>
    </Form>
  );
}

export default BoardForm;
