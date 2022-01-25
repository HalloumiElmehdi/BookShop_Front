import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  deleteOrderItem,
  getCartBooks,
  getShoppingCartCount,
  getShoppingCartTotal,
  patchOrderItemQuantity,
} from "../services/shoppingCartService";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { submitShopCart, getCurrentUserOrder } from "../services/orderService";
import { getCurrentUserData } from "../services/userService";
import PreLoader from "./PreLoader";

export default function ShoppingCart() {
  const [shoppingCartItems, setshoppingCartItems] = useState([]);
  const [state, setState] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState({
    count: 0,
    total: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    async function fetchCartBook() {
      const { data } = await getCartBooks();
      setCart(data.cart);
      setState({
        shoppingCartCount: data.cart.count,
        shoppingCartTotal: data.cart.total,
      });
      setshoppingCartItems(data.cart.items || []);
    }
    fetchCartBook();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = async (item, value) => {
    try {
      setIsLoading(true);
      const items = [...shoppingCartItems];
      const index = items.findIndex((i) => i.id === item.id);
      item.quantity = value;
      items[index] = item;
      setshoppingCartItems(items);

      await patchOrderItemQuantity(value, item.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    //updateCartBooks(books);
  };
  const handleDelete = async (item) => {
    try {
      setIsLoading(true);
      const books = [...shoppingCartItems];
      const index = shoppingCartItems.findIndex(
        (i) => i.book.id === item.book.id
      );
      books.splice(index, 1);
      setshoppingCartItems(books);
      await deleteOrderItem(item.id);
      const { data } = await getCartBooks();
      setCart(data.cart);
      setState({
        shoppingCartCount: data.cart.count,
        shoppingCartTotal: data.cart.total,
      });
    } catch (ex) {
      console.log(ex);
    }
    toast.error("✕ deleted !");
    setIsLoading(false);
  };

  const handleShopCartSubmit = async () => {
    // const items = [];
    // shoppingCartItems.forEach((b) => {
    //   items.push({
    //     book: `/api/books/${b.id}`,
    //     quantity: parseInt(b.quantity),
    //   });
    // });
    // try {
    //   const { data: user } = await getCurrentUserData();
    //   if(user.cart)
    //   const found = cart.find((e) => e.status === "Cart");
    //   if (found) return;
    //   const { data } = await submitShopCart(items);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error.response);
    // }
  };

  return (
    <Fragment>
      {isLoading && <PreLoader />}
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__book">Books</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingCartItems &&
                      shoppingCartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="shoping__cart__item">
                            <Link to={`/shopping-details/${item.book.id}`}>
                              <img src={item.book.smallimage} alt="" />
                            </Link>

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
                                    handleChange(item, target.value)
                                  }
                                />
                              </div>
                            </div>
                          </td>
                          <td className="shoping__cart__total">
                            ${item.total}
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
                    {shoppingCartItems.length === 0 && (
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
                      readOnly
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
                    Total <span>${cart.total.toFixed(2)}</span>
                  </li>
                </ul>
                <Link
                  to="/checkout"
                  className="primary-btn"
                  onClick={() => handleShopCartSubmit()}
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
