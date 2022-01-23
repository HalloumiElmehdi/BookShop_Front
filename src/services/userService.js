export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
export function setUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
