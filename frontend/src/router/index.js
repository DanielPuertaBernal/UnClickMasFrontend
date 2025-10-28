import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import RankingView from "../views/RankingView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/home", component: HomeView, meta: { requiresAuth: true } },
  { path: "/ranking", component: RankingView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) next("/login");
  else next();
});

export default router;
