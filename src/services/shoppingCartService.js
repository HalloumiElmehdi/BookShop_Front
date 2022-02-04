const shoppingCartKey = "shoppingCart";

//Services functions
export function getShopCart() {
  return JSON.parse(localStorage.getItem(shoppingCartKey)) || [];
}

export function updateShopCart(products) {
  localStorage.setItem(shoppingCartKey, JSON.stringify(products));
}

export function emptyShoppingCart() {
  localStorage.removeItem(shoppingCartKey);
}

export function getShopCartTotal() {
  let total = 0;
  getShopCart().items.forEach(
    (item) => (total += item.quantity * item.book.price)
  );
  return total;
}

export function getShopCartCount() {
  let count = 0;
  getShopCart().items.forEach((item) => (count += item.quantity));
  return count;
}

export function init() {
  localStorage.setItem(
    shoppingCartKey,
    JSON.stringify({
      items: [],
      total: 0,
    })
  );
}

export function exist() {
  return JSON.parse(localStorage.getItem(shoppingCartKey));
}
