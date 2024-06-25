<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <el-scrollbar style="height: calc(100vh - 140px)">
            <main class="m-16px pl-16px pr-16px">
                <!-- 推广目的 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">推广目的</el-col>
                    <el-col class="p-16px mb-8px">
                        <el-form class="flex flex-wrap">
                            <el-form-item v-for="item in boxCardItem" :key="item.id"
                                @click="handleBoxCardItem(item.id)">
                                <div class="flex w-208px p-16px pt-12px pb-24px mr-16px cursor-pointer"
                                    style="border: 1px solid #e8eaec; border-radius: 3px"
                                    :style="item.active === true ? { borderColor: '#197afb' } : ''">
                                    <div>
                                        <div>{{ item.title }}</div>
                                        <div class="w-110px line-height-18px h-30px  color-[#999] font-size-12px">
                                            {{ item.content }}
                                        </div>
                                    </div>
                                    <div>
                                        <img class="w-48px h-48px" style="transform: translate(16px, 16px)"
                                            src="https://cl.mobgi.com//img/application.565e6114.png" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <el-col class="pl-16px pr-16px mb-24px">
                        <el-radio-group v-model="globalState.app_promotion_type">
                            <el-radio-button v-for="(item) in app_promotion_type_radio" :value="item.value">
                                {{ item.label }}
                            </el-radio-button>
                        </el-radio-group>
                        <div>
                            <el-text size="small" class="line-height-24px color-[#999]">吸引用户下载并安装您的应用程序</el-text>
                        </div>
                    </el-col>

                    <el-col class="pl-16px pr-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="投放模式">
                                <el-radio-group v-model="globalState.delivery_mode">
                                    <el-radio-button v-for="(item) in delivery_mode_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="营销场景">
                                <el-radio-group v-model="globalState.marketing_goal">
                                    <el-radio-button v-for="(item) in marketing_goal_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="广告类型">
                                <el-radio-group v-model="globalState.ad_type">
                                    <el-radio-button v-for="(item) in ad_type_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="投放类型">
                                <el-radio-group v-model="globalState.delivery_type">
                                    <el-radio-button :value="'NORMAL'"> 常规投放 </el-radio-button>
                                    <el-popover placement="right-start" :width="200" trigger="hover"
                                        content="媒体API暂不支持通投广告搭建周期稳投">
                                        <template #reference>
                                            <el-radio-button :value="'DURATION'" disabled> 周期稳投 </el-radio-button>
                                        </template>
                                    </el-popover>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 投放内容与目标 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放内容与目标</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="平台类型">
                                <el-radio-group v-model="globalState.platform_type">
                                    <el-radio-button v-for="(item) in platform_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.value }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="头条应用" v-if="globalState.platform_type === 'Android'">
                                <el-select-v2 v-model="globalState.app_name" :options="headline_application_options"
                                    placeholder="请选择" style="width: 300px" />
                            </el-form-item>
                            <el-form-item label="应用名称">
                                <el-input style="width: 300px" placeholder="请输入应用名称" v-model="globalState.app_name" />
                            </el-form-item>

                            <el-form-item label="检测链接来源">
                                <el-radio-group v-model="globalState.detect_link_source">
                                    <el-radio-button :value="1"> 巨量后台检测链接组 </el-radio-button>
                                    <el-radio-button :value="2"> 创量导入检测活动 </el-radio-button>
                                    <el-radio-button :value="3"> 手动输入 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="选择链接组">
                                <el-button type="primary" :disabled="globalState.app_name ? false : true"
                                    @click="selectConnectionGroup">选择链接组</el-button>
                            </el-form-item>

                            <el-form-item label="下载方式">
                                <el-radio-group v-model="globalState.download_type">
                                    <el-radio-button v-for="(item) in download_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="优先应用商店下载">
                                <el-radio-group v-model="globalState.download_mode">
                                    <el-radio-button value="APP_STORE_DELIVERY">启用</el-radio-button>
                                    <el-radio-button value="DEFAULT">不启用</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="数据对接方式">
                                <el-radio-group v-model="globalState.data_docking_mode">
                                    <el-radio-button :value="'EVENT'"> 事件管理 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>


                            <el-form-item label="优化目标">
                                <el-form :label-width="144" label-position="left" class="p-16px pr-40px"
                                    style="border: 1px solid #e8eaec">
                                    <el-form-item label="事件回传方式" style="margin-bottom: 16px">
                                        <el-radio-group>
                                            <el-radio-button :value="1"> 应用SDK回传 </el-radio-button>
                                            <el-radio-button :value="1"> 应用API回传 </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="优化目标" style="margin-bottom: 16px">
                                        <el-select style="width: 360px"></el-select>
                                    </el-form-item>
                                    <el-form-item label="深度优化目标">
                                        <el-select style="width: 360px"></el-select>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 投放版位 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放版位</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="广告位置" style="margin-bottom:0px;">
                                <el-radio-group v-model="globalState.inventory_catalog">
                                    <el-radio-button v-for="(item) in inventory_catalog_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text>通投智选下，广告会投到信息流和搜索场景，提升单计划跑量与效果稳定性</el-text>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 用户定向 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">用户定向</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="定向包来源">
                                <el-radio-group v-model="globalState.targetedPackageSource">
                                    <el-radio-button :value="1"> 账户已有定向包 </el-radio-button>
                                    <el-radio-button :value="2"> 创量定向包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="匹配方式">
                                <el-radio-group v-model="globalState.matchingMethod">
                                    <el-radio-button :value="1"> 每个账户选择一个定向包 </el-radio-button>
                                    <el-radio-button :value="2"> 每个项目选择一个定向包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择定向包">
                                <el-button @click="selectAudiencePackage" type="primary">选择定向包</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>




                <!-- 项目排期与预算 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">项目排期与预算</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="投放时间">
                                <el-radio-group v-model="globalState.schedule_type">
                                    <el-radio-button v-for="(item) in schedule_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="投放时段">
                                <el-radio-group v-model="globalState.schedule_time_type">
                                    <el-radio-button :value="1"> 不限 </el-radio-button>
                                    <el-radio-button :value="2"> 指定时间段 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>



                            <el-form-item label="竞价策略">
                                <el-radio-group v-model="globalState.bid_type">
                                    <el-radio-button v-for="(item) in bid_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text> 巨量广告媒体加白功能，确认账户拥有权限再启用</el-text>
                            </el-form-item>

                            <el-form-item label="项目预算">
                                <el-radio-group v-model="globalState.budget_mode">
                                    <el-radio-button v-for="(item) in budget_mode_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="付费方式">
                                <el-radio-group v-model="globalState.pricing">
                                    <el-radio-button :value="'PRICING_OCPM'"> 目标转化出价-按展示付费 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>



                <!-- 搜索快投 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">搜索快投</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="关键词">

                            </el-form-item>
                            <el-form-item label="出价系数" style="margin-bottom: 0px;">
                                <el-radio-group v-model="globalState.search_bid_ratio_type">
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text>不启用出价系数时默认出价系数为1（仅针对可设置出价系数的账户生效）</el-text>
                            </el-form-item>
                            <el-form-item>
                                <el-input clearable style="width: 160px" v-if="globalState.search_bid_ratio_type === 2"
                                    v-model="globalState.search_bid_ratio" placeholder="请输入出价系数" />
                            </el-form-item>
                            <el-form-item label="定向扩展" style="margin-bottom: 0px;">
                                <el-radio-group v-model="globalState.audience_extend">
                                    <el-radio-button v-for="item in audience_extend_radio" :key="item.value"
                                        :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <!-- <el-form-item>
                                <el-checkbox>
                                    <el-text>搜索快投豁免（仅支持媒体平台申请了搜索快投豁免账户，否则“出价系数”和“定向拓展”媒体API将默认开启)</el-text>
                                </el-checkbox>
                            </el-form-item> -->
                        </el-form>
                    </el-col>
                </el-row>



                <!-- 项目名称 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">项目名称</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="项目名称">
                                <el-row>
                                    <el-col>
                                        <el-input v-model="globalState.name" style="width: 360px;" :maxlength="100"
                                            show-word-limit></el-input>
                                    </el-col>
                                    <el-col class="flex">
                                        <el-text style="margin-right: 8px;">通配符:</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary">+渠道包名</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary">+检测活动名</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary">+已有检测链接组名</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary"><el-icon>
                                                <Document />
                                            </el-icon>插入更多</el-text>
                                    </el-col>

                                    <el-col>
                                        <el-text type="warning"><el-icon>
                                                <WarningFilled />
                                            </el-icon> 取消<时间>或<标号>类通配符可能会导致名称重复，无法提交计划</el-text>
                                    </el-col>

                                    <el-col>
                                        <el-text type="warning"><el-icon>
                                                <WarningFilled />
                                            </el-icon>名称长度最多100字符（1汉字=2字符），使用通配符时，请注意控制自定义内容长度</el-text>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="项目默认状态">
                                <el-radio-group v-model="globalState.operation">
                                    <el-radio-button v-for="item in operation_radio" :key="item.value"
                                        :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </main>
        </el-scrollbar>
    </Drawer>


    <!-- 定向包 -->
    <AudiencePackage :visible="AudiencePackageState.visible" :size="AudiencePackageState.size" />


    <ConnectionGroup :visible="ConnectionGroupState.visible" :type="ConnectionGroupState.type"
        :title="ConnectionGroupState.title" />


</template>

<script setup lang="ts">
import { ref, reactive, markRaw, watchEffect, onMounted } from "vue";
import Drawer from "@/components/Drawer.vue";
import AudiencePackage from "./AudiencePackage.vue";
import ConnectionGroup from "./ConnectionGroup.vue";

import { ElMessageBox } from "element-plus";
import "element-plus/es/components/message-box/style/css";
import { WarningFilled } from "@element-plus/icons-vue";

import { createProject, queryAndroidAppList } from "@/api/modules/promotion";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleNewProjectClose"]);

const drawerOptions = reactive({
	visible: props.visible,
	size: 1016,
});

watchEffect(() => {
	drawerOptions.visible = props.visible;
});

const handleDrawerClose = (type: number) => {
	if (type === 1) {
		createProjectFunc(globalState);
	}

	// emits('handleNewProjectClose', type)
};

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
	search_bid_ratio: string;
	superior_popularity_type: string;
	track_url_group_id: string;
	track_url_type: string;
	union_video_type: string;
	value_optimized_type: string;

	// 接口没写，头条需要参数
	schedule_time: string;
	data_docking_mode: string;
	app_type: string;

	// 页面参数
	search_bid_ratio_type: number;
	schedule_time_type: number;
	matchingMethod: number;
	targetedPackageSource: number;
	detect_link_source: number;
	platform_type: string;
}

const globalState: ICreateProject = reactive({
	advertiser_id: 1787695788195915,
	delivery_mode: "MANUAL",
	app_promotion_type: "DOWNLOAD",
	landing_type: "APP",
	marketing_goal: "VIDEO_AND_IMAGE",
	ad_type: "ALL",
	delivery_type: "NORMAL",
	platform_type: "",
	app_name: "",

	// 检测链接来源
	detect_link_source: 1,
	// 下载方式
	download_type: "",
	download_mode: "DEFAULT",
	data_docking_mode: "EVENT",

	inventory_catalog: "UNIVERSAL_SMART",

	targetedPackageSource: 1,
	matchingMethod: 2,

	// 项目排期与预算
	schedule_type: "SCHEDULE_FROM_NOW",
	schedule_time_type: 1,
	schedule_time: "",

	bid_type: "CUSTOM",
	budget_mode: "BUDGET_MODE_INFINITE",

	pricing: "PRICING_OCPM",

	search_bid_ratio_type: 2,
	search_bid_ratio: "",

	audience_extend: "ON",

	// 项目名称
	name: "20240621-16:09:26-1",
	operation: "ENABLE", // DISABLE

	ac: [],
	age: [],
	android_osv: "",
	asset_ids: [1791972146324483],
	auto_extend_targets: [],
	budget: "",
	device_brand: [],
	device_type: [],
	district: "",
	download_url:
		"https://apps.bytesfield.com/download/basic/cur/c1e4f76f2c6608cf2ce4f1d00684d6be37439fc5",
	external_action: "AD_CONVERT_TYPE_ACTIVE",
	gender: "NONE",
	hide_if_converted: "PROMOTION",
	hide_if_exists: "UNLIMITED",
	interest_action_mode: "RECOMMEND",
	inventory_type: [],
	platform: [],
	superior_popularity_type: "",
	track_url_group_id: "1797289111929028",
	track_url_type: "GROUP_ID",
	union_video_type: "",
	value_optimized_type: "",
	app_type: "",
});

// 子目标
const app_promotion_type_radio = [
	{
		value: "DOWNLOAD",
		label: "应用下载",
	},
	{
		value: "LAUNCH",
		label: "应用调起",
	},
	{
		value: "RESERVE",
		label: "预约下载",
	},
];

//  投放模式
const delivery_mode_radio = [
	{
		value: "MANUAL",
		label: "手动投放",
	},
	{
		value: "PROCEDURAL",
		label: "自动投放(UBMax)",
	},
];

// 营销场景
const marketing_goal_radio = [
	{
		value: "VIDEO_AND_IMAGE",
		label: "短视频/图片",
	},
	{
		value: "LIVE",
		label: "直播",
	},
];

// 广告类型
const ad_type_radio = [
	{
		value: "ALL",
		label: "通投广告",
	},
	{
		value: "SEARCH",
		label: "搜索广告",
	},
];

// 投放类型
const delivery_type_radio = [
	{
		value: "NORMAL",
		label: "常规投放",
	},
	{
		value: "DURATION",
		label: "周期稳投",
	},
];

// 平台类型
const platform_type_radio = [
	{
		value: "Android",
	},
	{
		value: "IOS",
	},
];

// 下载方式
const download_type_radio = [
	{
		value: "DOWNLOAD_URL",
		label: "直接下载",
	},
	{
		value: "EXTERNAL_URL",
		label: "落地页下载",
	},
];

// 广告位置按钮
const inventory_catalog_radio = [
	{
		value: "UNIVERSAL_SMART",
		label: "通投智选",
	},
	{
		value: "MANUAL",
		label: "首选媒体",
	},
];

const schedule_type_radio = [
	{
		value: "SCHEDULE_FROM_NOW",
		label: "从今天起长期投放",
	},
	{
		value: "SCHEDULE_START_END",
		label: "设置开始和结束日期",
	},
];

// 竞价策略按钮
const bid_type_radio = [
	{
		value: "CUSTOM",
		label: "稳定成本",
	},
	{
		value: "NO_BID",
		label: "最大转化投放",
	},
	{
		value: "UPPER_CONTROL",
		label: "最优成本",
	},
	{
		value: "EXPLORE_UPGRADE",
		label: "广告潜力探索-升级版",
	},
];

// 项目预算
const budget_mode_radio = [
	{
		value: "BUDGET_MODE_INFINITE",
		label: "不限",
	},
	{
		value: "BUDGET_MODE_DAY",
		label: "日预算",
	},
];

// 定向扩展
const audience_extend_radio = [
	{
		value: "OFF",
		label: "不启用",
	},
	{
		value: "ON",
		label: "启用",
	},
];

// 操作状态
const operation_radio = [
	{
		label: "关闭",
		value: "DISABLE",
	},
	{
		label: "开启",
		value: "ENABLE",
	},
];

const boxCardItem = ref([
	{
		id: 0,
		title: "应用推广",
		content: "推广您的线上APP",
		active: true,
		value: "APP",
	},
	{
		id: 1,
		title: "小程序",
		content: "吸引更多用户进入小程序",
		active: false,
		value: "MICRO_GAME",
	},
	{
		id: 2,
		title: "快应用",
		content: "吸引更多用户进入快应用",
		active: false,
		value: "QUICK_APP",
	},
]);

const handleBoxCardItem = (id: number) => {
	ElMessageBox.confirm(
		"切换推广目的将会清空您已填写的所有内容，是否继续切换？",
		"提示",
		{
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
			icon: markRaw(WarningFilled),
		},
	).then(() => {
		boxCardItem.value = boxCardItem.value.map((item) => {
			item.active = false;
			if (item.id === id) {
				item.active = true;
				globalState.landing_type = item.value;
			}
			return {
				id: item.id,
				title: item.title,
				content: item.content,
				active: item.active,
				value: item.value,
			};
		});
	});
};

// 头条应用
const AndroidAppList = ref();
const headline_application_options = ref();

interface IQueryAndroidAppList {
	advertiser_id: string;
	page_limit: number;
}

const queryAndroidAppListFunc = async (params: IQueryAndroidAppList) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const res: any = await queryAndroidAppList(params);
	AndroidAppList.value = res.data.list;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	headline_application_options.value = res.data.list.map((item: any) => ({
		value: `${item.app_name}-${item.package_name}`,
		label: `${item.app_name}(${item.package_name})`,
	}));
};

onMounted(() => {
	queryAndroidAppListFunc({
		advertiser_id: "1787695788195915",
		page_limit: 1000,
	});
});

const createProjectFunc = async (params: ICreateProject) => {
	const res = await createProject(params);

	console.log(res);
};

// ConnectionGroup
const ConnectionGroupState = reactive({
	visible: false,
	type: 0,
	title: "",
});

const selectConnectionGroup = () => {
	console.log(globalState.detect_link_source);

	ConnectionGroupState.visible = true;
	ConnectionGroupState.type = globalState.detect_link_source;
	ConnectionGroupState.title = "选择巨量后台监测连接组";
};

const AudiencePackageState = reactive({
	visible: false,
	size: 1016,
});

// 选择定向包
const selectAudiencePackage = () => {
	console.log(123213);
	AudiencePackageState.visible = true;
};
</script>
