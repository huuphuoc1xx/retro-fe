import Axios from "axios";
import React, { useState } from "react";
import Popup from "../../Popup/Popup";
import config from "../../../config/config.json";
import CardForm from "../CardForm/CardForm";
import "../css/card.scss";
import { Button } from "react-bootstrap";

function CardColumn(props) {
  const { name, data, setData, boardId } = props;
  const [popup, setPopup] = useState(false);

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  const onDrop = (ev, cat) => {
    const id = ev.dataTransfer.getData("id");
    const temp = [...data];
    for (let index = 0; index < temp.length; index++) {
      if (temp[index].id == id) {
        temp[index].type = cat;
        setData(temp);
        Axios.put(`${config.dev.path}/card/${boardId}`, temp[index]).then(
          (res) => {
            if (res.data.code !== 0) window.location.reload();
          }
        );
        break;
      }
    }
  };

  const showAddCardPopup = () => {
    setPopup({
      title: `Add ${name} task`,
      content: (
        <CardForm
          action="add"
          data={data}
          setData={setData}
          hidePopup={() => setPopup(false)}
          boardId={boardId}
          type={name}
        />
      ),
      hidePopup: () => setPopup(false),
    });
  };

  const showEditCardPopup = (item) => {
    setPopup({
      title: `Edit ${name} task`,
      content: (
        <CardForm
          action="edit"
          data={data}
          setData={setData}
          hidePopup={() => setPopup(false)}
          item={item}
          boardId={boardId}
          type={name}
        />
      ),
      hidePopup: () => setPopup(false),
    });
  };

  const deleteCard = (id) => {
    Axios.delete(`${config.dev.path}/card/${boardId}`, { data: { id } }).then(
      (res) => {
        if (res.data.code === 0) setData(data.filter((item) => item.id != id));
      }
    );
  };
  const showConfirmDeleteCard = (e, item) => {
    e.preventDefault();
    setPopup({
      title: "Delete card",
      content: (
        <div className="d-flex flex-column">
          <div className="m-auto">
            Bạn có muốn xoá task {item.content} không?
          </div>
          <Button
            className="m-auto"
            onClick={() => {
              deleteCard(item.id);
              setPopup(false);
            }}
          >
            Xác nhận
          </Button>
        </div>
      ),
      hidePopup: () => setPopup(false),
    });
  };
  return (
    <div
      className="drop-area"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, name)}
    >
      <h1 className="column-title">
        {name}
        <i
          className="fa fa-plus-circle right-center"
          onClick={showAddCardPopup}
        ></i>
      </h1>
      {data.map((item, key) => {
        if (item.type === name)
          return (
            <div
              className="item-container"
              key={key}
              draggable
              onDragStart={(e) => onDragStart(e, item.id)}
            >
              <div className="edit" onClick={() => showEditCardPopup(item)}>
                {item.content}
              </div>
              <i
                className="fa fa-trash-o top-right text-danger"
                onClick={(e) => showConfirmDeleteCard(e, item)}
              ></i>
            </div>
          );
      })}

      {popup && <Popup props={popup} />}
    </div>
  );
}
export default CardColumn;
