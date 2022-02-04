import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookService";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";
import PreLoader from "./PreLoader";
import auth from "../services/authService";
import {
  getShopCart,
  getShopCartTotal,
  getShopCartCount,
  updateShopCart,
} from "../services/shoppingCartService";

export default function Home() {
  const [state, setState] = useContext(AppContext);
  const [shoppingCart, setshoppingCart] = useState(getShopCart());
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  //#region useEffect
  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      const { data } = await getBooks();
      const featured = data.slice(0, 8);
      setBooks(featured);
      setIsLoading(false);
    }
    fetchBooks();
  }, []);

  //#endregion

  //#region  handle cart operations

  const handleAddToCart = (book) => {
    const index = shoppingCart.items
      ? shoppingCart.items.findIndex((i) => i.book.id === book.id)
      : -1;
    if (index !== -1) {
      shoppingCart.items[index].quantity++;
    } else {
      const item = {
        book,
        quantity: 1,
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
