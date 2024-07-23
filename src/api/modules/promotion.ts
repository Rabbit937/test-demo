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
	ALIAS?: string;
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

export interface IQueryAccountListResultData {
	list: {
		/**
		 * @name 投放账户id
		 */
		ADVERTISER_ID: string;
		/**
		 * @name 投放账户
		 */
		ADVERTISER_MAJOR: string;
		/**
		 * @name 账户别名
		 */
		ALIAS: string;
		/**
		 * @name 创建时间
		 */
		ATIME: string;
		/**
		 * @name 公司
		 */
		COMPANY: string;
		/**
		 * @name 主体ID
		 */

		CPNID: string;

		/**
		 * @name 投放人员
		 */
		PITID: string;
	}[];
	page_info: {
		total: number;
		cur_page: number;
		page_limit: number;
		total_page: number;
	};
}

export const queryAccountList = (params: IQueryAccountList) => {
	return http.get<IQueryAccountListResultData>(
		"/api/Mk_Commonapi/_queryAccountList",
		params,
	);
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
	schedule_time?: string;
	schedule_date?: string[];
	start_time?: string;
	end_time?: string;
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
	advertiser_id?: number;
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

export const queryPreferenceList = (params?: IQueryPreferenceList) => {
	return http.get("/api/Mk_Tt_Preference/_queryPreferenceList", params);
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
// export interface IGetOptimizeGoal {
// 	ad_type: string;
// 	advertiser_id: string;
// 	asset_type: string;
// 	landing_type: string;
// }

export interface IGetOptimizeGoalResultData {
	optimization_name: string;
	external_action: string;
	deep_goals?: {
		deep_external_action: string;
		optimization_name: string;
	}[];
}

export const getOptimizeGoal = () => {
	return http.get<IGetOptimizeGoalResultData[]>(
		"/api/Mk_Tt_Tool/_getOptimizeGoal",
	);
};

/**
 * @name 查询可用深度优化方式
 */

export interface IGetDeepOptimizeType {
	advertiser_id: string;
	deep_external_action?: string;
	external_action?: string;
	delivery_mode: string;
	landing_type: string;
}

export const getDeepOptimizeType = (params: IGetDeepOptimizeType) => {
	return http.get<string[]>("/api/Mk_Tt_Tool/_getDeepOptimizeType", params);
};

/**
 * @name 查询抖音号
 */

export interface IQueryAwemeList {
	advertiser_id: string[];
}

export const queryAwemeList = (params: IQueryAwemeList) => {
	return http.get("/api/Mk_Tt_Tool/_queryAwemeList", params);
};

/**
 * @name 同步抖音号
 */
export interface ISyncAweme {
	advertiser_id: string[];
}

export const syncAweme = (params: ISyncAweme) => {
	return http.get("/api/Mk_Tt_Tool/_syncAweme", params);
};

/**
 * @name 查询橙子落地页
 */

export interface IQueryLandingPage {
	advertiser_id?: string;
	page_limit?: number;
}

export const queryLandingPage = (params: IQueryLandingPage) => {
	return http.get("/api/Mk_Tt_Assets/_queryLandingPage", params);
};

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
	return http.get("/api/Mk_Tt_Assets/_queryTitleBag", params);
};

/**
 * @name 获取素材设计者列表
 */

export const staffInfo = () => {
	return http.get("/api/Mk_Material/_staffInfo");
};

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

	/**
	 * 标题包分类名称，新建标题包必填
	 */
	category?: string;
}

export const createTitleBag = (params: ICreateTitleBag) => {
	return http.post("/api/Mk_Tt_Assets/_createTitleBag", params);
};

/**
 * @name 查询素材列表
 */

export interface IMatList {
	/**
	 * 专辑id
	 */
	album_id?: number;
	/**
	 * 类型1-视频2-图片
	 */
	category?: number;
	/**
	 * 时间范围
	 */
	create_date?: string;
	/**
	 * 文件夹id
	 */
	dir_id?: number;
	/**
	 * 搜索关键词
	 */
	keyword?: string;
	/**
	 * 1-ID2-名称
	 */
	search_type?: number;
	/**
	 * 是否停用1-是0-否
	 */
	status?: number;
	/**
	 * 分页
	 */
	page_limit?: number;
	cur_page?: number;
}

export const matList = (params: IMatList) => {
	return http.get("/api/Mk_Material/_matList", params);
};

/**
 * @name 上传素材到媒体
 */

export interface IUploadMaterial2Media {
	advertiser_id: string;
	/**
	 * 主体id必填
	 */
	cpnid: string;

	material_info: {
		/**
		 * 文件名
		 */
		filename: string;
		/**
		 * 本地素材id必填
		 */
		mat_id: string;
		/**
		 * 类型1-视频2-图片必填
		 */
		mime: string;
		/**
		 * 文件下载地址
		 */
		url?: string;
	}[];
}

export interface IUploadMaterial2MediaResultData {
	filename: string;
	id: string;
	jy_mat_id: string;
	material_id: number;
	mime: string;
	post_url: string;
	state: number;
}

export const uploadMaterial2Media = (params: IUploadMaterial2Media) => {
	return http.post<IUploadMaterial2MediaResultData>(
		"/api/Mk_Tt_Promotion/_uploadMaterial2Media",
		params,
	);
};

/**
 * @name 查询媒体信息
 */

export interface IQueryAccountKvList {
	/**
	 * 主体ID
	 */
	CPNID?: string;
	/**
	 * 必填
	 */
	PID: string;
}

export const queryAccountKvList = (params: IQueryAccountKvList) => {
	return http.get<{ id: string; text: string }[]>(
		"/api/Mk_Commonapi/_queryAccountKvList",
		params,
	);
};

/**
 * @name 查询主体信息
 */

export const queryCompanyInfo = () => {
	return http.get<{ id: string; text: string }[]>(
		"/api/Mk_Commonapi/_companyInfo",
	);
};

/**
 * @name 批量创建计划-新建项目
 */
export interface IBasicInformationOfAd {
	ad_download_status?: string;
	/**
	 *@name 原生锚点开关，选择了抖音号时必填，OFF/AUTO
	 */
	anchor_related_type?: "OFF" | "AUTO";
	aweme_info_group?: { advertiser_id?: string; aweme_id: string }[];
	product_info_group: {
		advertiser_id?: string;
		product_info: {
			titles: string[];
			image_ids: string[];
			selling_points: string[];
		};
	}[];

	call_to_action_buttons: string[];
	intelligent_generation?: string;
	is_comment_disable?: string;
	keywords?: string[];
	mini_program_info?: string;
	/**
	 * 试玩落地页
	 */
	playable_url_material_list?: string[];
	pre_promotion_budget_group: {
		advertiser_id?: string;
		budget?: string;
		cpa_bid?: string;
		deep_cpabid?: string;
		roi_goal?: string;
		union_bid_ratio?: string;
		bid?: string;
	}[];
	product_info_conf: "same" | "ad_same";
	promotion_aweme: "same" | "ad_same";
	promotion_name: string;
	promotion_operation: string;
	source?: string;
	web_url_material_list?: string[];
}

export interface INewProject {
	ad_type: string;
	app_name?: string;
	app_promotion_type?: string;
	app_type?: string;
	audience_extend?: string;
	bid_type: string;
	budget_mode?: string;
	budget_optimize_switch?: string;
	deep_bid_type?: string;
	external_action?: string;
	deep_external_action?: string;
	delivery_mode: string;
	delivery_type: string;
	download_mode?: string; // "DEFAULT"
	download_url?: string;
	end_time?: string;
	inventory_catalog: string;
	inventory_type?: string[];
	launch_type?: string;
	marketing_goal: string;
	landing_type: string;

	/**
	 * 字节小程序资产id，推广字节小程序必填
	 */
	micro_app_instance_id?: number;
	/**
	 * 小程序类型，小程序推广必填
	 */
	micro_promotion_type?: string;
	name: string;
	operation: string;
	pre_budget_group: {
		advertiser_id?: string;
		budget?: string;
		cpa_bid?: string;
		deep_cpabid?: string;
		roi_goal?: string;
		first_roi_goal?: string;
		bid?: string;
	}[];
	preference_group: { advertiser_id?: string; audience_package_id: string }[];
	pricing?: string;

	project_budget: "same" | "ad_same";
	project_preference: "same" | "ad_same";

	schedule_time?: string;
	schedule_type?: string;
	search_bid_ratio?: string;
	search_continue_delivery?: string;
	start_time?: string;

	subscribe_url?: string;
	track_url_setting?: string[];
	union_video_type?: string;
}

export interface ILandingPage {
	landing_page_conf: "same" | "ad_same";

	promotion_page_group: {
		advertiser_id?: string;
		landing_page: string[];
	}[];
}

export interface ICreativeMaterials {
	material: string;
	promotion_material_group: {
		advertiser_id?: string;
		video_material_list: {
			image_mode: string;
			video_id: string;
			jy_mat_id: string;
			material_id: string;
			video_cover_id: string;
			item_id: string;
			video_hp_visibility: string;
		}[];
		image_material_list: {
			image_mode: string;
			images: {
				image_id: string;
				jy_mat_id: string;
				material_id: string;
			};
		}[];
		carousel_material_list: {
			carousel_id: string;
			video_hp_visibility: string;
		}[];
	}[];
	// image_material_list: string,
	// carousel_material_list: string
}

export interface IRuleConfiguration {
	project: {
		rule: "manual" | "creative";
		num?: number;
	};
	promotion: {
		num?: number;
	};
}

export interface INewTargetingPackage {
	promotion_title_group: {
		advertiser_id?: string;
		title_material_list: { title: string }[];
	}[];

	title_conf: "same" | "ad_same" | "agv";
}

export interface ICreatePromotionByNewProject {
	/**
	 * 是否开启客户端下载，默认不开启
	 */
	ad_download_status?: string;
	/**
	 * 广告类型
	 */
	ad_type: string;
	/**
	 * 广告账户id，多个
	 */
	advertiser_id: string[];
	/**
	 * 原生锚点开关，选择了抖音号时必填，OFF/AUTO
	 */
	anchor_related_type?: string;
	/**
	 * 应用名称，app推广必填
	 */
	app_name?: string;
	/**
	 * 推广子目标，条件必填
	 */
	app_promotion_type?: string;
	/**
	 * 应用推广必填，用于选择定向包的参数
	 */
	app_type?: string;
	/**
	 * 搜索快投定向拓展
	 */
	audience_extend?: string;
	/**
	 * 是否开启智能拓流，广告搜索关键词和智能拓流至少开启一个
	 */
	// auto_extend_traffic?: string;
	/**
	 * [
	 * *      ['advertiser_id', 'aweme_id'],
	 * *      ['advertiser_id', 'aweme_id']
	 * * ]
	 */
	aweme_info_group?: string;
	/**
	 * 竞价策略，必填
	 */
	bid_type: string;
	/**
	 * 预算类型，不限或日预算
	 */
	budget_mode?: string;
	/**
	 * 预算择优分配
	 */
	budget_optimize_switch?: string;
	/**
	 * 行动号招，2-6个字最多10个
	 */
	call_to_action_buttons: string[];
	/**
	 * 深度优化方式
	 */
	deep_bid_type?: string;
	/**
	 * 深度转化目标
	 */
	deep_external_action?: string;
	/**
	 * 投放模式
	 */
	delivery_mode: string;
	/**
	 * 投放类型
	 */
	delivery_type: string;
	/**
	 * 默认不起用，下载模式
	 */
	download_mode?: string;
	/**
	 * 应用下载链接，app推广必填
	 */
	download_url?: string;
	/**
	 * 投放结束时间，当schedule_type=SCHEDULE_START_END必填
	 */
	end_time?: string;
	/**
	 * 优化目标，app推广必填
	 */
	external_action?: string;
	/**
	 * 智能生成行动号召按钮，默认OFF
	 */
	intelligent_generation?: string;
	/**
	 * 广告位
	 */
	inventory_catalog: string;
	/**
	 * 广告投放位置，当广告位为首选媒体时必填
	 */
	inventory_type?: string[];
	/**
	 * 是否开启评论，默认不开启
	 */
	is_comment_disable?: string;
	/**
	 * 搜索快投关键词设置，对象数组
	 */
	keywords?: string[];
	/**
	 * 落地页如何分配，same:统一分配，ad_same:按账号分配
	 */
	landing_page_conf: string;
	/**
	 * 推广目的
	 */
	landing_type: string;
	/**
	 * 调起方式，app推广子目的为LAUNCH是必填
	 */
	launch_type?: string;
	/**
	 * 营销场景
	 */
	marketing_goal: string;
	/**
	 * 创意组如何分配，same:统一分配，ad_same:按账号分配，agv:平均分配
	 */
	material: string;
	/**
	 * 字节小程序资产id，推广字节小程序必填
	 */
	micro_app_instance_id?: number;
	/**
	 * 小程序类型，小程序推广必填
	 */
	micro_promotion_type?: string;
	/**
	 * 对象，字节小程序信息
	 */
	mini_program_info?: string;
	/**
	 * 项目名称
	 */
	name: string;
	/**
	 * 项目状态
	 */
	operation: string;
	/**
	 * 试玩落地页
	 */
	playable_url_material_list?: string[];
	/**
	 * [
	 * ['advertiser_id', 'budget',
	 * 'cpa_bid','deep_cpabid','roi_goal','first_roi_goal','bid'],
	 * ['advertiser_id', 'budget','cpa_bid','deep_cpabid','roi_goal','first_roi_goal','bid']
	 * ]
	 */
	pre_budget_group: {
		advertiser_id?: string;
		budget?: string;
		cpa_bid?: string;
		deep_cpabid?: string;
		roi_goal?: string;
		first_roi_goal?: string;
		bid?: string;
	}[];
	/**
	 * [
	 * *      ['advertiser_id', 'budget',
	 * 'cpa_bid','deep_cpabid','roi_goal','union_bid_ratio','bid'],
	 * *      ['advertiser_id', 'budget',
	 * 'cpa_bid','deep_cpabid','roi_goal','union_bid_ratio','bid']
	 * * ]
	 */
	pre_promotion_budget_group: {
		advertiser_id?: string;
		budget?: string;
		cpa_bid?: string;
		deep_cpabid?: string;
		roi_goal?: string;
		union_bid_ratio?: string;
		bid?: string;
	}[];
	/**
	 * [
	 * {'advertiser_id', 'audience_package_id'},
	 * {'advertiser_id', 'audience_package_id'}
	 * ] 分账户定向包，当规则是分账户选择是，需要advertiser_id字段，其他规则不需要，以下均相同
	 */
	preference_group: { advertiser_id?: string; audience_package_id: string }[];
	/**
	 * 付费方式
	 */
	pricing?: string;
	/**
	 * 广告内分配产品规则，same:统一分配，ad_same:按账号分配
	 */
	product_info_conf: "same" | "ad_same";
	/**
	 * [
	 * *      ['advertiser_id', 'product_info'],
	 * *      ['advertiser_id', 'product_info']
	 * * ]
	 */
	product_info_group: string;
	/**
	 * 新建项目时的规则，rule可选值manual手动，creative根据创意组匹配，选manual时必须指定num数量
	 */
	project: string;
	/**
	 * 项目预算分配规则，same:统一分配，ad_same:按账号分配
	 */
	project_budget: string;
	/**
	 * 定向包分配规则，same:统一分配，ad_same:按账号分配
	 */
	project_preference: string;
	/**
	 * 请传示例值，表示自动匹配
	 */
	promotion: string;
	/**
	 * 广告内抖音号分配规则，same:统一分配，ad_same:按账号分配
	 */
	promotion_aweme?: string;
	/**
	 * 广告搜索关键词，对象数组
	 */
	/**
	 * [
	 * *      ['advertiser_id', 'video_material_list', 'image_material_list',
	 * 'carousel_material_list'],
	 * *      ['advertiser_id', 'video_material_list', 'image_material_list',
	 * 'carousel_material_list']
	 * *      video_material_list = ['image_mode', 'video_id', 'jy_mat_id', 'material_id'
	 * 'video_cover_id', 'item_id', 'video_hp_visibility']
	 * *      image_material_list = ['image_mode', 'images' => ['image_id',  'jy_mat_id',
	 * 'material_id']],
	 * *      carousel_material_list = ['carousel_id', 'video_hp_visibility']
	 * * ]
	 */
	promotion_material_group: string;
	/**
	 * 广告名称
	 */
	promotion_name: string;
	/**
	 * 广告状态
	 */
	promotion_operation: string;
	/**
	 * [
	 * *      ['advertiser_id', 'landing_page'],
	 * *      ['advertiser_id', 'landing_page']
	 * * ]
	 */
	promotion_page_group: string;
	/**
	 * [
	 * *      ['advertiser_id', 'title_material_list'],
	 * *      ['advertiser_id', 'title_material_list']
	 * *      title_material_list = ['title']
	 * * ]
	 */
	promotion_title_group: string;
	/**
	 * 投放时段，设置投放时间内的具体投放时间
	 */
	schedule_time?: string;
	/**
	 * 投放时间类型
	 */
	schedule_type?: string;
	/**
	 * 搜索快投出价系数，条件必填
	 */
	search_bid_ratio?: string;
	/**
	 * 续投，搜索周期广告必填
	 */
	search_continue_delivery?: string;
	/**
	 * 广告来源，推广小游戏时必填
	 */
	source?: string;
	/**
	 * 投放开始时间，当schedule_type=SCHEDULE_START_END必填
	 */
	start_time?: string;
	/**
	 * 预约下载链接，预约模式必填
	 */
	subscribe_url?: string;
	/**
	 * 标题包如何分配，same:统一分配，ad_same:按账号分配，agv:平均分配
	 */
	title_conf: string;
	/**
	 * 监测链接设置 ，调用接口自动返回
	 */
	track_url_setting?: string[];
	/**
	 * 首选媒体仅为穿山甲时，必填
	 */
	union_video_type?: string;
	/**
	 * 安卓下载详情页
	 */
	web_url_material_list?: string[];
}

export const createPromotionByNewProject = (
	params: ICreatePromotionByNewProject,
) => {
	return http.post("/api/Mk_Tt_Program/_createPromotionByNewProject", params);
};

/**
 * @name 查询ios应用信息
 */

export interface IQueryIosApplication {
	itunes_id: number;
}

export interface IQueryIosApplicationResultData {
	appstore_id: string;
	appstore_name: string;
	appstore_url: string;
	bundleid: string;
	download_url: string;
	icon: string;
}

export const queryIosApplication = (params: IQueryIosApplication) => {
	return http.get<IQueryIosApplicationResultData>(
		"/api/Mk_Tt_Tool/_queryIosApplication",
		params,
	);
};

/**
 * @name 创建定向包
 */

export interface ICreatePreference {
	/**
	 * 受众网络类型
	 */
	ac?: string[];
	/**
	 * 广告类型
	 */
	ad_type: string;
	/**
	 * 媒体账号id
	 */
	advertiser_id: string;
	/**
	 * 年龄
	 */
	age?: string[];
	/**
	 * 安卓版本
	 */
	android_osv?: string;
	/**
	 * 智能放量定向
	 */
	auto_extend_targets?: string[];
	/**
	 * 地域定向省市或者区县列表(当传递省份ID时,旗下市县ID可省略不传)，当district=REGION/OVERSEA时必填
	 */
	city?: string[];
	/**
	 * 投放范围
	 */
	delivery_range: string;
	/**
	 * 描述
	 */
	description: string;
	/**
	 * 地域类型
	 */
	district?: string;
	/**
	 * 性别
	 */
	gender?: string;
	/**
	 * 行为兴趣选择
	 */
	interest_action_mode?: string;
	/**
	 * 推广目的
	 */
	landing_type: string;
	/**
	 * 受众位置类型
	 */
	location_type?: string;
	/**
	 * 营销场景
	 */
	marketing_goal: string;
	/**
	 * 定向包名称
	 */
	name: string;
	/**
	 * 行政区域版本号，district =REGION/OVERSEA时必填
	 */
	region_version?: string;
	/**
	 * 媒体定向
	 */
	superior_popularity_type?: string;
}

export const createPreference = (params: ICreatePreference) => {
	return http.post("/api/Mk_Tt_Preference/_createPreference", params);
};


/**
 * @name 查询通用素材库-创建广告时
 */

export interface IQueryCommonMaterial {
	/**
	 * 专辑id
	 */
	album_id?: string;
	/**
	 * 素材类型1-视频2-图片
	 */
	category?: number;
	/**
	 * 创建时间
	 */
	create_date?: string;
	/**
	 * 文件夹id
	 */
	dir_id?: string;
	/**
	 * 头条拒绝次数
	 */
	ret_num?: number;
	/**
	 * 查询类别1，查id 2,查素材名称
	 */
	search_type?: string;
	/**
	 * 素材状态
	 */
	status?: string;
	/**
	 * 头条建议次数
	 */
	sug_num?: number;
	/**
	 * 素材版式1-横版2-竖版
	 */
	vert_hori?: number;
}

export const queryCommonMaterial = (params: IQueryCommonMaterial) => {
	return http.get(`/api/Mk_Tt_Promotion/_queryCommonMaterial`, params)
}


/**
 * @name 同步橙子落地页
 */

export interface ISyncLandingPage {
	advertiser_id: string;
}

export const syncLandingPage = (params: ISyncLandingPage) => {
	return http.get(`/api/Mk_Tt_Assets/_syncLandingPage`, params)
}
