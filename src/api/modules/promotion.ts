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
