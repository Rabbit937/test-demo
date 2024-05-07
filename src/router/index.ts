import { createRouter, createWebHashHistory } from "vue-router";

import homeRoute from "./routes/homeRoute";
import promotionRoute from "./routes/promotionRoute";
import materialRoute from "./routes/materialRoute";

export const Layout = () => import("@/layouts/index.vue");

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "Login",
			component: () => import("@/views/login/index.vue"),
		},
		{
			path: "/",
			component: Layout,
			redirect: "/promotion",
			children: [...[homeRoute], ...[promotionRoute], ...[materialRoute]],
		},
	],
});

export default router;
