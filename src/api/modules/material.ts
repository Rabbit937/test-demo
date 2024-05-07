import http from "@/api";

/**
 * @name 获取专辑文件夹树
 */
export const getAlbumTree = () => {
	return http.get(`/api/Mk_Album/_albumTree`);
};

/**
 * @name 专辑管理搜索
 */
export const getAlbumList = (params: any) => {
	return http.get(`/api/Mk_Album/_albumList`, params);
};

/**
 * @name 新建专辑
 */
export const createAlbum = (params: any) => {
	return http.post(`/api/Mk_Album/_albumAdd`, params);
};

/**
 * @name 修改专辑或文件夹
 */
export const updateAlbumOrFolder = (params: any) => {
	return http.post(`/api/Mk_Album/_albumUpdate`, params);
};

/**
 * @name 删除专辑或文件夹
 */
export const deleteAlbumOrFolder = (params: any) => {
	return http.post(`/api/Mk_Album/_albumDel`, params);
};

/**
 * @name 新建文件夹
 */
export const createFolder = (params: any) => {
	return http.post(`/api/Mk_Album/_dirAdd`, params);
};

/**
 * @name 移动文件夹
 */

interface IMoveFolder {
	dir_id: number;
	dir_pid?: string;
	des_al_name?: string;
	des_al_id: number;
}

export const moveFolder = (params: IMoveFolder) => {
	return http.post(`/api/Mk_Album/_dirMove`, params);
};

/**
 * @name 上传素材
 */

export const uploadMaterial = (params: any) => {
	return http.post(`/api/Mk_Material/_uploadMat`, params, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

/**
 * @name 获取素材管理素材
 */

interface IMaterialListProps {
	search_type?: string;
	keyword?: string;
	create_date?: string;
	dir_id?: string;
	album_id?: string;
	status?: number; // 是否停用
	category?: number; // 1. 视频 2. 图片
	page_no?: string;
	page_limit?: string;
}

export const getMaterialList = (parmas?: IMaterialListProps) => {
	return http.get(`/api/Mk_Material/_matList`, parmas);
};

interface IDeleteMaterial {
	mat_id: string;
}

export const deleteMaterial = (params: IDeleteMaterial) => {
	return http.post(`/api/Mk_Material/_delMat`, params);
};

// 获取素材设计者列表
export const getMaterialDesignList = () => {
	return http.get(`/api/Mk_Material/_staffInfo`);
};

/**
 * @name 移动素材
 */

interface IMoveMaterial {
	mat_id: number;
	dir_id: number;
	album_id: number;
	relative_dir_id: string[];
}

export const moveMaterial = (params: IMoveMaterial) => {
	return http.post(`/api/Mk_Material/_moveMat`, params);
};

/**
 * @name 编辑素材
 */

interface IUpdateMaterial {
	mat_id: number;
	mat_name?: string;
	tag_id?: string[];
	sort?: number;
	note?: string;
}

export const updateMaterial = (params: IUpdateMaterial) => {
	return http.post(`/api/Mk_Material/_updateMat`, params);
};

interface IDeactivateTheMaterial {
	mat_id: number;
	type: number;
}

export const disableMaterial = (params: IDeactivateTheMaterial) => {
	return http.post(`/api/Mk_Material/_disableMat`, params);
};

interface IGetTagsList {
	type: number;
}

export const getTagsList = (params: IGetTagsList) => {
	return http.get(`/api/Mk_Tag/_getList`, params);
};

/**
 * @name 新建标签组
 */

export const addTagGroup = (params: { name: string }) => {
	http.post(`/api/Mk_Tag/_addGroup`, params);
};

/**
 * @name 新建标签
 */

export const addTag = (params: { pid: number; name: string }) => {
	http.post(`/api/Mk_Tag/_add`, params);
};

interface ITagOperate {
	tag_id: string[];
	type: string;
	mat_id?: string;
}

export const operateTag = (params: ITagOperate) => {
	return http.post(`/api/Mk_Tag/_operate`, params);
};
