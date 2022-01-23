import React, { createContext, useState } from "react";
import auth from "../services/authService";
import { getFavouritesBooksCount } from "../services/favouritesService";

import {
  getShoppingCartCount,
  getShoppingCartTotal,
} from "../services/shoppingCartService";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, setState] = useState({
    shoppingCartCount: getShoppingCartCount(),
    favouritesProductsCount: getFavouritesBooksCount(),
    user: auth.getCurrentUser(),
    shoppingCartTotal: getShoppingCartTotal(),
  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};
