export function setToast(msg) {
  localStorage.setItem("toast", msg);
}

export function getToast() {
  return localStorage.getItem("toast");
}

export function deleteToast() {
  return localStorage.removeItem("toast");
}
