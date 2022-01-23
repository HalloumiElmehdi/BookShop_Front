import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getCartBooks,
  getShoppingCartTotal,
  updateCartBooks,
} from "../services/shoppingCartService";
import {
  getFavouritesBooks,
  updateFavouritesBooks,
} from "../services/favouritesService";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";
import { getBookById } from "../services/bookService";

export default function ShopDetails() {
  const pathname = window.location.pathname;
  const bookID = pathname.split("/")[2];
  const [book, setBook] = useState();
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [favouritesBooks, setfavouritesBooks] = useState([]);
  const [state, setState] = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setShoppingCartBooks(getCartBooks());
    setfavouritesBooks(getFavouritesBooks());
    setBook(getBookById(bookID));
  }, []);

  const handleAddToCart = (book) => {
    const found = shoppingCartBooks.find((b) => b.id === book.id);

    if (!found) {
      book.quantity = quantity;
      shoppingCartBooks.push(book);
      updateCartBooks(shoppingCartBooks);
      //update cart badge
      setState({
        shoppingCartCount: state.shoppingCartCount + 1,
        favouritesBooksCount: state.favouritesBooksCount,
        shoppingCartTotal: getShoppingCartTotal(),
      });
      //
      toast.success(`Product added to your cart !`);
    } else toast.error(`Product exist already in your cart !`);
  };

  const handleAddToFavourites = (book) => {
    const found = favouritesBooks.find((b) => b.id === book.id);
    if (!found) {
      book.quantity = 1;
      favouritesBooks.push(book);
      updateFavouritesBooks(favouritesBooks);
      //update cart badge
      setState({
        favouritesBooksCount: state.favouritesBooksCount + 1,
        shoppingCartCount: state.shoppingCartCount,
        shoppingCartTotal: getShoppingCartTotal(),
      });
      //
      toast.success(`Product added to favourites !`);
    } else toast.error(`Product exist already in your favourites !`);
  };

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
                    <input
                      type="text"
                      value={quantity}
                      onChange={({ target }) => setQuantity(target.value)}
                    />
                  </div>
                </div>
              </div>
              <a
                onClick={() => handleAddToCart(book)}
                className="primary-btn cursor_pointer"
              >
                ADD TO CARD
              </a>
              <a
                onClick={() => handleAddToFavourites(book)}
                className="heart-icon cursor_pointer"
              >
                <span className="icon_heart_alt" />
              </a>
              <ul>
                <li>
                  <b>Availability</b> <span>In Stock</span>
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
