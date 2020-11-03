import React, { useState } from "react";
import "./Login.css";
import logo from "../../asset/img/logo-blue.png";
import config from "../../config/config.json";
import { Form } from "react-bootstrap";
import Axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp,setSignUp]=useState(false);
  const [error, setError] = useState("");

  const onLogin = () => {
    Axios.defaults.withCredentials = true;
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
  return (
    <div>
      <div className="title-login">
        <i className="fa fa-trello blue-icon" aria-hidden="true"></i>{" "}
        <img className="title" src={logo} alt="logo"></img>
      </div>
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <div className="main-login">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            <Form.Control
              className="mb-4"
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></Form.Control>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></Form.Control>
            {signUp && (
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></Form.Control>
            )}
            <button className="login-btn" onClick={onLogin}>
              Đăng nhập
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
