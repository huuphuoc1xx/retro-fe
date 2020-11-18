import React, { useState } from "react";
import "./Login.css";
import logo from "../../asset/img/logo-blue.png";
import config from "../../config/config.json";
import { Form } from "react-bootstrap";
import Axios from "axios";
import { withRouter } from "react-router-dom";

Axios.defaults.withCredentials = true;
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = () => {
    Axios.post(`${config.dev.path}/login`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          window.location.href =
            new URLSearchParams(window.location.search).get("redirect_url") ||
            window.location.origin;
        } else {
          setError(res.data.data.message);
        }
      })
      .catch((err) => {
        setError("Network error!!!");
      });
  };

  const onSignup = () => {
    if (password != confirmPassword) {
      setError("Password not match");
      return;
    }
    Axios.post(`${config.dev.path}/signup`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          window.location.href =
            new URLSearchParams(window.location.search).get("redirect_url") ||
            window.location.origin;
        } else {
          setError(res.data.data.message);
        }
      })
      .catch((err) => {
        setError("Network error!!!");
      });
  };
  return (
    <div>
      <div className="title-login">
        <i className="fa fa-trello blue-icon" aria-hidden="true"></i>{" "}
        <img className="title" src={logo} alt="logo"></img>
      </div>
      <div className="login-container">
        <h1>
          <a
            onClick={() => {
              setSignup(false);
              setError("");
            }}
            className={signup ? "tag" : "tag active"}
          >
            Đăng nhập
          </a>
          &ensp;|&ensp;
          <a
            onClick={() => setSignup(true)}
            className={signup ? "tag active" : "tag"}
          >
            Đăng ký
          </a>
        </h1>
        <div className="main-login">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signup ? onSignup() : onLogin();
            }}
          >
            <Form.Control
              className="mb-3"
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></Form.Control>
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            {signup && (
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Mật khẩu xác nhận"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value != password)
                    setError("Password not match");
                  else {
                    setError("");
                  }
                }}
              ></Form.Control>
            )}
            <div className="login-btn-container">
              <p className="text-danger mb-0">{error}</p>
              <button className="blue-btn" type="submit">
                {signup ? "Đăng ký" : "Đăng nhập"}
              </button>
            </div>{" "}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);