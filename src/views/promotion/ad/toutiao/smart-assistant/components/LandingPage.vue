<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from "vue";
import { ElMessage } from "element-plus";
import Drawer from "@/components/Drawer.vue";
import {
	type IQueryLandingPage,
	queryLandingPage,
	type IQueryAccountList,
	queryAccountList,
} from "@/api/modules/promotion";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);

const drawerOptions = reactive({
	visible: props.visible ?? false,
	size: 1016,
});

const handleDrawerClose = (type: number) => {
	if (type === 1) {
		if (checkedLandingPage.value) {
			emits("handleDrawerClose", type, checkedLandingPage.value);
		} else {
			ElMessage({
				message: "Warning, this is a warning message.",
				type: "warning",
			});
		}
	} else {
		emits("handleDrawerClose", type);
	}
};

watchEffect(() => {
	drawerOptions.visible = props.visible;
});

const each_ad_configuration = ref(1);
const landing_page_type = ref("orange_landing_page");

const landing_page_allocation_method = ref("all");
const landing_page_allocation_method_radio = [
	{
		label: "全部相同",
		value: "all",
	},
	{
		label: "按账户分配",
		value: "account",
	},
];

// 查询帐号
const accountList = ref();
const account = ref();
const accountSelected = ref();
const accountList_loading = ref(false);

const queryAccountListFunc = async (params: IQueryAccountList) => {
	accountList_loading.value = true;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const res: any = await queryAccountList(params);
	if (res.state === 1) {
		accountList.value = res.data.list;
		accountList_loading.value = false;
	} else {
		console.error("queryAccountListFunc request error");
	}
};

onMounted(() => {
	queryAccountListFunc({
		PID: "11",
		ADVERTISER_ID: "1787695788195915",
		ALIAS: "加速星期",
	});
});

const handleAccountListRefresh = () => {
	queryAccountListFunc({
		PID: "11",
		ADVERTISER_ID: "1787695788195915",
		ALIAS: "加速星期",
	});
};

const handleAccountListChange = () => {
	queryAccountListFunc({
		PID: "11",
		ADVERTISER_ID: "1787695788195915",
		ALIAS: "加速星期",
	});
};

const LandingPageList = ref();
const checkedLandingPage = ref();

const queryLandingPageFunc = async (params: IQueryLandingPage) => {
	const res: any = await queryLandingPage(params);
	if (res.state === 1) {
		LandingPageList.value = res.data.list;
	} else {
		console.error("queryLandingPageFunc request error");
	}
};

onMounted(() => {
	queryLandingPageFunc({
		advertiser_id: "1787695788195915",
		page_limit: 10000,
	});
});

const handleCheckedLandingClear = () => {
	checkedLandingPage.value = [];
};
</script>

<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择落地页</div>
        </template>


        <main class="m-16px p-16px bg-[#fff]" style="height: calc(100vh - 150px)">
            <el-scrollbar style="height: 100%">
                <el-form :label-position="'left'" :label-width="'150'">
                    <el-form-item label="每个广告配置">
                        <el-input v-model="each_ad_configuration" class="mr-8px !w-100px" />个落地页链接
                    </el-form-item>

                    <el-form-item label="落地页类型">
                        <el-radio-group v-model="landing_page_type">
                            <el-radio-button :value="'orange_landing_page'"> 橙子落地页 </el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="落地页分配方式">
                        <el-radio-group v-model="landing_page_allocation_method">
                            <el-radio-button v-for="item in landing_page_allocation_method_radio" :label="item.label"
                                :value="item.value"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <el-row class="w-762px  bg-[#fafafa] ">
                    <el-col :span="1.5"
                        class="w-100% h-64px p-8px border-top-[#e8eaec] border-right-[#e8eaec] border-left-[#e8eaec] flex justify-between align-items-center">
                        <el-text>选择落地页</el-text>
                        <el-button type="primary">多账户刷新</el-button>
                    </el-col>
                    <el-col class="p-16px w-100% border-[#e8eaec]" style="border-bottom: none;">
                        <div>
                            <el-select class="!w-480px mr-16px" clearable placeholder="所有账户" v-model="accountSelected"
                                @change="handleAccountListChange">
                                <el-option v-for="item in accountList" :label="`${item.ALIAS}(${item.ADVERTISER_ID})`"
                                    :value="item.ADVERTISER_ID" v-model="account"></el-option>
                            </el-select>
                            <el-button link type="primary" @click="handleAccountListRefresh">刷新</el-button>
                        </div>
                    </el-col>

                    <el-col :span="1.5" class="flex p-16px w-100% border-[#e8eaec]">
                        <div class="w-480px h-500px border-[#e8eaec] mr-16px bg-[#fff]">
                            <div
                                class="header h-48px border-bottom-[#e8eaec] px-16px font-size-12px flex justify-between align-items-center align-content-center">
                                <div class="left flex align-items-center align-content-center ">
                                    <div class="mr-12px">
                                        <span>项目数：5</span>
                                    </div>
                                    <div>
                                        <span>广告数：4</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <el-button>
                                        <el-icon class="mr-4px">
                                            <Edit />
                                        </el-icon>快速选择
                                    </el-button>
                                </div>
                            </div>

                            <div
                                class="header h-48px border-bottom-[#e8eaec] px-16px font-size-12px flex align-items-center align-content-center">
                                <div>
                                    <span>落地页名称</span>
                                </div>
                            </div>

                            <div class="header w-100% px-16px font-size-12px flex">
                                <el-scrollbar class="w-100%" height="380">
                                    <el-checkbox-group v-model="checkedLandingPage" :max="1">
                                        <el-checkbox style="width: 100%;" v-for="landingPage in LandingPageList"
                                            :key="landingPage" :label="landingPage" :value="landingPage">
                                            {{ landingPage.name }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-scrollbar>
                            </div>
                        </div>

                        <div class="w-200px border-[#e8eaec] bg-[#fff]">

                            <div class="flex justify-between align-content-center align-items-center  line-height-40px h-40px px-8px font-size-12px bg-[#f8f9fd]"
                                style="border-bottom: 1px solid #dcdee2;">
                                <div>
                                    <span>已选：</span>

                                </div>
                                <div>
                                    <el-button type="primary" link @click="handleCheckedLandingClear">
                                        清空
                                        <el-icon>
                                            <RefreshLeft />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                            <el-scrollbar height="380px">
                                <div class="h-180px px-10px py-7px">
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap : 5px; ">
                                        <div v-for="checkedLanding in checkedLandingPage"
                                            class="flex w-166px font-size-12px h-24px line-height-24px bg-[#f4f5fc] mb-6px border-radius-6px px-8px color-[#515a6e] justify-between overflow-y-auto">
                                            <div>
                                                <span>{{ checkedLanding.name }}</span>
                                            </div>
                                            <div>
                                                <el-button link @click="handleCheckedLandingClear"><el-icon>
                                                        <CloseBold />
                                                    </el-icon></el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </main>


    </Drawer>
</template>
