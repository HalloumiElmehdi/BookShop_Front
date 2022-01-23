import http from "./http";

export function getBooks() {
  return http.get("books");
}
export function getBookById(id) {
  return http.get(`books/${id}`);
}
