import { Component } from "react";
import { refresh } from "../utils/refresh";
import auth from "../services/auth";
import { setToast } from "../utils/toasts";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    setToast("Disconnected");
    refresh("/");
  }

  render() {
    return null;
  }
}

export default Logout;
