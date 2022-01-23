import { getUsers, setUser } from "./userService";
import nextId from "react-id-generator";

const tokenKey = "user";

export function register(user) {
  //add user to the localstorage liste
  user._id = nextId();
  setUser(user);
  //add token to localstorage
  localStorage.setItem(
    tokenKey,
    JSON.stringify({ user: user._id, email: user.email })
  );
  return user;
}
export function logOut() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  const token = JSON.parse(localStorage.getItem(tokenKey));
  const users = getUsers();
  return token ? users.find((user) => user._id === token.user) : null;
}
export function login({ email, password }) {
  const user = getUsers().find((u) => u.email === email && u.password === password)
  if (user) {
    //add token to localstorage
    localStorage.setItem(
      tokenKey,
      JSON.stringify({ user: user._id, email: user.email })
    );
  }
  return user;
}
