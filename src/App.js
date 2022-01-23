import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Toasts
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteToast } from "./utils/toasts";

// layout
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import PreLoader from "./pages/PreLoader";
import Breadcrumb from "./components/breadcrumb";
import SearchBar from "./components/SearchBar";

// Pages
import HomePage from "./pages/Home";
import ShopPage from "./pages/Shop";
import ShopDetailsPage from "./pages/ShopDetails";
import ShopCartPage from "./pages/ShoppingCart";
import CheckoutPage from "./pages/Checkout";
import LoginRegisterPage from "./pages/LoginRegister";

import auth from "./services/authService";

//AppContext state
import { AppContextProvider } from "./contexts/AppContext";

// seed data
import { seed } from "./seeder";

export default function App() {
  const [user, setUser] = useState(auth.getCurrentUser());
  useEffect(() => {
    /* const loaded = localStorage.getItem("load");
    !loaded && seed();
    const toastMsg = localStorage.getItem("toast");
    if (toast) {
      setTimeout(() => {
        toast(toastMsg);
        deleteToast();
      }, 1000);
    }*/
  }, []);
  return (
    <AppContextProvider>
      <Navbar />
      <SearchBar />
      <Breadcrumb />
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <PreLoader />

      <main>
        <Switch>
          <Route path="/login" exact component={LoginRegisterPage} />
          <Route path="/" exact component={HomePage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route
            path="/shopping-details/:id?"
            exact
            component={ShopDetailsPage}
          />
          <Route path="/shopping-cart" exact component={ShopCartPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route
            path="/not-found"
            exact
            component={() => <h1>Not found page</h1>}
          />
          <Redirect to="/not-found" />
        </Switch>
      </main>

      <Footer />
    </AppContextProvider>
  );
}
