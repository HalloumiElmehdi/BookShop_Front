import React from "react";

export default function SearchBar() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div className="hero__search">
            <div className="hero__search__form">
              <form action="/">
                <div className="hero__search__categories">
                  Search
                  <span className="arrow_carrot-down"></span>
                </div>
                <input type="text" placeholder="What do yo u need?" />
                <button type="submit" className="site-btn">
                  SEARCH
                </button>
              </form>
            </div>
            <div className="hero__search__phone">
              <div className="hero__search__phone__icon">
                <i className="fa fa-phone"></i>
              </div>
              <div className="hero__search__phone__text">
                <h5>+65 11.188.888</h5>
                <span>support 24/7 time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
