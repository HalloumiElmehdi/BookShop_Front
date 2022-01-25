import { getCurrentUserData } from "./userService";
import http from "./http";

//Services functions
export function getCartBooks() {
  return getCurrentUserData();
}

export function deleteOrderItem(id) {
  return http.delete(`/order-items/${id}`);
}

export function patchOrderItemQuantity(qte, id) {
  return http.patch(
    `/order-items/${id}`,
    { quantity: parseInt(qte) },
    {
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    }
  );
}
export function getShoppingCartCount() {
  try {
    //const { data } = getCartBooks();
    return 5; //data.cart.count;
  } catch (error) {
    return 0;
  }
}

export function getShoppingCartTotal() {
  try {
    //const { data } = getCartBooks();
    return 6; //data.cart.total;
  } catch (error) {
    return 0;
  }
}
