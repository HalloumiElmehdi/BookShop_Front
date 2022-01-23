import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Form from "../components/common/form";
import {
  getCartBooks,
  emptyShoppingCart,
} from "../services/shoppingCartService";
import Joi from "joi-browser";
import Input from "../components/common/simpleinput";
import Checkbox from "../components/common/check";
import auth from "../services/authService";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import sendEmail from "../services/emailService";

import { setToast } from "../utils/toasts";
import { refresh } from "../utils/refresh";

export default class Checkout extends Form {
  static contextType = AppContext;

  state = {
    userLocal: null,
    data: {
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      city: "",
      zipCode: "",
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
      firstName: null,
      lastName: null,
      country: null,
      address: null,
      city: null,
      zipCode: null,
      phone: null,
      email: null,
      password: null,
      orderNotes: null,
    },
    cartBooks: getCartBooks(),
    total: this.context[0].shoppingCartTotal,
    createAccount: false,
    isloading: false,
  };

  schema = {
    firstName: Joi.string().min(5).max(50).required().label("First Name"),
    lastName: Joi.string().min(5).max(50).required().label("Last Name"),
    country: Joi.string().min(3).max(50).required().label("Country"),
    address: Joi.string().max(50).required().label("Address"),
    city: Joi.string().min(3).max(50).required().label("City"),
    zipCode: Joi.number().required().label("ZipCode"),
    phone: Joi.number().required().label("Phone"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.any(),
    orderNotes: Joi.string().min(10).max(40).required().label("Order Notes"),
    cardNumber: Joi.string().min(14).max(14).required().label("Card Number"),
    expireMonth: Joi.number().min(1).max(12).required().label("Expire Month"),
    expireYear: Joi.string().min(4).max(4).required().label("Year"),
    cvv: Joi.string().min(3).max(3).required().label("cvv"),
  };

  componentDidMount() {
    const userLocal = this.context[0].user;
    if (userLocal) {
      this.setState({ userLocal });
      const user = auth.getCurrentUser();
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        address: user.address,
        city: user.city,
        zipCode: user.zipCode,
        phone: user.phone,
        email: user.email,
      };
      this.setState({ data });
    }
  }

  doSubmit = async () => {
    this.setState({ isloading: true });
    if (this.state.cartBooks.length > 0) {
      !this.state.userLocal && auth.register(this.state.data);
      try {
        const { data, cartBooks, total } = this.state;
        const { data: response } = await sendEmail({
          to: data.email,
          clientName: `${data.firstName} ${data.lastName}`,
          clientPhone: data.phone,
          clientAddress: data.address,
          Books: cartBooks,
          total: total,
          orderNotes: data.orderNotes,
        });
        emptyShoppingCart();
        setToast(
          `'${response}' Purchase confirmed ! verify your inbox for invoice details`
        );
        refresh("/");
      } catch (error) {
        if (error && error.response.status === 500) {
          toast("Something went wrong !");
          this.setState({ isloading: false });
        }
      }
    } else {
      toast("You cant checkout an empty cart");
      this.setState({ isloading: false });
    }
  };

  handleCheckChange = ({ target }) => {
    const { checked } = target;
    if (checked) {
      this.schema.password = Joi.string()
        .min(10)
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
      cartBooks,
      total,
      createAccount,
      userLocal,
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
                        name="firstName"
                        type="text"
                        label="First Name"
                        value={data.firstName}
                        onChange={this.handleChange}
                        error={errors.firstName}
                        isIdle={idles.firstName}
                        disabled={true && userLocal}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Input
                        name="lastName"
                        type="text"
                        label="Last Name"
                        value={data.lastName}
                        onChange={this.handleChange}
                        error={errors.lastName}
                        isIdle={idles.lastName}
                        disabled={true && userLocal}
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
                  />
                  <Input
                    name="city"
                    label="City"
                    value={data.city}
                    error={errors.city}
                    isIdle={idles.city}
                    onChange={this.handleChange}
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
                    name="zipCode"
                    type="number"
                    label="Postcode / ZIP"
                    value={data.zipCode}
                    onChange={this.handleChange}
                    error={errors.zipCode}
                    isIdle={idles.zipCode}
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
                        disabled={true && userLocal}
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
                  {!userLocal && (
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
                      {cartBooks.map((book) => (
                        <li key={book.id}>
                          {book.title}{" "}
                          <span>${book.price * book.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="checkout__order__total">
                      Total <span>${total.toFixed(2)}</span>
                    </div>
                    {!userLocal && (
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
