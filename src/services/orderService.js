import http from "./http";
import { getJwt } from "./authService";

export function submitShopCart(items) {
  return http.post("/orders", items);
}

export function submitShopCartLoggedIn(items) {
  return http.post("/orders");
}

export function submitShopCartWithRegister(
  items,
  {
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    country,
    phone,
    postalcode,
  }
) {
  const order = [];
  items.forEach((item) => {
    order.push({
      book: `/api/books/${item.book.id}`,
      quantity: item.quantity,
    });
  });

  return http.post("/register", {
    firstname,
    lastname,
    email,
    password,
    userAddresses: [
      {
        adressline1: address,
        adressline2: address,
        city,
        postalcode,
        country,
        phone,
      },
    ],
    orders: [
      {
        items: [...order],
      },
    ],
  });
}

export function placeOrder(id) {
  console.log("id: ", id);
  return http.post(
    `/orders/${id}/place`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    }
  );
}
