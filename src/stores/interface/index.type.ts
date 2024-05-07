/* UserState */
export interface UserState {
	token: string;
	userInfo: {
		rname: string; // 角色名
		uname: string; // 用户名
		id: string; // 用户id
		frid: string; // 角色id
	};
}
