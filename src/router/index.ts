import { createRouter, createWebHashHistory } from "vue-router";

import homeRoute from "./routes/homeRoute";
import promotionRoute from "./routes/promotionRoute";
import materialRoute from "./routes/materialRoute";
import batchRoute from "./routes/batchRoute";
import taskRoute from "./routes/taskRoute";
import { useUserStore } from "@/stores/modules/user";
import NProgress from "@/config/nprogress";

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
			redirect: "/home",
			children: [
				...[homeRoute],
				...[promotionRoute],
				...[materialRoute],
				...[batchRoute],
				...[taskRoute]
			],
		},
	],
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();

	NProgress.start();

	const title = import.meta.env.VITE_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

	if (to.path.toLocaleLowerCase() === "/login") {
		if (userStore.token) return next(from.fullPath);
		return next();
	}

	if (!userStore.token) return next({ path: "/login", replace: true });

	next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
