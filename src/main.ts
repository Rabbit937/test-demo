import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./stores";

import "./styles/main.css";

import "virtual:uno.css";
import "@unocss/reset/normalize.css";

import { setupElIcons } from "./plugins";

const app = createApp(App);

setupElIcons(app);

app.use(router).use(store).mount("#app");
