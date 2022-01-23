import React, { useEffect } from "react";
import $ from "jquery";

export default function Breadcrumb() {
  useEffect(() => {
    $(".set-bg").each(function () {
      let bg = $(this).data("setbg");
      $(this).css(
        "background-image",
        "url(" + process.env.PUBLIC_URL + "/" + bg + ")"
      );
    });
  });
  return (
    <section
      className="breadcrumb-section set-bg"
      data-setbg={process.env.PUBLIC_URL + "img/breadcrumb.png"}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>Book Shop</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
