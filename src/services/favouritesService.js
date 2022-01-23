const favouritesCartKey = "favourites_Products";

//Services functions
export function getFavouritesBooks() {
  return JSON.parse(localStorage.getItem(favouritesCartKey)) || [];
}

export function updateFavouritesBooks(books) {
  localStorage.setItem(favouritesCartKey, JSON.stringify(books));
}

export function getFavouritesBooksCount() {
  return getFavouritesBooks().length;
}
