import React, { useState, useEffect, useContext, Fragment } from "react";

import { getBooks } from "../services/bookService";

import {
  getCartBooks,
  getShoppingCartTotal,
  updateCartBooks,
} from "../services/shoppingCartService";

import { Link } from "react-router-dom";
import Pagination, { paginate } from "../components/common/pagination";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

const PER_PAGE = 8;

export default function Shop() {
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [keyWord, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await getBooks();
      setBooks(data);
      setFiltered(paginate(data, 0, PER_PAGE));
    }
    fetchBooks();
    setShoppingCartBooks(getCartBooks());
  }, []);

  function handlePageClick({ selected: page }) {
    setFiltered(paginate(books, page, PER_PAGE));
  }

  const filterByTitle = (title) =>
    title.trim().toLowerCase().includes(keyWord.trim().toLowerCase());

  const filterByAuthor = (author) =>
    author.trim().toLowerCase().includes(keyWord.trim().toLowerCase());

  const handleSearch = (keyWord) => {
    setKeyword(keyWord);
    const filteredBooks = books.filter(
      (book) => filterByTitle(book.title) || filterByAuthor(book.author)
    );

    setFiltered(paginate(filteredBooks, 0, PER_PAGE));
  };

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
      toast.success(`book added to your cart !`);
    } else toast.error(`book exist already in your cart !`);
  };

  return (
    <Fragment>
      <section className="book spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form>
                    <div className="hero__search__categories">
                      Search
                      <span className="arrow_carrot-down"></span>
                    </div>
                    <input
                      type="text"
                      placeholder="What do yo u need?"
                      value={keyWord}
                      onChange={({ target }) => handleSearch(target.value)}
                    />
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
          <div className="row">
            <div className="col-lg-12 col-md-7">
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span>Sort By</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                      <h6>
                        <span>{filtered.length}</span> Book(s) found
                      </h6>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3">
                    <div className="filter__option">
                      <span className="icon_grid-2x2" />
                      <span className="icon_ul" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {filtered.map((book) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={book.id}>
                    <div className="featured__item">
                      <div
                        className="featured__item__pic "
                        style={{
                          backgroundImage: "url('" + book.image + "')",
                          backgroundRepeat: "no-repeat",
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
                          <Link to="/">
                            {book.title}
                            <br />
                          </Link>
                        </h6>
                        <h5>${book.price}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination onPageChange={handlePageClick} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
