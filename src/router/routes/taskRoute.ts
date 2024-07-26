// 推广路由
const taskRoute = {
	path: "task",
	name: "task",
	redirect: "/task/index",
	meta: {
		title: "task",
	},
	children: [
		// 任务
		{
			path: "index",
			meta: {
				title: "task",
				name: "巨量新建任务(新版)",
				activeIndex: "/task",
				index: "/task/index",
			},
			component: () =>
				import("@/views/task/index.vue"),
		},
	],
};

export default taskRoute;
