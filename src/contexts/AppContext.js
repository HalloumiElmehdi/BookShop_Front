import React, { createContext, useState, useEffect } from "react";
import auth from "../services/authService";
import {
  getShopCartCount,
  getShopCartTotal,
} from "../services/shoppingCartService";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, setState] = useState({
    count: getShopCartCount(),
    user: null,
    total: getShopCartTotal(),
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};
