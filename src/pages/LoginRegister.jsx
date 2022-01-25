import React from "react";
import Form from "../components/common/form";
import Input from "../components/common/input";
import Joi from "joi-browser";
import auth from "../services/authService";
import { setToast } from "../utils/toasts";
import { refresh } from "../utils/refresh";
import $ from "jquery";
import { Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getCurrentUserData } from "../services/userService";

export default class LoginRegister extends Form {
  static AppContext = AppContext;
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

  componentDidMount() {
    $(".set-bg").each(function () {
      let bg = $(this).data("setbg");
      $(this).css(
        "background-image",
        "url(" + process.env.PUBLIC_URL + "/" + bg + ")"
      );
    });
  }

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ isloading: true });
      await auth.login(this.state.data);
      setToast("Welcome back !");
      refresh("/");
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        this.setState({ isloading: false });
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        errors.password = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    const { data, errors, idles, isloading } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div
                    className="col-lg-6 d-none d-lg-block set-bg"
                    data-setbg={process.env.PUBLIC_URL + "img/loginBg.jpg"}
                  ></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <div className="form-group">
                        <Input
                          name="username"
                          type="email"
                          label="Username"
                          value={data.username}
                          onChange={this.handleChange}
                          error={errors.username}
                          isIdle={idles.username}
                        />
                      </div>
                      <div className="form-group">
                        <Input
                          name="password"
                          label="Password"
                          type="password"
                          value={data.password}
                          onChange={this.handleChange}
                          error={errors.password}
                          isIdle={idles.password}
                          onKeyPress={this.handleKeyPress}
                        />
                      </div>
                      <div style={{ width: "95%", margin: "10px" }}>
                        {this.renderSubmitBtn("login", isloading)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
