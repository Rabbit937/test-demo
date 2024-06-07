import http from "@/api";
/**
 * @name 查询媒体帐号
 */
interface IGetAlbumList {
	PID: string;
	page_no: number;
	page_limit: number;
}

export const getAlbumList = (params: IGetAlbumList) => {
	return http.get("/api/Mk_Commonapi/_queryAccountList", params);
};


/**
 * @name 查询已创建项目 
 */

interface IQueryProjectList {
	advertiser_id: string;
	delivery_mode: string;
	landing_type: string;
	app_promotion_type: string;
	marketing_goal: string;
	name: string;
	page_no?: number,
	page_limit?: number,
}

export const queryProjectList = (params: IQueryProjectList) => {
	return http.get("/api/Mk_Tt_Project/_queryProjectList", params);
};