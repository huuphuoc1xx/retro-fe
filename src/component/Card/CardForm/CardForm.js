import Axios from "axios";
import React, { useState } from "react";
import config from "../../../config/config.json";
import { Form } from "react-bootstrap";

function CardForm(props) {
    console.log(props)
  const { action, data, setData, hidePopup, item, type, boardId,ws } = props;
  const [content, setContent] = useState(item ? item.content : "");
  const SubmitForm = () => {
    if (action === "add") {
      Axios.post(`${config.dev.path}/card/${boardId}`, { content, type }).then(
        (res) => {
          if (res.data.code === 0) {
            setData([...data, res.data.data]);
            ws.send(
              JSON.stringify({
                event: "add-card",
                boardId,
                data: res.data.data,
              })
            );
          }
        }
      );
    } else if (action === "edit") {
      Axios.put(`${config.dev.path}/card/${boardId}`, {
        id: item.id,
        content,
        type,
      }).then((res) => {
        if (res.data.code === 0) {
          {
            const temp = [...data];
            temp.forEach((e) => {
              if (e.id === item.id) e.content = content;
            });
            setData(temp);
            ws.send(
              JSON.stringify({
                event: "change-card",
                boardId,
                data: res.data.data,
              })
            );
          }
        }
      });
    }
    hidePopup();
  };
  return (
    <Form>
      <Form.Group>
        <Form.Control
          as="textarea"
          type="text"
          placeholder="Enter task"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              SubmitForm();
            }
          }}
          value={content}
        />
      </Form.Group>
    </Form>
  );
}

export default CardForm;
