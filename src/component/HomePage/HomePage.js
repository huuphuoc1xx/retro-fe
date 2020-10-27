import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Navbar } from "react-bootstrap";
import config from "../../config/config.json";
import Popup from "../Popup/Popup";
import BoardForm from "./BoardForm/BoardForm";

import "./css/HomePage.css";

function HomePage(props) {
  const [board, setBoard] = useState([]);
  const [popup, setPopup] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  //Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get(`${config.dev.path}/board`).then((res) => {
      if (res.data.code === 0) setBoard(res.data.data.boards);
    });
  }, []);

  const showInputBoardPopup=()=>{
    setPopup({
      title: "Add board",
      actionName: "Add",
      action: () => {
        addBoard(newBoardName);
        setShowPopup(false);
      },
      content: (
        <BoardForm
          props={{
            newBoardName,
            setNewBoardName,
          }}
        />
      ),
      show: showPopup,
      hidePopup: () => setShowPopup(false),
    });
    setShowPopup(true);
  }

  useEffect(() => {
    setPopup({
      title: "Add board",
      actionName: "Add",
      action: () => {
        addBoard(newBoardName);
        setNewBoardName("");
        setShowPopup(false);
      },
      content: (
        <BoardForm
          props={{
            newBoardName,
            setNewBoardName,
          }}
        />
      ),
      show: showPopup,
      hidePopup: () => setShowPopup(false),
    });
  }, [newBoardName]);
  useEffect(()=>{
    setPopup({...popup,show:showPopup})
  },[showPopup])

  const addBoard = (name) => {
    Axios.post(`${config.dev.path}/board`, { name }).then((res) => {
      if (res.data.code === 0) {
        console.log(res.data);
        setPopup({
          title: "Add board success",
          actionName: "OK",
          action: () => setShowPopup(false),
          content: (
            <>
              Add board successfull{" "}
              <i class="fa fa-check-circle" aria-hidden="true"></i>
            </>
          ),
          show: showPopup,
          hidePopup: () => setShowPopup(false),
        });
        setShowPopup(true);
        setBoard([...board,{name}]);
      }
    });
  };

  const showListBoard = (board) => {
    return board.map((item, key) => (
      <Card className="board" key={key}>
        {item.name}
      </Card>
    ));
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <i className="fa fa-trello text-primary" aria-hidden="true"></i>{" "}
          <img className="title" src="/img/logo.png"></img>
        </Navbar.Brand>
      </Navbar>
      <div className="fill">
        <Container className="main-container">
          {showListBoard(board)}
          <Card className="board" onClick={showInputBoardPopup}>
            <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
          </Card>
        </Container>
      </div>
      <Popup props={popup} />
    </div>
  );
}

export default HomePage;
