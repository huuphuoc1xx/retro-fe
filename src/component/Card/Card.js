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
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    Axios.get(`${config.dev.path}/card/${boardId}`).then((res) => {
      if (res.data.code === 0) setData(res.data.data.cards);
      if (res.data.code === 4) {
        alert("You dont have permission to access this board!");
        setRedirect(<Redirect to="/" />);
      }
    });
  }, [boardId]);

  return (
    redirect || (
      <HomePage>
        <div className="fill d-flex">
          <CardColumn
            name="Went well"
            data={data}
            setData={setData}
            boardId={boardId}
          />
          <CardColumn
            name="To improve"
            data={data}
            setData={setData}
            boardId={boardId}
          />
          <CardColumn
            name="Action items"
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
