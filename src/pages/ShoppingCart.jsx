import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getShopCart,
  getShopCartCount,
  getShopCartTotal,
  updateShopCart,
} from "../services/shoppingCartService";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

export default function ShoppingCart() {
  const [shoppingCart, setshoppingCart] = useState(getShopCart());
  const [state, setState] = useContext(AppContext);

  const handleQuantityChange = (item, value) => {
    const cart = { ...shoppingCart };
    const index = cart.items.findIndex((i) => i.book.id === item.book.id);
    item.quantity = value;
    cart.items[index] = item;
    setshoppingCart(cart);
    updateShopCart(cart);

    setState({
      count: getShopCartCount(),
      total: getShopCartTotal(),
    });
  };

  const handleDelete = (item) => {
    const cart = { ...shoppingCart };
    const index = cart.items.findIndex((i) => i.book.id === item.book.id);
    cart.items.splice(index, 1);
    setshoppingCart(cart);
    updateShopCart(cart);

    setState({
      count: getShopCartCount(),
      total: getShopCartTotal(),
    });

    toast.error(`☑ success`);
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
                    <th className="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {shoppingCart.items &&
                    shoppingCart.items.map((item) => (
                      <tr key={item.book.id}>
                        <td className="shoping__cart__item">
                          <img
                            src={item.book.smallimage}
                            alt={"no image found"}
                          />
                          <h5>{item.book.title}</h5>
                        </td>
                        <td className="shoping__cart__price">
                          ${item.book.price}
                        </td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={({ target }) =>
                                  handleQuantityChange(
                                    item,
                                    target.value >= 1 ? target.value : 1
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total">
                          ${(item.quantity * item.book.price).toFixed(2)}
                        </td>
                        <td className="shoping__cart__item__close">
                          <i
                            className="fa fa-times fa-lg cursor_pointer hover-red"
                            aria-hidden="true"
                            onClick={() => handleDelete(item)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  {shoppingCart.items && shoppingCart.items.length === 0 && (
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
                <form>
                  {" "}
                  <h5>Discount Codes</h5>
                  <input
                    type="text"
                    placeholder="Enter your coupon code"
                    value={0}
                    onChange={() => {}}
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
                  Total <span>${state.total && state.total.toFixed(2)}</span>
                </li>
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
