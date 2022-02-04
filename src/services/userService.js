import http from "./http";
import { getJwt } from "./authService";

export function getCurrentUserData() {
  return http.get("/profile", {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });
}
