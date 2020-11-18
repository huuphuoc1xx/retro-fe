import Axios from "axios";
import React, { useEffect, useState } from "react";
import CardColumn from "./CardColumn/CardColumn";
import config from "../../config/config.json";
import "./css/card.scss";
import { Redirect, useParams, withRouter } from "react-router-dom";
import HomePage from "../HomePage/HomePage";

function Card(props) {
  const { boardId } = useParams();
  const [data, setData] = useState([]);
  const [board, setBoard] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [ws, setWs] = useState();
  useEffect(() => {
    const wss = new WebSocket(`${config.dev.socket}/web-socket`);
    wss.onopen = () => wss.send(JSON.stringify({ event: "connect", boardId }));
    wss.onclose = () => wss.send(JSON.stringify({ event: "close", boardId }));
    setWs(wss);
    Axios.get(`${config.dev.path}/card/${boardId}`).then((res) => {
      if (res.data.code === 0) {
        setData(res.data.data.cards);
        setBoard(res.data.data.board);
      } else if (res.data.code === 4) {
        alert("You dont have permission to access this board!");
        setRedirect(<Redirect to="/" />);
      } else {
        alert(res.data.data.message);
        setRedirect(<Redirect to="/" />);
      }
    });
  }, [boardId]);

  useEffect(() => {
    if (ws)
      ws.onmessage = (dt) => {
        dt = JSON.parse(dt.data);
        switch (dt.event) {
          case "change-card":
            const temp = [...data];
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].id === dt.data.id) {
                temp[i] = dt.data;
                break;
              }
            }
            console.log(temp);
            setData(temp);
            break;
          case "delete-card":
            setData(data.filter((item) => item.id != dt.cardId));
            break;
          case "add-card":
            setData([...data, dt.data]);
            break;
        }
      };
  }, [data]);
  const shareBoard = (boardId) => {
    Axios.put(`${config.dev.path}/board/public`, { id: boardId }).then(
      (res) => {
        if (res.data.code === 0) {
          alert(`Board ${board.public ? "un" : ""}public successful`);
          setBoard({ ...board, public: !board.public });
        } else if (res.data.code === 4) {
          alert("You dont have permission to access this board!");
        } else {
          alert(res.data.data.message);
        }
      }
    );
  };

  return (
    redirect || (
      <HomePage
        topButton={
          <a
            className="top-button"
            onClick={(e) => {
              e.preventDefault();
              shareBoard(boardId);
            }}
          >
            {board.public != 0 && <div className="line"></div>}
            <i className="fa fa-share-alt" aria-hidden="true"></i>
          </a>
        }
      >
        <div className="fill d-flex">
          <CardColumn
            name="Went well"
            ws={ws}
            data={data}
            setData={setData}
            boardId={boardId}
          />
          <CardColumn
            name="To improve"
            ws={ws}
            data={data}
            setData={setData}
            boardId={boardId}
          />
          <CardColumn
            name="Action items"
            ws={ws}
            data={data}
            setData={setData}
            boardId={boardId}
          />
        </div>
      </HomePage>
    )
  );
}

export default withRouter(Card);
