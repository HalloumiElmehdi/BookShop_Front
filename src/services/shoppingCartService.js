const shoppingCartKey = "shopping_Cart";

//Services functions
export function getCartBooks() {
  return JSON.parse(localStorage.getItem(shoppingCartKey)) || [];
}

export function updateCartBooks(books) {
  localStorage.setItem(shoppingCartKey, JSON.stringify(books));
}

export function getShoppingCartCount() {
  return getCartBooks().length;
}

export function getShoppingCartTotal() {
  return getCartBooks().reduce(
    (acc, book) => acc + book.price * book.quantity,
    0
  );
}

export function getShoppingCartSubTotal() {
  return getShoppingCartTotal() * 0.8;
}

export function emptyShoppingCart() {
  localStorage.removeItem(shoppingCartKey);
}
