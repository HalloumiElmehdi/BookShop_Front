import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  getCartBooks,
  getShoppingCartTotal,
  updateCartBooks,
} from "../services/shoppingCartService";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

export default function ShoppingCart() {
  const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    setShoppingCartBooks(getCartBooks());
  }, []);

  const handleChange = (product, value) => {
    const Books = [...shoppingCartBooks];
    const index = Books.findIndex((p) => p._id === product._id);
    product.quantity = value;
    Books[index] = product;
    setShoppingCartBooks(Books);
    updateCartBooks(Books);
    setState({
      favouritesBooksCount: state.favouritesBooksCount,
      shoppingCartCount: state.shoppingCartCount,
      shoppingCartTotal: getShoppingCartTotal(),
      coupon: state.coupon,
    });
  };
  const handleDelete = (product) => {
    const Books = [...shoppingCartBooks];
    const index = Books.findIndex((p) => p._id === product._id);
    Books.splice(index, 1);
    setShoppingCartBooks(Books);
    updateCartBooks(Books);
    setState({
      shoppingCartCount: state.shoppingCartCount - 1,
      favouritesBooksCount: state.favouritesBooksCount,
      shoppingCartTotal: getShoppingCartTotal(),
      coupon: state.coupon,
    });
    toast.error("Product deleted !");
  };

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th className="shoping__product">Books</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {shoppingCartBooks &&
                    shoppingCartBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="shoping__cart__item">
                          <img src={book.smallimage} alt="" />
                          <h5>{book.title}</h5>
                        </td>
                        <td className="shoping__cart__price">${book.price}</td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <input
                                type="text"
                                value={book.quantity}
                                onChange={({ target }) =>
                                  handleChange(book, target.value)
                                }
                              />
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total">
                          ${book.quantity * book.price}
                        </td>
                        <td className="shoping__cart__item__close">
                          <i
                            className="fa fa-times fa-lg cursor_pointer hover-red"
                            aria-hidden="true"
                            onClick={() => handleDelete(book)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  {shoppingCartBooks.length === 0 && (
                    <tr>
                      <td className="shoping__cart__item">
                        <h5>Your Shopping Cart is empty !</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__btns">
              <Link to="/shop" className="primary-btn cart-btn">
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__continue">
              <div className="shoping__discount">
                <h5>Discount Codes</h5>
                <form onSubmit={(e) => {}}>
                  <input
                    type="text"
                    placeholder="Enter your coupon code"
                    value={0}
                  />
                  <button className="site-btn"> APPLY COUPON</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>
                  Total{" "}
                  <span>
                    $
                    {state.shoppingCartTotal &&
                      state.shoppingCartTotal.toFixed(2)}
                  </span>
                </li>
                {state.coupon && state.shoppingCartTotal && (
                  <Fragment>
                    <li>
                      DISCOUNT{` ${state.coupon.value * 100}%`}
                      <span>
                        <i
                          className="fa fa-ticket fa-lg fa-beat"
                          aria-hidden="true"
                        ></i>{" "}
                        {` - `}$
                        {(state.shoppingCartTotal * state.coupon.value).toFixed(
                          2
                        )}
                      </span>
                    </li>
                    <li>
                      Total after Discount{" "}
                      <span>
                        $
                        {(
                          state.shoppingCartTotal *
                          (1 - state.coupon.value)
                        ).toFixed(2)}
                      </span>
                    </li>
                  </Fragment>
                )}
              </ul>
              <Link to="/checkout" className="primary-btn">
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
