import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import BoardForm from "./BoardForm/BoardForm";

import config from "../../config/config.json";
import "./css/Board.css";
import Popup from "../Popup/Popup";
import { Link, withRouter } from "react-router-dom";
import HomePage from "../HomePage/HomePage";

function Board() {
  const [board, setBoard] = useState([]);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    Axios.get(`${config.dev.path}/board`).then((res) => {
      if (res.data.code === 0) setBoard(res.data.data.boards);
    });
  }, []);

  const showAddBoardPopup = () => {
    setPopup({
      title: "Add board",
      content: (
        <BoardForm
          action="add"
          setBoard={setBoard}
          board={board}
          hidePopup={() => setPopup(false)}
        />
      ),
      hidePopup: () => setPopup(false),
    });
  };

  const showEditBoardPopup = (item) => {
    setPopup({
      title: "Edit board",
      content: (
        <BoardForm
          action="edit"
          setBoard={setBoard}
          board={board}
          hidePopup={() => setPopup(false)}
          item={item}
        />
      ),
      hidePopup: () => setPopup(false),
    });
  };

  const deleteBoard = (id) => {
    Axios.delete(`${config.dev.path}/board`, { data: { id } }).then((res) => {
      if (res.data.code === 0) setBoard(board.filter((item) => item.id != id));
    });
  };
  const showConfirmDelete = (item) => {
    setPopup({
      title: "Delete board",
      content: (
        <div className="d-flex flex-column">
          <div className="m-auto">Bạn có muốn xoá bảng {item.name} không?</div>
          <Button
            className="m-auto"
            onClick={() => {
              deleteBoard(item.id);
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

  const showListBoard = (board) => {
    return board.map((item, key) => (
      <Link to={`/board/${item.id}`} key={key}>
        <Card className="board">
          {item.name}
          <div className="top-right">
            <i
              className="fa fa-pencil-square"
              onClick={(e) => {
                e.preventDefault();
                showEditBoardPopup(item);
              }}
            ></i>{" "}
            <i
              className="fa fa-trash-o"
              onClick={(e) => {
                e.preventDefault();
                showConfirmDelete(item);
              }}
            ></i>
          </div>
        </Card>
      </Link>
    ));
  };
  return (
    <HomePage>
      <div className="fill d-flex">
        <div className="main-container main-board">
          {showListBoard(board)}
          <Card className="board add-board" onClick={showAddBoardPopup}>
            <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
          </Card>
        </div>
        {popup && <Popup props={popup} />}
      </div>
    </HomePage>
  );
}

export default withRouter(Board);
