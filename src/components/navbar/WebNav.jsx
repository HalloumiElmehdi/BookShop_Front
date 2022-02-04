import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

export default function WebNav({ user }) {
  const [state, setState] = useContext(AppContext);
  const [currentRoute, setCurrentRoute] = useState("/");

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>
                    <i className="fa fa-envelope"></i>{" "}
                    elibrary.contact@gmail.com
                  </li>
                  <li>Free Shipping for all Order of $99</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <Link to="/">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="/">
                    <i className="fa fa-twitter"></i>
                  </Link>
                  <Link to="/">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                  <Link to="/">
                    <i className="fa fa-pinterest-p"></i>
                  </Link>
                </div>
                {user && (
                  <div className="header__top__right__language">
                    <div>{user.username}</div>
                    <span className="arrow_carrot-down"></span>
                    <ul>
                      <li>
                        <Link to="/logout" className="hover-green">
                          sign-out
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover-green">
                          profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover-green">
                          settings
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                {!user && (
                  <div className="header__top__right__auth">
                    <Link to="/login">
                      <i className="fa fa-user"></i> Login / Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to="/">
                <img src="img/logo.png" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-8">
            <nav className="header__menu">
              <ul>
                <li
                  className={currentRoute === "/" ? "active" : ""}
                  onClick={() => setCurrentRoute("/")}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={currentRoute === "/shop" ? "active" : ""}
                  onClick={() => setCurrentRoute("/shop")}
                >
                  <Link to="/shop">Shop</Link>
                </li>

                <li
                  className={currentRoute === "/shopping-cart" ? "active" : ""}
                  onClick={() => setCurrentRoute("/shopping-cart")}
                >
                  <Link to="/shopping-cart">Shopping Cart</Link>
                </li>
                <li
                  className={currentRoute === "/checkout" ? "active" : ""}
                  onClick={() => setCurrentRoute("/checkout")}
                >
                  <Link to="/checkout">Check Out</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-2">
            <div className="header__cart">
              <ul>
                <li>
                  <Link to="/shopping-cart">
                    <i
                      className="fa fa-shopping-bag fa-lg fa-beat"
                      title="Go to shopping Cart"
                      onClick={() => setCurrentRoute("/shopping-cart")}
                    ></i>{" "}
                    <span>{parseInt(state.count)}</span>
                  </Link>
                </li>
              </ul>
              <div className="header__cart__price">
                <span title="Total Shopping Cart">
                  ${state.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
}
