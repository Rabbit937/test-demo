// 首页路由
const homeRoute = {
	// 首页
	path: "home",
	component: () => import("@/views/home/index.vue"),
	name: "Home",
	meta: {
		title: "home",
		activeIndex: "/home",
	},
	children: [],
};

export default homeRoute;
