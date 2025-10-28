import { createPinia, defineStore } from "pinia";
import { useRouter } from "vue-router";

export const pinia = createPinia();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch (e) {
        return null;
      }
    })()
  }),

  actions: {
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    validateAuth() {
      const router = useRouter();

      if (
        !this.token ||
        !this.user ||
        typeof this.user !== "object" ||
        Object.keys(this.user).length === 0
      ) {
        console.warn("Sesión inválida o expirada, limpiando datos...");
        this.clearAuth();
        router.push("/login");
      }
    }
  }
});
