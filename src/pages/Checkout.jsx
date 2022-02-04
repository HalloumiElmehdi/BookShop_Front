import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Form from "../components/common/form";
import Joi from "joi-browser";
import Input from "../components/common/simpleinput";
import Checkbox from "../components/common/check";
import auth from "../services/authService";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { setToast } from "../utils/toasts";
import { refresh } from "../utils/refresh";
import { getShopCart, getShopCartTotal } from "../services/shoppingCartService";
import {
  placeOrder,
  submitShopCartWithRegister,
} from "../services/orderService";
import { getCurrentUserData } from "../services/userService";

export default class Checkout extends Form {
  static contextType = AppContext;

  //#region  state and schema
  state = {
    user: null,
    shoppingCart: getShopCart(),
    data: {
      firstname: "",
      lastname: "",
      country: "",
      address: "",
      city: "",
      postalcode: "",
      phone: "",
      email: "",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      cvv: "",
      password: "",
      orderNotes: "",
    },
    errors: {},
    idles: {
      firstname: null,
      lastname: null,
      country: null,
      address: null,
      city: null,
      postalcode: null,
      phone: null,
      email: null,
      password: null,
      orderNotes: null,
    },
    cartBooks: [],
    createAccount: false,
    isloading: false,
    total: getShopCartTotal(),
  };

  schema = {
    firstname: Joi.string().min(5).max(50).required().label("First Name"),
    lastname: Joi.string().min(5).max(50).required().label("Last Name"),
    country: Joi.string().min(3).max(50).required().label("Country"),
    address: Joi.string().max(50).required().label("Address"),
    city: Joi.string().min(3).max(50).required().label("City"),
    postalcode: Joi.number().required().label("postalcode"),
    phone: Joi.number().required().label("Phone"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.any(),
    orderNotes: Joi.string().min(8).max(40).required().label("Order Notes"),
    cardNumber: Joi.string().min(14).max(14).required().label("Card Number"),
    expireMonth: Joi.number().min(1).max(12).required().label("Expire Month"),
    expireYear: Joi.string().min(4).max(4).required().label("Year"),
    cvv: Joi.string().min(3).max(3).required().label("cvv"),
  };

  //#endregion

  fetchCurrentUserData = async () => {
    try {
      const { data: user } = await getCurrentUserData();
      if (user) {
        this.setState({ user });
        const { firstname: firstname, lastname: lastname, email } = user;
        const { city, country, postalcode, adressline1, adressline2, phone } =
          user.userAddresses[0];

        const data = {
          firstname,
          lastname,
          country,
          address: `${adressline1} ${adressline2}`,
          city,
          postalcode,
          phone,
          email,
          cardNumber: "",
          expireMonth: "",
          expireYear: "",
          cvv: "",
          password: "",
          orderNotes: "",
        };

        this.setState({ data });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  componentDidMount() {
    this.fetchCurrentUserData();
  }

  doSubmit = async () => {
    if (!this.state.user) {
      try {
        this.setState({ isloading: true });
        const { data: response } = await submitShopCartWithRegister(
          this.state.shoppingCart.items,
          this.state.data
        );

        console.log("reponse: ", response);
        const { email, password } = this.state.data;
        await auth.login({ username: email, password });
        const { data } = await placeOrder(response.cart.id);

        setToast("☑ success");
        refresh("/");

        this.setState({ isloading: false });
      } catch (error) {
        this.setState({ isloading: false });
        console.log(error);
      }
    } else {
      try {
        this.setState({ isloading: true });
      } catch (error) {}
    }
  };

  handleCheckChange = ({ target }) => {
    const { checked } = target;
    if (checked) {
      this.schema.password = Joi.string()
        .min(8)
        .max(40)
        .required()
        .label("password");
    } else {
      this.schema.password = Joi.any();
      const { data, errors, idles } = this.state;
      data.password = "";
      delete errors.password;
      idles.password = null;
      this.setState({ data, errors, idles });
    }

    this.setState({ createAccount: checked });
  };

  render() {
    const {
      data,
      errors,
      idles,
      shoppingCart,
      total,
      createAccount,
      user,
      isloading,
    } = this.state;

    return (
      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>
                <span>
                  {" "}
                  Have a coupon? <Link to="/shopping-cart">Click here</Link> to
                  enter your code
                </span>
              </h6>
            </div>
          </div>
          <div className="checkout__form">
            <form onSubmit={this.handleSubmit}>
              <h4>Billing Details</h4>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-6">
                      <Input
                        name="firstname"
                        type="text"
                        label="First Name"
                        value={data.firstname}
                        onChange={this.handleChange}
                        error={errors.firstname}
                        isIdle={idles.firstname}
                        disabled={true && user}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        name="lastname"
                        type="text"
                        label="Last Name"
                        value={data.lastname}
                        onChange={this.handleChange}
                        error={errors.lastname}
                        isIdle={idles.lastname}
                        disabled={true && user}
                      />
                    </div>
                  </div>

                  <Input
                    name="country"
                    label="Country"
                    value={data.country}
                    error={errors.country}
                    type="text"
                    isIdle={idles.country}
                    onChange={this.handleChange}
                    disabled={true && user}
                  />
                  <Input
                    name="city"
                    label="City"
                    value={data.city}
                    error={errors.city}
                    isIdle={idles.city}
                    onChange={this.handleChange}
                    disabled={true && user}
                  />
                  <Input
                    name="address"
                    type="text"
                    label="Address"
                    value={data.address}
                    onChange={this.handleChange}
                    error={errors.address}
                    isIdle={idles.address}
                  />
                  <Input
                    name="postalcode"
                    type="text"
                    label="Postcode / ZIP"
                    value={data.postalcode}
                    onChange={this.handleChange}
                    error={errors.postalcode}
                    isIdle={idles.postalcode}
                  />
                  <div className="row">
                    <div className="col-lg-6">
                      <Input
                        name="phone"
                        type="number"
                        label="Phone"
                        value={data.phone}
                        onChange={this.handleChange}
                        error={errors.phone}
                        isIdle={idles.phone}
                        disabled={true && user}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        name="email"
                        type="email"
                        label="Email"
                        value={data.email}
                        onChange={this.handleChange}
                        error={errors.email}
                        isIdle={idles.email}
                        disabled={true && user}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <Input
                        name="cardNumber"
                        type="number"
                        label="Card Number"
                        value={data.cardNumber}
                        onChange={this.handleChange}
                        error={errors.cardNumber}
                        isIdle={idles.cardNumber}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Input
                        name="expireMonth"
                        type="number"
                        label="Month"
                        value={data.expireMonth}
                        onChange={this.handleChange}
                        error={errors.expireMonth}
                        isIdle={idles.expireMonth}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Input
                        name="expireYear"
                        type="number"
                        label="Year"
                        value={data.expireYear}
                        onChange={this.handleChange}
                        error={errors.expireYear}
                        isIdle={idles.expireYear}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Input
                        name="cvv"
                        type="number"
                        label="CVV"
                        value={data.cvv}
                        onChange={this.handleChange}
                        error={errors.cvv}
                        isIdle={idles.cvv}
                      />
                    </div>
                  </div>
                  {!user && (
                    <Fragment>
                      <Checkbox
                        label="Create an account?"
                        name="createAccount"
                        checked={createAccount}
                        id="createAccount1"
                        onChange={this.handleCheckChange}
                      />
                      <p>
                        Create an account by entering the information below. If
                        you are a returning customer please login at the top of
                        the page
                      </p>

                      <Input
                        name="password"
                        type="password"
                        label="Account Password"
                        value={data.password}
                        onChange={this.handleChange}
                        error={errors.password}
                        isIdle={idles.password}
                        disabled={!createAccount}
                      />
                    </Fragment>
                  )}
                  <Input
                    name="orderNotes"
                    type="text"
                    label="Order notes"
                    value={data.orderNotes}
                    onChange={this.handleChange}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    error={errors.orderNotes}
                    isIdle={idles.orderNotes}
                  />
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Your Order</h4>
                    <div className="checkout__order__Books">
                      Books <span>Total</span>
                    </div>
                    <ul>
                      {shoppingCart.items.map((item) => (
                        <li key={item.book.id}>
                          {item.book.title}{" "}
                          <span>${item.book.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="checkout__order__total">
                      Total <span>${total.toFixed(2)}</span>
                    </div>
                    {!user && (
                      <Fragment>
                        <Checkbox
                          label="Create an account?"
                          name="createAccount"
                          checked={createAccount}
                          id="createAccount"
                          onChange={this.handleCheckChange}
                          className="cursor_pointer"
                        />
                        <p>
                          Create an account to take advantage of our latest
                          discounts and gain store credit and more.
                        </p>
                      </Fragment>
                    )}
                    <button
                      className={"site-btn"}
                      disabled={this.validate() || isloading}
                    >
                      {isloading ? (
                        <i className="fa fa-spinner fa-pulse"></i>
                      ) : (
                        "PLACE ORDER"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
