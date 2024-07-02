import http from "@/api";
/**
 * @name 查询媒体帐号
 */
export interface IQueryAccountList {
	/**
	 * 投放账号id
	 */
	ADVERTISER_ID?: string;
	/**
	 * 账号别名
	 */
	ALIAS: string;
	/**
	 * 主体id
	 */
	CPNID?: string;
	/**
	 * 必填
	 */
	PID: string;
	/**
	 * 投放人员
	 */
	PITID?: string;
	page_no?: number;
	page_limit?: number;
}

export const queryAccountList = (params: IQueryAccountList) => {
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
	page_no?: number;
	page_limit?: number;
}

export const queryProjectList = (params: IQueryProjectList) => {
	return http.get("/api/Mk_Tt_Project/_queryProjectList", params);
};

/**
 * @name 创建项目
 */
export interface ICreateProject {
	ac: string[];
	ad_type: string;
	advertiser_id: number;
	age: string[];
	android_osv: string;
	app_name: string;
	app_promotion_type: string;
	asset_ids: number[];
	audience_extend?: string;
	auto_extend_targets: string[];
	bid_type: string;
	budget: string;
	budget_mode: string;
	deep_bid_type?: string;
	deep_cpabid?: string;
	deep_external_action?: string;
	delivery_mode: string;
	delivery_type: string;
	device_brand: string[];
	device_type: string[];
	district: string;
	download_mode: string;
	download_type: string;
	download_url: string;
	external_action: string;
	filter_aweme_abnormal_active?: string;
	filter_aweme_fans_count?: string;
	filter_own_aweme_fans?: string;
	gender: string;
	hide_if_converted: string;
	hide_if_exists: string;
	interest_action_mode: string;
	inventory_catalog: string;
	inventory_type: string[];
	keywords?: string;
	landing_type: string;
	marketing_goal: string;
	name: string;
	operation: string;
	platform: string[];
	pricing: string;
	schedule_type: string;
	superior_popularity_type: string;
	track_url_group_id: string;
	track_url_type: string;
	union_video_type: string;
	value_optimized_type: string;
	app_type: string;


	schedule_time?: string,
	schedule_date?: string[],
	start_time?: string,
	end_time?: string,
	budget_optimize_switch: string;
	budget_bidding_configuration_mode: string;
	search_bid_ratio: string;

}

export const createProject = (params: ICreateProject) => {
	return http.post("/api/Mk_Tt_Project/_createProject", params);
};

/**
 * @name 查询应用列表
 */

interface IQueryAndroidAppList {
	advertiser_id: string;
}

export const queryAndroidAppList = (params: IQueryAndroidAppList) => {
	return http.get("/api/Mk_Tt_Assets/_queryAndroidAppList", params);
};

/**
 * @name 查询头条监测链接
 */

export interface IQueryMonitorGroupList {
	advertiser_id: string;
	download_url: string;
}

export const queryMonitorGroupList = (params: IQueryMonitorGroupList) => {
	return http.get("/api/Mk_Tt_Assets/_queryMonitorGroupList", params);
};

export interface IQueryPreferenceList {
	/**
	 * 广告类型
	 */
	ad_type?: string;
	advertiser_id: number;
	/**
	 * 定向包id
	 */
	audience_package_id?: string;
	/**
	 * 广告投放范围
	 */
	delivery_range?: string;
	/**
	 * 推广类型
	 */
	landing_type?: string;
	/**
	 * 营销场景
	 */
	marketing_goal?: string;
	/**
	 * 定向包名称
	 */
	name?: string;

	/**
	 * 分页
	 */
	page_limit?: number;
	cur_page?: number;
}

export const queryPreferenceList = (params: IQueryPreferenceList) => {
	return http.get("/api/Mk_Tt_Preference/_queryPreferenceList", params);
};

/**
 * @name 创建定向包
 */

export interface ICreatePreference {
	ac: string[];
	ad_type: string;
	advertiser_id: string;
	age: string[];
	android_osv?: string;
	auto_extend_targets: string[];
	delivery_range: string;
	description: string;
	district: string;
	gender: string;
	interest_action_mode: string;
	landing_type: string;
	marketing_goal: string;
	name: string;
	superior_popularity_type: string;
}

export const createPreference = (params: ICreatePreference) => {
	return http.post("/api/Mk_Tt_Preference/_createPreference", params);
};

/**
 * @name 创建广告
 */
export interface ICreatePromotion {
	ad_download_status: string;
	advertiser_id: string;
	anchor_related_type: string;
	auth_type: string;
	aweme_id: string;
	budget: string;
	budget_mode: string;
	call_to_action_buttons: string[];
	cpa_bid: string;
	deep_cpabid: string;
	intelligent_generation: string;
	is_comment_disable: string;
	materials_type?: string;
	name: string;
	operation: string;
	product_info: string;
	project_id: string;
	text_abstract_list: string[];
	title_material_list: Record<string, string>[];
	video_material_list: string[];
	web_url_material_list: string[];
}
export const createPromotion = (params: ICreatePromotion) => {
	return http.post("/api/Mk_Tt_Promotion/_createPromotion", params);
};


/**
 * @name 查询可用优化目标
 */
export interface IGetOptimizeGoal {
	ad_type: string;
	advertiser_id: string;
	asset_type: string;
	landing_type: string;
}

export const getOptimizeGoal = (params: IGetOptimizeGoal) => {
	return http.get('/api/Mk_Tt_Tool/_getOptimizeGoal', params);
}


/**
 * @name 查询可用深度优化方式
 */

export interface IGetDeepOptimizeType {
	advertiser_id: string;
	deep_external_action?: string;
	delivery_mode: string;
	external_action: string;
	landing_type: string;
}

export const getDeepOptimizeType = (params: IGetDeepOptimizeType) => {
	return http.get('/api/Mk_Tt_Tool/_getDeepOptimizeType', params);
}

/**
 * @name 查询抖音号
 */

export interface IQueryAwemeList {
	advertiser_id: string;
}

export const queryAwemeList = (params: IQueryAwemeList) => {
	return http.get('/api/Mk_Tt_Tool/_queryAwemeList', params);
}

/**
 * @name 查询橙子落地页
 */

export interface IQueryLandingPage {
	advertiser_id: string;
	page_limit?: number;
}

export const queryLandingPage = (params: IQueryLandingPage) => {
	return http.get('/api/Mk_Tt_Assets/_queryLandingPage', params)
}


/**
 * @name 查询标题库
 */

export interface IQueryTitleBag {
	/**
	 * 1-标题包2-标题
	 */
	type: string;
	user_id?: string;
}



export const queryTitleBag = (params: IQueryTitleBag) => {
	return http.get('/api/Mk_Tt_Assets/_queryTitleBag', params)
}

/**
 * @name 获取素材设计者列表
 */


export const staffInfo = () => {
	return http.get('/api/Mk_Material/_staffInfo')
}


/**
 * @name 创建标题包
 */
export interface ICreateTitleBag {
	advertiser_id: string;
	/**
	 * 标题内容多个用\n换行隔开
	 */
	name: string;
	/**
	 * 标题包名称
	 */
	tag_name?: string;
	/**
	 * 类型1-标题包2-标题
	 */
	type: string;


	classification?: string;
}

export const createTitleBag = (params: ICreateTitleBag) => {
	return http.post('/api/Mk_Tt_Assets/_createTitleBag', params);
}