import React, { useState, useEffect, useContext } from "react";

import { getBooks } from "../services/bookService";

import {
  getCartBooks,
  getShoppingCartTotal,
  updateCartBooks,
} from "../services/shoppingCartService";
import {
  getFavouritesBooks,
  updateFavouritesBooks,
} from "../services/favouritesService";
import { Link } from "react-router-dom";
import Pagination, { paginate } from "../components/common/pagination";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext";

const PER_PAGE = 4;
export default function Books() {
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [favouritesBooks, setFavouritesBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState([]);
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await getBooks();
      setBooks(data);
    }
    fetchBooks();
    setPage(paginate(books, 1, PER_PAGE));
    setBooks(page);
    setShoppingCartBooks(getCartBooks());
    setFavouritesBooks(getFavouritesBooks());
  }, []);

  function handlePageClick({ selected: page }) {
    setBooks(paginate(books, page, PER_PAGE));
  }

  const handleAddToCart = (book) => {
    const found = shoppingCartBooks.find((b) => b.id === book.id);
    if (!found) {
      book.quantity = 1;
      shoppingCartBooks.push(book);
      updateCartBooks(shoppingCartBooks);
      //update cart badge
      setState({
        shoppingCartCount: state.shoppingCartCount + 1,
        favouritesBooksCount: state.favouritesBooksCount,
        shoppingCartTotal: getShoppingCartTotal(),
      });
      //
      toast.success(`book added to your cart !`);
    } else toast.error(`book exist already in your cart !`);
  };

  const handleAddToFavourites = (book) => {
    const found = favouritesBooks.find((p) => p._id === book._id);
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
      toast.success(`book added to favourites !`);
    } else toast.error(`book exist already in your favourites !`);
  };

  return (
    <section className="book spad">
      <div className="container">
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
                      <span>{books.length}</span> Books found
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
              {books.map((book) => (
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
  );
}
