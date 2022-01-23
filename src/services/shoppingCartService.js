const shoppingCartKey = "shopping_Cart";

//Services functions
export function getCartBooks() {
  return JSON.parse(localStorage.getItem(shoppingCartKey)) || [];
}

export function updateCartBooks(Books) {
  localStorage.setItem(shoppingCartKey, JSON.stringify(Books));
}

export function getShoppingCartCount() {
  return getCartBooks().length;
}

export function getShoppingCartTotal() {
  return getCartBooks().reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
}

export function getShoppingCartSubTotal() {
  return getShoppingCartTotal() * 0.8;
}

export function emptyShoppingCart() {
  localStorage.removeItem(shoppingCartKey);
}
