// 素材路由
const materialRoute = {
	path: "material",
	name: "Material",
	redirect: "/material/material",
	children: [
		// 本地素材
		{
			path: "material",
			name: "Material",
			component: () => import("@/views/material/material/index.vue"),
			meta: {
				title: "material",
				name: "本地素材",
				activeIndex: "/material",
				index: "/material/material",
			},
		},
	],
};

export default materialRoute;
