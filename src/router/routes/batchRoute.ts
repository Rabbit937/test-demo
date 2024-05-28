// 首页路由
const batchRoute = {
	// 首页
	path: "batch",
	component: () =>
		import("@/views/promotion/ad/toutiao/smart-assistant/batch.vue"),
	name: "Batch",
	meta: {
		title: "智能投手",
	},
	children: [],
};

export default batchRoute;
