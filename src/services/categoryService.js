export function getCategories() {
  return JSON.parse(localStorage.getItem("categories")) || [];
}

export function getFeaturedCategories() {
  return [];
}
