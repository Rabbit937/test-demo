import { defineStore } from "pinia";
import type { UserState } from "../interface/index.type";
// import piniaPersistConfig from "../helper/persist";

export const useMaterialStore = defineStore({
	id: "gg-material",
	state: (): UserState => ({
		token: "",
		userInfo: {
			rname: "", // 角色名
			uname: "", // 用户名
			id: "", // 用户id
			frid: "", // 角色id
		},
	}),
	getters: {},
	actions: {},
});
