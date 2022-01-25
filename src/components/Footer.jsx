import React from "react";
import { Link } from "react-router-dom";
import paths from "../utils/NavPaths";

export default function Footer() {
  return (
    <footer className="footer spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__about__logo">
                <Link to={paths.HOME}>
                  <img src="img/logo.png" alt="" />
                </Link>
              </div>
              <ul>
                <li>Oujda Morocco</li>
                <li>Phone: +212 10 20 30</li>
                <li>elibrary.contact@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
            <div className="footer__widget">
              <h6>Useful Links</h6>
              <ul>
                <li>
                  <Link to={paths.ABOUT_US}>About Us</Link>
                </li>
                <li>
                  <Link to={paths.ABOUT_US}>Delivery infomations</Link>
                </li>
                <li>
                  <Link to={paths.ABOUT_US}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={paths.CONTACT}>Contact us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer__widget">
              <div className="footer__widget__social">
                <Link to="/">
                  <i className="fa fa-facebook" />
                </Link>
                <Link to="/">
                  <i className="fa fa-instagram" />
                </Link>
                <Link to="/">
                  <i className="fa fa-twitter" />
                </Link>
                <Link to="/">
                  <i className="fa fa-pinterest" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footer__copyright">
              <div className="footer__copyright__text">
                <p>
                  Copyright &copy; All rights reserved &nbsp; | &nbsp; This site
                  is made with &nbsp;{" "}
                  <i className="fa fa-heart" aria-hidden="true" /> &nbsp; by
                  SUPMTI Team
                </p>
              </div>
              <div className="footer__copyright__payment">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
