// 推广路由
const promotionRoute = {
	path: "promotion",
	name: "promotion",
	redirect: "/promotion/ad/toutiaoupgrade",
	meta: {
		title: "promotion",
	},
	children: [
		// 广告管理
		{
			path: "ad",
			meta: {
				title: "promotion",
				name: "广告管理",
			},
			children: [
				{
					path: "toutiaoupgrade",
					meta: {
						title: "promotion",
						name: "巨量广告",
						activeIndex: "/promotion",
						index: "/promotion/ad/toutiaoupgrade",
					},
					component: () =>
						import("@/views/promotion/ad/toutiaoupgrade/index.vue"),
				},
			],
		},
	],
};

export default promotionRoute;
