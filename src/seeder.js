import categories from "./data/categories";
import users from "./data/users";

export function seed() {
  localStorage.clear();
  localStorage.setItem("load", new Date());
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("categories", JSON.stringify(categories));
}
