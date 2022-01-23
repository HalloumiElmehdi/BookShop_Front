import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getShoppingCartTotal,
  updateCartBooks,
} from "../services/shoppingCartService";

import { getBooks } from "../services/bookService";
import { updateFavouritesBooks } from "../services/favouritesService";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

export default function Home() {
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [favouritesBooks, setFavouritesBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const [state, setState] = useContext(AppContext);
  useEffect(() => {
    async function fetchBooks() {
      const { data } = await getBooks();
      console.log(data);
      setBooks(data);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await getBooks();
      console.log("data fetched ... ", data);
      setBooks(data.slice(0, 12));
    }
    fetchBooks();
  }, []);

  const handleAddToCart = (product) => {
    const found = shoppingCartBooks.find((p) => p._id === product._id);

    if (!found) {
      product.quantity = 1;
      shoppingCartBooks.push(product);
      updateCartBooks(shoppingCartBooks);
      //update cart badge
      setState({
        shoppingCartCount: state.shoppingCartCount + 1,
        favouritesBooksCount: state.favouritesBooksCount,
        shoppingCartTotal: getShoppingCartTotal(),
        coupon: state.coupon,
      });
      //
      toast.success(`Product added to your cart !`);
    } else toast.error(`Product exist already in your cart !`);
  };

  const handleAddToFavourites = (product) => {
    const found = favouritesBooks.find((p) => p._id === product._id);
    if (!found) {
      product.quantity = 1;
      favouritesBooks.push(product);
      updateFavouritesBooks(favouritesBooks);
      //update cart badge
      setState({
        favouritesBooksCount: state.favouritesBooksCount + 1,
        shoppingCartCount: state.shoppingCartCount,
        shoppingCartTotal: getShoppingCartTotal(),
        coupon: state.coupon,
      });
      //
      toast.success(`Product added to favourites !`);
    } else toast.error(`Product exist already in your favourites !`);
  };

  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Books</h2>
            </div>
            <div className="featured__controls">
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row featured__filter">
          {books.map((book) => (
            <div className={"col-lg-3 col-md-4 col-sm-6 mix"} key={book.id}>
              <div className="featured__item">
                <div
                  className="featured__item__pic set-bg"
                  style={{
                    backgroundImage: "url('" + book.image + "')",
                  }}
                >
                  <ul className="featured__item__pic__hover">
                    <li
                      onClick={() => handleAddToFavourites(book)}
                      className="cursor_pointer"
                    >
                      <a>
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <Link to={"/shopping-details/" + book.id}>
                        <i className="fa fa-retweet"></i>
                      </Link>
                    </li>
                    <li
                      onClick={() => handleAddToCart(book)}
                      className="cursor_pointer"
                    >
                      <a>
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="featured__item__text">
                  <h6>
                    <Link to="/">Crab Pool Security</Link>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
