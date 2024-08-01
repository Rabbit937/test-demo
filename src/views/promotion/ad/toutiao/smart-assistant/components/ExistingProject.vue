<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择已有项目</div>
        </template>
        <el-scrollbar style="height: calc(100vh - 90px)">
            <main class="m-16px pl-16px pr-16px pb-16px" style="background-color: #fff;">
                <!-- <div class="p-16px flex flex-wrap">
                    <el-input class="select-with-select mr-8px" style="width: 360px">
                        <template #prepend>
                            <div>
                                <el-text>创建用户</el-text>
                            </div>
                        </template>
                        <template #append>
                            <el-select placeholder="请选择创建用户" style="width: 260px" clearable>
                                <el-option v-for="staffInfo in staffInfoList" :label="staffInfo.text"
                                    :value="staffInfo.id"></el-option>

                            </el-select>
                        </template>
                    </el-input>
                </div>
                <div class="flex ">
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
                </div> -->
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


<style>
.select-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}

.select-with-select .el-input__wrapper {
    display: none;
}

.select-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}


.input-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}
</style>
