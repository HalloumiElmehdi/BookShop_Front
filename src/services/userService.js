import http from "./http";

export function getCurrentUserData() {
  return http.get("/profile");
}
