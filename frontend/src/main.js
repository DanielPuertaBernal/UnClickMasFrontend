import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store/authStore";

import "bootstrap-icons/font/bootstrap-icons.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./styles/main.css";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
