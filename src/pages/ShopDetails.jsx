import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";
import { getBookById } from "../services/bookService";

import {
  getShopCart,
  getShopCartCount,
  getShopCartTotal,
  updateShopCart,
} from "../services/shoppingCartService";

export default function ShopDetails() {
  const [state, setState] = useContext(AppContext);
  const [book, setBook] = useState();
  const [quantity, setQuantity] = useState(1);
  const [shoppingCart, setshoppingCart] = useState(getShopCart());

  const pathname = window.location.pathname;
  const bookID = pathname.split("/")[2];

  //#region  useEffect
  useEffect(() => {
    async function fetchBook() {
      const { data } = await getBookById(bookID);
      console.log(data);
      setBook(data);
    }
    fetchBook();
  }, []);

  //#endregion

  //#region shopping cart operations
  const handleAddToCart = (book) => {
    const index = shoppingCart.items
      ? shoppingCart.items.findIndex((i) => i.book.id === book.id)
      : -1;
    if (index !== -1) {
      shoppingCart.items[index].quantity += parseInt(quantity);
    } else {
      const item = {
        book,
        quantity,
      };
      shoppingCart.items.push(item);
      shoppingCart.total = shoppingCart.total + item.book.price * item.quantity;
    }

    updateShopCart(shoppingCart);
    //update cart badge
    setState({
      count: getShopCartCount(),
      total: getShopCartTotal(),
    });

    //
    toast.success(`☑ success`);
  };
  //#endregion

  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img
                  className="product__details__pic__item--large"
                  src={
                    book
                      ? book.image
                      : "img/product/details/product-details-1.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{book ? book.title : "Vetgetable’s Package"}</h3>
              <div className="product__details__rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
                <span>(18 reviews)</span>
              </div>
              <div className="product__details__price">
                {book ? `$${book.price}` : "$50.00"}
              </div>
              <p>
                {book
                  ? book.description
                  : "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.Vestibulum ac diam sit amet quam vehicula elementum sed sitamet dui. Sed porttitor lectus nibh. Vestibulum ac diam sitamet quam vehicula elementum sed sit amet dui. Proin egettortor risus."}
              </p>
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                    <span
                      className="inc qtybtn"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      -
                    </span>
                    <input
                      type="text"
                      value={quantity}
                      onChange={({ target }) => setQuantity(target.value)}
                    />
                    <span
                      className="dec qtybtn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
              <a
                onClick={() => handleAddToCart(book)}
                className="primary-btn cursor_pointer"
              >
                ADD TO CARD
              </a>
              <a className="heart-icon cursor_pointer">
                <span className="icon_heart_alt" />
              </a>
              <ul>
                <li>
                  <b>Availability</b>{" "}
                  {book && book.stock > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span style={{ color: "red" }}>Out of Stock</span>
                  )}
                </li>
                <li>
                  <b>Shipping</b>{" "}
                  <span>
                    01 day shipping. <samp>Free pickup today</samp>
                  </span>
                </li>
                <li>
                  <b>Weight</b> <span>0.5 kg</span>
                </li>
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <Link to="/">
                      <i className="fa fa-facebook" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-twitter" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-instagram" />
                    </Link>
                    <Link to="/">
                      <i className="fa fa-pinterest" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
