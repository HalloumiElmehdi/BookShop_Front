import http from "./http";

export function submitShopCart(items) {
  return http.post("/orders", { items: [...items] });
}

export function deleteBookFromCart() {
  return http.patch("/order-items", {});
}
