<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择已有项目</div>
        </template>
        <el-scrollbar style="height: calc(100vh - 90px)">
            <main class="m-16px pl-16px pr-16px pb-16px" style="background-color: #fff;">
                <div class="p-16px flex flex-wrap">
                    <div
                        class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid w-280px mb-10px">
                        <label class="w-75px color-[#333] line-height-30px text-center"
                            style="border-right: 1px solid #e8eaec;">投放模式</label>
                        <div class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100% cursor-pointer">
                            <el-select style="width: 225px;"></el-select>
                        </div>
                    </div>

                    <div
                        class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid w-280px ml-10px mb-10px">
                        <label class="w-75px color-[#333] line-height-30px text-center"
                            style="border-right: 1px solid #e8eaec;">推广目的</label>
                        <div class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100%  cursor-pointer">
                            <el-select style="width: 225px;"></el-select>
                        </div>
                    </div>

                    <div
                        class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid w-280px ml-10px mb-10px">
                        <label class="w-75px color-[#333] line-height-30px text-center"
                            style="border-right: 1px solid #e8eaec;">推广子目的</label>
                        <div class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100%  cursor-pointer">
                            <el-select style="width: 225px;"></el-select>
                        </div>
                    </div>

                    <div
                        class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid w-280px ml-10px mb-10px">
                        <label class="w-75px color-[#333] line-height-30px text-center"
                            style="border-right: 1px solid #e8eaec;">营销场景</label>
                        <div class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100%  cursor-pointer">
                            <el-select style="width: 225px;"></el-select>
                        </div>
                    </div>


                    <div
                        class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid w-280px ml-10px mb-10px">
                        <label class="w-75px color-[#333] line-height-30px text-center"
                            style="border-right: 1px solid #e8eaec;">推广子目的</label>
                        <div class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100%  cursor-pointer">
                            <el-select style="width: 225px;"></el-select>
                        </div>
                    </div>

                    <div
                        class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid w-280px ml-10px ">
                        <label class="w-75px color-[#333] line-height-30px text-center"
                            style="border-right: 1px solid #e8eaec;">推广子目的</label>
                        <div class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100%  cursor-pointer">
                            <el-select style="width: 225px;"></el-select>
                        </div>
                    </div>
                </div>
                <div class="mt-10px">
                    <div>
                        <span>当前项目:</span>
                    </div>

                    <div>
                        <span>暂时未选择项目:</span>
                    </div>
                </div>
                <div class="flex ">
                    <div style="border: 1px solid #ebeef5;flex : 1;border-right:none;">
                        <ul class="w-200px">
                            <li>疯狂星期一-天拓-17...</li>
                        </ul>
                    </div>

                    <div style="flex : 7;">
                        <el-row>
                            <el-col>
                                <el-table v-loading="loading" :data="tableData" :border="true"
                                    style="width: 100%; height: 300px" fixed @selection-change="">
                                    <el-table-column type="selection" width="55" />
                                    <el-table-column prop="name" label="项目名称和ID" />
                                    <el-table-column prop="landing_type" label="推广目的" />
                                    <el-table-column prop="app_promotion_type" label="子目标" />
                                    <el-table-column prop="delivery_mode" label="投放模式" />
                                    <el-table-column prop="marketing_goal" label="营销场景" />
                                </el-table>
                            </el-col>
                        </el-row>
                        <el-row style="border: 1px solid #ebeef5;" class="pt-8px pb-8px">
                            <el-col>
                                <Pagination :currentPage="paginationState.currentPage"
                                    :pageSize="paginationState.pageSize" :total="paginationState.total" @handleClick="">
                                </Pagination>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </main>
        </el-scrollbar>
    </Drawer>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from "vue";
import { ElMessage } from "element-plus";
// import 'element-plus/es/components/message/css'
import Drawer from "@/components/Drawer.vue";
import { queryProjectList } from "@/api/modules/promotion";

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
    emits("handleNewProjectClose", type);
};

// 投放模式
// const DeliveryModeOptions = [
//     {
//         value: "MANUAL",
//         label: "手动投放(默认值）",
//     },
//     {
//         value: "PROCEDURAL",
//         label: "自动投放",
//     },
// ];

// 推广目的
// const PurposeOfPromotionOptions = [
//     {
//         value: "APP",
//         label: "应用推广",
//     },
//     {
//         value: "QUICK_APP",
//         label: "快应用推广",
//     },
//     {
//         value: "STORE",
//         label: "门店推广",
//     },
//     {
//         value: "AWEME",
//         label: "抖音号推广",
//     },
//     {
//         value: "LIVE",
//         label: "直播间推广",
//     },
// ];

// 子目标
// const SubgoalsOptions = [
//     {
//         value: "DOWNLOAD",
//         label: "应用下载",
//     },
//     {
//         value: "LAUNCH",
//         label: "应用调起",
//     },
//     {
//         value: "RESERVE",
//         label: "预约下载",
//     },
// ];

// 营销场景
// const MarketingGoalOptions = [
//     {
//         value: "VIDEO_AND_IMAGE",
//         label: "短视频/图片",
//     },
//     {
//         value: "LIVE",
//         label: "直播",
//     },
// ];


const loading = ref(false);

const tableData = ref();

const paginationState = reactive({
    currentPage: 1,
    pageSize: 20,
    total: 10,
});

interface IQueryProjectList {
    advertiser_id: string;
    delivery_mode: string;
    landing_type: string;
    app_promotion_type: string;
    marketing_goal: string;
    name: string;
}

const requestParams: IQueryProjectList = reactive({
    advertiser_id: "1787695788195915",
    delivery_mode: "",
    landing_type: "",
    app_promotion_type: "",
    marketing_goal: "",
    name: "",
});

// 已有项目列表数据请求
const queryProjectListFunc = async () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const res: any = await queryProjectList(requestParams);
    loading.value = true;

    if (res.state === 1) {
        tableData.value = res.data.list;
        paginationState.currentPage = Number(res.data.page_info.cur_page);
        paginationState.pageSize = Number(res.data.page_info.page_limit);
        paginationState.total = Number(res.data.page_info.total);

        loading.value = false;
    } else {
        ElMessage({
            showClose: true,
            message: res.msg,
            type: "error",
        });

        loading.value = false;
    }
};

onMounted(() => {
    queryProjectListFunc();
});
</script>


<style scoped>
/* 移除 el-select 的边框 */
.el-select .el-select__wrapper {
    border: none;
    box-shadow: none;
}
</style>
