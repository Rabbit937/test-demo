<template>
	<Dialog :visible="visible" :title="'新建头条定向包'" @handleClose="handleDialogClose">
		<el-scrollbar height="400px">
			<el-form :model="form" :label-position="'left'">
				<el-form-item :label-width="140" label="媒体账户">
					<el-select filterable v-model="form.advertiser_id" placeholder="请选择媒体账户" empty-text="没有数据"
						no-match-text="没有匹配数据">
						<el-option v-for="(item) in account_list_options" :key="item.ADVERTISER_ID"
							:value="item.ADVERTISER_ID" :label="`${item.ALIAS}(${item.ADVERTISER_ID})`">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item :label-width="140" label="定向包名称">
					<el-input v-model="form.name" placeholder="请输入定向包名称，最多40个字符" :maxlength="40"
						:show-word-limit="true" />
				</el-form-item>

				<el-form-item :label-width="140" label="定向包描述">
					<el-input v-model="form.description" placeholder="请输入定向包描述，最多100个字符" type="textarea"
						:maxlength="100" />
				</el-form-item>

				<el-form-item :label-width="140" label="定向包类型">
					<el-select v-model="form.landing_type" placeholder="请选择定向包类型">
						<el-option v-for="(item) in landing_type_options" :key="item.value" :value="item.value"
							:label="item.label"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item :label-width="140" label="广告类型">
					<el-radio-group v-model="form.ad_type">
						<el-radio-button v-for="(item) in ad_type_options" :value="item.value" :label="item.label" />
					</el-radio-group>
				</el-form-item>

				<el-form-item :label-width="140" label="营销场景">
					<el-radio-group v-model="form.marketing_goal">
						<el-radio-button v-for="(item) in marketing_goal_options" :value="item.value"
							:label="item.label" />
					</el-radio-group>
				</el-form-item>

				<el-form-item :label-width="140" label="投放范围">
					<el-radio-group v-model="form.delivery_range">
						<el-radio-button v-for="(item) in delivery_mode_options" :value="item.value"
							:label="item.label" />
					</el-radio-group>
				</el-form-item>

				<el-form-item :label-width="140" label="地域">
					<el-radio-group v-model="form.district">
						<el-radio-button v-for="(item) in district_options" :value="item.value" :label="item.label" />
					</el-radio-group>
				</el-form-item>

				<el-form-item :label-width="140" label="性别">
					<el-radio-group v-model="form.gender">
						<el-radio-button v-for="(item) in gender_options" :value="item.value" :label="item.label" />
					</el-radio-group>
				</el-form-item>

				<!-- <el-form-item :label-width="140" label="年龄">
					<el-radio-group v-model="form.age">
						<el-radio-button v-for="(item) in age_type_options" :value="item.value" :label="item.label" />
					</el-radio-group>
				</el-form-item> -->
				<!-- 原有分段 -->
				<!-- <el-form-item v-if="age_type === 1" :label-width="140" style="margin-top:0px;">
                    <el-input v-model="form.age" />
                </el-form-item> -->
				<!-- 更多分段 -->
				<!-- <el-form-item v-if="age_type === 2" :label-width="140" style="margin-top:0px;">
                    <el-input v-model="form.age" />
                </el-form-item> -->


				<!-- 
				<el-form-item :label-width="140" label="自定义人群">
					<el-radio-group v-model="form.custom_people">
						<el-radio-button v-for="(item) in custom_people_options" :value="item.value"
							:label="item.label" />
					</el-radio-group>
				</el-form-item> -->


				<el-form-item :label-width="140" label="行为兴趣">
					<el-radio-group v-model="form.interest_action_mode">
						<el-radio-button v-for="(item) in interest_action_mode_options" :value="item.value"
							:label="item.label" />
					</el-radio-group>
				</el-form-item>


				<el-form-item :label-width="140" label="媒体定向">
					<el-radio-group v-model="form.superior_popularity_type">
						<el-radio-button v-for="(item) in superior_popularity_type_options" :value="item.value"
							:label="item.label" />
					</el-radio-group>
				</el-form-item>

				<!-- <el-form-item :label-width="140" label="平台">
                    <el-radio-group v-model="form.platform">
                        <el-radio-button v-for="(item) in platform_options" :value="item.value" :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->
				<!-- 
                <el-form-item :label-width="140" label="设备类型">
                    <el-radio-group v-model="form.device_type">
                        <el-radio-button v-for="(item) in device_type_options" :value="item.value"
                            :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->

				<!-- <el-form-item :label-width="140" label="网络">
                    <el-radio-group v-model="form.ac">
                        <el-radio-button v-for="(item) in ac_options" :value="item.value" :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->


				<!-- <el-form-item :label-width="140" label="运营商">
                    <el-radio-group v-model="form.carrier">
                        <el-radio-button v-for="(item) in carrier_options" :value="item.value" :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->

				<!-- <el-form-item :label-width="140" label="已安装用户">
					<el-radio-group v-model="form.hide_if_exists">
						<el-radio-button v-for="(item) in hide_if_exists_options" :value="item.value"
							:label="item.label" />
					</el-radio-group>
				</el-form-item> -->

				<!-- <el-form-item :label-width="140" label="过滤已转化用户"> -->
				<!-- <el-radio-group v-model="form.hide_if_converted">
						<el-radio-button v-for="(item) in hide_if_converted_options" :value="item.value"
							:label="item.label" />
					</el-radio-group> -->
				<!-- </el-form-item> -->

				<!-- <el-form-item :label-width="140" label="安卓版本">
                    <el-radio-group v-model="form.android_osv">
                        <el-radio-button v-for="(item) in android_osv_options" :value="item.value"
                            :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->

				<!-- <el-form-item :label-width="140" label="手机品牌">
                    <el-radio-group v-model="form.device_brand">
                        <el-radio-button v-for="(item) in device_brand_options" :value="item.value"
                            :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->
				<!-- 
                <el-form-item :label-width="140" label="手机价格">
                    <el-radio-group v-model="form.launch_price">
                        <el-radio-button v-for="(item) in launch_price_options" :value="item.value"
                            :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->

				<!-- <el-form-item :label-width="140" label="智能放量">
                    <el-radio-group v-model="form.auto_extend_targets">
                        <el-radio-button v-for="(item) in auto_extend_targets_options" :value="item.value"
                            :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->

			</el-form>

		</el-scrollbar>
	</Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import Dialog from "@/components/Dialog.vue";
import { reactive } from "vue";
import {
	type ICreatePreference,
	createPreference,
	queryAccountList,
} from "@/api/modules/promotion";
import { ElMessage } from "element-plus";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);
const visible = ref(props.visible);

watchEffect(() => {
	visible.value = props.visible;
});

const handleDialogClose = (type: number) => {
	if (type === 1) {
		createPreferenceFunc(form);
	} else {
		emtis("handleClose", { type: 0 });
	}
};

// form
const form = reactive<ICreatePreference>({
	advertiser_id: "",
	name: "",
	description: "",
	landing_type: "",
	ad_type: "",
	marketing_goal: "VIDEO_AND_IMAGE",
	delivery_range: "DEFAULT",
	district: "",
	gender: "",
	// custom_people: "",
	interest_action_mode: "",
	superior_popularity_type: "",
	// platform: [],
	// device_type: [],
	// ac: [],
	// hide_if_exists: 0,
	// hide_if_converted: "AD",
	// android_osv: "NONE",
	// device_brand: ["VIVO", "OPPO"],
	// launch_price: [2000, 10000],
	// auto_extend_targets: ["AGE"],
	// age: ["AGE_BETWEEN_24_30", "AGE_BETWEEN_31_40"],
});

const account_list_options = ref();

// 查询账户媒体
const queryAccountListFunc = async () => {
	const res: any = await queryAccountList({ PID: "11", page_limit: 1000 });
	if (res.state === 1) {
		account_list_options.value = res.data.list;
	}
};

onMounted(() => {
	queryAccountListFunc();
});

// 定向包类型
const landing_type_options = [
	{
		value: "EXTERNAL",
		label: "落地页",
	},

	// {
	// 	value: "ARTICLE",
	// 	label: "文章推广",
	// },

	// {
	// 	value: "GOODS",
	// 	label: "商品推广",
	// },

	// {
	// 	value: "DPA",
	// 	label: "商品目录",
	// },

	// {
	// 	value: "STORE",
	// 	label: "门店推广",
	// },

	{
		value: "AWEME",
		label: "抖音号推广",
	},

	// {
	// 	value: "SHOP",
	// 	label: "店铺直投",
	// },

	{
		value: "APP_ANDROID",
		label: "应用下载-安卓",
	},

	{
		value: "APP_IOS",
		label: "应用下载-IOS",
	},
	// {
	// 	value: "LIVE",
	// 	label: "直播间推广",
	// },
	// {
	// 	value: "QUICK_APP",
	// 	label: "快应用",
	// },
	{
		value: "MICRO_GAME",
		label: "小游戏推广",
	},
];
// 广告类型
const ad_type_options = [
	{
		value: "ALL",
		label: "所有广告",
	},
	{
		value: "SEARCH",
		label: "搜索广告",
	},
];

// 营销场景
const marketing_goal_options = [
	{
		value: "VIDEO_AND_IMAGE",
		label: "短视频/图片",
	},
	{
		value: "LIVE",
		label: "直播",
	},
];
// 投放范围
const delivery_mode_options = [
	{
		value: "UNIVERSAL",
		label: "通投智选",
	},
	{
		value: "DEFAULT",
		label: "默认",
	},
	{
		value: "UNION",
		label: "穿山甲",
	},
];
// 地域
const district_options = [
	{
		value: "NONE",
		label: "不限",
	},
	{
		value: "BUSINESS_DISTRICT",
		label: "商圈",
	},
	{
		value: "REGION",
		label: "行政区域",
	},
	{
		value: "OVERSEA",
		label: "海外区域",
	},
];

// 性别
const gender_options = [
	{
		value: "NONE",
		label: "不限",
	},
	{
		value: "GENDER_MALE",
		label: "男",
	},
	{
		value: "GENDER_FEMALE",
		label: "女",
	},
];

// const age_type = ref(0)

// const age_type_options = [
// 	{
// 		label: "不限",
// 		value: 0,
// 	},
// 	{
// 		label: "原有分段",
// 		value: 1,
// 	},
// 	{
// 		label: "更多分段",
// 		value: 2,
// 	},
// ];

// const custom_people_options = [
// 	{
// 		label: "不限",
// 		value: 0,
// 	},
// 	{
// 		label: "同时定向排除",
// 		value: 1,
// 	},
// ];

const interest_action_mode_options = [
	{
		value: "UNLIMITED",
		label: "不限",
	},
	{
		value: "CUSTOM",
		label: "自定义",
	},
	{
		value: "RECOMMEND",
		label: "系统推荐",
	},
];

const superior_popularity_type_options = [
	{
		value: "NONE",
		label: "不限",
	},
	{
		value: "GAME",
		label: "游戏优质媒体",
	},
];

// const platform_options = [
// 	{
// 		value: "ANDROID",
// 		label: "android",
// 	},
// 	{
// 		value: "IOS",
// 		label: "iOS",
// 	},
// 	{
// 		value: "PC",
// 		label: "PC",
// 	},
// 	{
// 		value: "IPAD",
// 		label: "ipad",
// 	},
// 	{
// 		value: "WAP",
// 		label: "wap",
// 	},
// ];

// const device_type_options = [
// 	{
// 		value: "NONE",
// 		label: "不限",
// 	},
// 	{
// 		value: "MOBILE",
// 		label: "智能手机",
// 	},
// 	{
// 		value: "PAD",
// 		label: "平板",
// 	},
// ];

// const ac_options = [
// 	{
// 		value: "unknown",
// 		label: "不限",
// 	},
// 	{
// 		value: "WIFI",
// 		label: "wifi",
// 	},
// 	{
// 		value: "2G",
// 		label: "2G",
// 	},
// 	{
// 		value: "3G",
// 		label: "3G",
// 	},
// 	{
// 		value: "4G",
// 		label: "4G",
// 	},
// 	{
// 		value: "5G",
// 		label: "5G",
// 	},
// ];

// 运营商
/* const carrier_options = [
	{
		value: 'NONE',
		label: '不限'
	},
	{
		value: 'MOBILE',
		label: '移动'
	},
	{
		value: "UNICOM",
		label: '联通'
	},
	{
		value: 'TELCOM',
		label: '电信'
	}
] */

// const hide_if_exists_options = [
// 	{
// 		value: 0,
// 		label: "不限",
// 	},
// 	{
// 		value: 1,
// 		label: "过滤",
// 	},
// 	{
// 		value: 2,
// 		label: "定向",
// 	},
// ];

// const hide_if_converted_options = [
// 	{
// 		value: "NO_EXCLUDE",
// 		label: "不过滤",
// 	},
// 	{
// 		value: "AD",
// 		label: "广告计划",
// 	},
// 	{
// 		value: "CAMPAIGN",
// 		label: "广告组",
// 	},
// 	{
// 		value: "ADVERTISER",
// 		label: "广告账户",
// 	},
// 	{
// 		value: "APP",
// 		label: "APP",
// 	},
// 	{
// 		value: "CUSTOMER",
// 		label: "公司账户",
// 	},
// 	{
// 		value: "ORGANIZATION",
// 		label: "组织账户",
// 	},
// ];

// const android_osv_options = [
// 	{
// 		value: "0.0",
// 		label: "不限",
// 	},
// 	{
// 		value: "2.0",
// 		label: "Android 2.0",
// 	},

// 	{
// 		value: "2.0",
// 		label: "Android 2.0",
// 	},

// 	{
// 		value: "2.1",
// 		label: "Android 2.1",
// 	},
// 	{
// 		value: "2.2",
// 		label: "Android 2.2",
// 	},
// 	{
// 		value: "2.3",
// 		label: "Android 2.3",
// 	},
// 	{
// 		value: "3.1",
// 		label: "Android 3.1",
// 	},
// 	{
// 		value: "3.2",
// 		label: "Android 3.2",
// 	},
// 	{
// 		value: "4.0",
// 		label: "Android 4.0",
// 	},
// 	{
// 		value: "4.1",
// 		label: "Android 4.1",
// 	},
// 	{
// 		value: "4.2",
// 		label: "Android 4.2",
// 	},
// 	{
// 		value: "4.3",
// 		label: "Android 4.3",
// 	},
// 	{
// 		value: "4.4",
// 		label: "Android 4.4",
// 	},
// 	{
// 		value: "4.5",
// 		label: "Android 4.5",
// 	},
// 	{
// 		value: "5.0",
// 		label: "Android 5.0",
// 	},
// 	{
// 		value: "5.1",
// 		label: "Android 5.1",
// 	},
// 	{
// 		value: "6.0",
// 		label: "Android 6.0",
// 	},
// 	{
// 		value: "7.0",
// 		label: "Android 7.0",
// 	},
// 	{
// 		value: "7.1",
// 		label: "Android 7.1",
// 	},
// 	{
// 		value: "8.0",
// 		label: "Android 8.0",
// 	},
// 	{
// 		value: "8.1",
// 		label: "Android 8.1",
// 	},
// 	{
// 		value: "9.0",
// 		label: "Android 9.0",
// 	},
// 	{
// 		value: "10.0",
// 		label: "Android 10.0",
// 	},
// 	{
// 		value: "10.1",
// 		label: "Android 10.1",
// 	},
// 	{
// 		value: "11.0",
// 		label: "Android 11.0",
// 	},
// ];

// const device_brand_options = [
// 	{
// 		value: "HONOR",
// 		label: "荣耀",
// 	},
// 	{
// 		value: "APPLE",
// 		label: "苹果",
// 	},

// 	{
// 		value: "HUAWEI",
// 		label: "华为",
// 	},

// 	{
// 		value: "XIAOMI",
// 		label: "小米",
// 	},

// 	{
// 		value: "SAMSUNG",
// 		label: "三星",
// 	},

// 	{
// 		value: "OPPO",
// 		label: "OPPO",
// 	},

// 	{
// 		value: "VIVO",
// 		label: "VIVO",
// 	},

// 	{
// 		value: "MEIZU",
// 		label: "魅族",
// 	},

// 	{
// 		value: "GIONEE",
// 		label: "金立",
// 	},

// 	{
// 		value: "COOLPAD",
// 		label: "酷派",
// 	},

// 	{
// 		value: "LENOVO",
// 		label: "联想",
// 	},

// 	{
// 		value: "LETV",
// 		label: "乐视",
// 	},

// 	{
// 		value: "ZTE",
// 		label: "中兴",
// 	},

// 	{
// 		value: "CHINAMOBILE",
// 		label: "中国移动",
// 	},
// 	{
// 		value: "HTC",
// 		label: "HTC",
// 	},
// 	{
// 		value: "PEPPER",
// 		label: "小辣椒",
// 	},

// 	{
// 		value: "NUBIA",
// 		label: "努比亚",
// 	},

// 	{
// 		value: "HISENSE",
// 		label: "海信",
// 	},

// 	{
// 		value: "QIKU",
// 		label: "奇酷",
// 	},
// 	{
// 		value: "TCL",
// 		label: "TCL",
// 	},

// 	{
// 		value: "SONY",
// 		label: "索尼",
// 	},

// 	{
// 		value: "SMARTISAN",
// 		label: "锤子手机",
// 	},

// 	{
// 		value: "360",
// 		label: "360手机",
// 	},

// 	{
// 		value: "ONEPLUS",
// 		label: "一加手机",
// 	},
// 	{
// 		value: "LG",
// 		label: "LG",
// 	},

// 	{
// 		value: "MOTO",
// 		label: "摩托罗拉",
// 	},

// 	{
// 		value: "NOKIA",
// 		label: "诺基亚",
// 	},

// 	{
// 		value: "GOOGLE",
// 		label: "谷歌",
// 	},
// ];

// const launch_price_options = [
// 	{
// 		value: "NONE",
// 		label: "不限",
// 	},
// 	{
// 		value: "CUSTOM",
// 		label: "自定义",
// 	},
// ];

// const auto_extend_targets_options = [
// 	{
// 		value: "NONE",
// 		label: "不启用",
// 	},
// 	{
// 		value: "CUSTOM",
// 		label: "启用",
// 	},
// ];

const createPreferenceFunc = async (params: ICreatePreference) => {
	const res = await createPreference(params);
	if (res.state === 1) {
		emtis("handleClose", { type: 1, form: form });
	} else {
		ElMessage({
			message: res.msg,
			type: "error",
		});
	}
};
</script>
