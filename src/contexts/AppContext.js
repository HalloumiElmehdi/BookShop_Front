import React, { createContext, useState } from "react";
import auth from "../services/authService";

import { getShoppingCartCount } from "../services/shoppingCartService";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, setState] = useState({
    shoppingCartCount: getShoppingCartCount(),
    user: auth.getCurrentUser(),
    shoppingCartTotal: 0,
  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};
