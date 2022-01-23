import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getShoppingCartTotal,
  updateCartBooks,
} from "../services/shoppingCartService";

import { getBooks } from "../services/bookService";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

export default function Home() {
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const [state, setState] = useContext(AppContext);
  useEffect(() => {
    async function fetchBooks() {
      const { data } = await getBooks();
      const featured = data.slice(0, 8);
      setBooks(featured);
    }
    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    if (!book.stock > 0) {
      toast.error("product is out of stock", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const found = shoppingCartBooks.find((b) => b.id === book.id);

    if (!found) {
      book.quantity = 1;
      shoppingCartBooks.push(book);
      updateCartBooks(shoppingCartBooks);
      //update cart badge
      setState({
        shoppingCartCount: state.shoppingCartCount + 1,
        shoppingCartTotal: getShoppingCartTotal(),
      });
      //
      toast.success(`Product added to your cart !`);
    } else toast.error(`Product exist already in your cart !`);
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
                    <li className="cursor_pointer">
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
