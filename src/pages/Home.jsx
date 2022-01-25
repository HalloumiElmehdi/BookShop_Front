import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { getShoppingCartTotal } from "../services/shoppingCartService";

import { getBooks } from "../services/bookService";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";
import PreLoader from "./PreLoader";

export default function Home() {
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const [state, setState] = useContext(AppContext);
  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      const { data } = await getBooks();
      const featured = data.slice(0, 8);
      setBooks(featured);
    }
    fetchBooks();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleAddToCart = (book) => {
    if (!book.stock > 0) {
      toast.error("out of stock !");
      return;
    }
    const found = shoppingCartBooks.find((b) => b.id === book.id);

    if (!found) {
      book.quantity = 1;
      shoppingCartBooks.push(book);
      //updateCartBooks(shoppingCartBooks);
      //update cart badge
      setState({
        shoppingCartCount: state.shoppingCartCount + 1,
        shoppingCartTotal: getShoppingCartTotal(),
      });
      //
      toast.success(`✓ added !`);
    } else toast.error(`Product exist already in your cart !`);
  };

  return (
    <Fragment>
      {isLoading && <PreLoader />}
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
                      <Link to={`/shopping-details/${book.id}`}>
                        {book.title}
                      </Link>
                    </h6>
                    <h5>${book.price}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
