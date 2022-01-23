import React, { Fragment } from "react";
import Form from "../components/common/form";
import Input from "../components/common/input";
import Joi from "joi-browser";
import "./style/login.css";

export default class LoginRegister extends Form {
  state = {
    userLocal: null,
    data: {
      username: "",
      password: "",
    },
    errors: {},
    idles: {
      username: null,
      password: null,
    },
    isloading: false,
  };

  schema = {
    username: Joi.string().min(5).max(50).required().label("Username"),
    password: Joi.string().min(5).max(50).required().label("Password"),
  };

  render() {
    const { data, errors, idles, isloading } = this.state;
    return (
      <div class="login-container">
        <div id="output"></div>
        <div class="avatar"></div>
        <div class="form-box">
          <form action="" method="">
            <Input name="user" type="text" label="username" />
            <Input name="password" type="password" label="password" />
            <button class="btn btn-info btn-block login" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
