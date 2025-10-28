import api from "./api";

export const authService = {
  register(payload) {
    return api.post("/register", payload);
  },
  login(payload) {
    return api.post("/login", payload);
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
