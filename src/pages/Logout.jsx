import React, { useEffect } from "react";
import auth from "../services/authService";
import { setToast } from "../utils/toasts";
import { refresh } from "../utils/refresh";
import { useState } from "react/cjs/react.development";
import PreLoader from "./PreLoader";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      auth.logout();
      setToast("Disconnected");
      refresh("/");
    }, 1000);
  });
  return isLoading ? <PreLoader /> : null;
}
