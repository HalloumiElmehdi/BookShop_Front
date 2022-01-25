import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Toasts
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteToast } from "./utils/toasts";

// Layout
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import PreLoader from "./pages/PreLoader";
import Breadcrumb from "./components/breadcrumb";

// Pages
import HomePage from "./pages/Home";
import ShopPage from "./pages/Shop";
import ShopDetailsPage from "./pages/ShopDetails";
import ShopCartPage from "./pages/ShoppingCart";
import CheckoutPage from "./pages/Checkout";
import LoginRegisterPage from "./pages/LoginRegister";
import ErrorPage from "./pages/Error";
import LogoutPage from "./pages/Logout";

// Services
import auth from "./services/authService";

//AppContext state
import { AppContextProvider } from "./contexts/AppContext";

export default function App() {
  const [user, setUser] = useState(auth.getCurrentUser());
  useEffect(() => {
    const toastMsg = localStorage.getItem("toast");

    if (toast) {
      setTimeout(() => {
        toast.success(toastMsg);
        deleteToast();
      }, 1000);
    }
  }, []);
  return (
    <AppContextProvider>
      <Navbar user={user} />
      <Breadcrumb />
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        transition={Slide}
      />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginRegisterPage} />
          <Route path="/logout" exact component={LogoutPage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route
            path="/shopping-details/:id"
            exact
            component={ShopDetailsPage}
          />
          <Route path="/shopping-cart" exact component={ShopCartPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/error" exact component={ErrorPage} />
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
