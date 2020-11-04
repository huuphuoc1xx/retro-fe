import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../asset/img/logo.png";
import config from "../../config/config.json";
import { Link } from "react-router-dom";
import Axios from "axios";

function HomePage(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Axios.get(`${config.dev.path}`)
      .then((res) => {
        if (res.data.code !== 0)
          window.location.href = `${window.location.origin}/login?redirect_url=${window.location.href}`;
        else setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        window.location.href = `${window.location.origin}/login?redirect_url=${window.location.href}`;
      });
  },[]);

  const onLogout = () => {
    Axios.post(`${config.dev.path}/logout`).finally(() => {
      window.location.href = `${window.location.origin}/login`;
    });
  };
  return loading ? (
    <div>
      <Navbar className="nav-bar">
        <Link to="/" className="logo d-flex">
          <i className="fa fa-trello icon"></i>{" "}
          <img className="title" src={logo} alt="logo"></img>
        </Link>
        <div className="right-nav">
          <button className="top-button " onClick={onLogout}>
            <i className="fa fa-sign-out"></i>
          </button>
          <Link to="/profile" className="profile-btn">
            <i className="fa fa-user"></i>
          </Link>
        </div>
      </Navbar>
      {props.children}
    </div>
  ) : (
    <div></div>
  );
}

export default HomePage;
