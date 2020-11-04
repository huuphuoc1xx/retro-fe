import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import HomePage from "../HomePage/HomePage";
import config from "../../config/config.json";
import "./css/User.css";
import { withRouter } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function User(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get(`${config.dev.path}/user`).then((res) => {
      if (res.data.code === 0) {
        const { username, name, email, dob } = res.data.data;
        setUsername(username);
        setName(name);
        setEmail(email);
        setDob(new Date(dob));
      }
    });
  }, []);

  const submitInfo = (e) => {
    e.preventDefault();
    console.log(name, email, dob);
    Axios.put(`${config.dev.path}/user`, { name, email, dob }).then((res) => {
      if (res.data.code === 0) {
        setMessage("Update Info Successful!");
      } else setMessage(res.data.data.message);
    });
  };
  return (
    <HomePage>
      <div className="profile">
        <div className="title">Thông tin cá nhân</div>
        <hr />
        <Form className="mr-4 ml-4 pb-5" onSubmit={submitInfo}>
          <p className="profile-label">
            User: &emsp;
            {username}
          </p>
          <Form.Label className="profile-label">Họ và tên</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          ></Form.Control>
          <Form.Label className="profile-label">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Label className="profile-label">Ngày sinh</Form.Label>
          <br />
          
          <i class="fa fa-calendar"></i>&nbsp;
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className="form-control"
            selected={dob}
            onChange={(date) => setDob(date)}
          ></DatePicker>
          <button className="blue-btn  mt-4" type="submit">
            Lưu
          </button>
          <p className="text-danger">{message}</p>
        </Form>
      </div>
    </HomePage>
  );
}

export default withRouter(User);
