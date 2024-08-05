<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template #header>
            <header style="
          position: relative;
          padding: 0 16px;
          background-color: #fff;
          border-bottom: 1px solid #e8eaec;
          ">
                <slot name="header">
                    <div class="font-size-16px font-700 line-height-48px color-[#333]">账户定向包</div>
                </slot>
            </header>
        </template>

        <el-scrollbar style="height: calc(100vh - 140px)">
            <main class="m-16px pl-16px pr-16px h-100%">
                <el-row class="mb-16px p-16px h-100%"
                    style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col>
                        <el-text>
                            头条定向包使用注意事项
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </el-text>
                    </el-col>
                    <el-col>
                        <el-row class="h-64px p-8px bg-[#fafafa] flex justify-between align-content-center"
                            style="border:1px solid #e8eaec;border-bottom:none;">
                            <el-col :span="1.5">
                                <el-text>
                                    选择头条定向包
                                </el-text>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button :loading="MultipleAccountRefreshLoading"
                                    @click="handleMultipleAccountRefreshClick">
                                    多账户刷新
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row class="border-[#e8eaec]">
                            <el-col :span="24" class="p-16px" style="border-left: 1px solid #e8eaec;">
                                <el-row class="flex align-items-center ">
                                    <el-col :span="1.5" class="mr-8px">
                                        <el-input v-model="keyword" class="input-with-select" style="max-width: 500px"
                                            placeholder="请输入关键词" clearable>
                                            <template #prepend>
                                                <el-select v-model="keyword_type" style="width: 80px">
                                                    <el-option label="名称" value="name" />
                                                    <el-option label="ID" value="id" />
                                                </el-select>
                                            </template>
                                            <template #append>
                                                <el-button :icon="Search" @click="handleSearchClick" />
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="1.5" class="mr-8px">
                                        <el-select style="width:100px;" v-model="delivery_range" clearable
                                            placeholder="全部" @change="handleDeliveryModeChange"
                                            @clear="handleDeliveryModeClear">
                                            <el-option v-for="item in delivery_mode_options" :key="item.value"
                                                :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="1.5">
                                        <el-text>已选：0/1</el-text>
                                    </el-col>
                                </el-row>
                                <el-row class="my-8px">
                                    <el-col :span="1.5" class="mr-8px">
                                        <el-button type="primary"
                                            @click="handleNewTargetingPackageClick">新建头条定向</el-button>
                                    </el-col>
                                    <el-col :span="1.5">
                                        <el-checkbox>
                                            <el-text size="small">仅查看可用的定向包</el-text>
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-table border ref="multipleTableRef" :data="tableData"
                                            style="max-height: 600px;" @selection-change="handleSelectionChange"
                                            empty-text="没有数据" v-loading="loading">
                                            <el-table-column type="selection" width="55" :selectable="canSelectRow" />
                                            <el-table-column v-for="(value, key) in tableKey" :prop="key" :label="value"
                                                :width="200" align="center">
                                                <template #default="scope">
                                                    <span v-if="key === 'delivery_range'">{{
                                                        delivery_range_enum[scope.row[key]] }}</span>
                                                    <span v-else-if="key === 'landing_type'">{{
                                                        landing_type_enum[scope.row[key]] }}</span>
                                                    <span v-else>{{ scope.row[key] }}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column fixed="right" label="操作" min-width="120">
                                                <template #default>
                                                    <el-button link type="primary" size="small">编辑</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>

                                        <el-config-provider :locale="zhCn">
                                            <el-pagination class="mt-20px" v-model:current-page="currentPage"
                                                v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
                                                layout="total, sizes, prev, pager, next, jumper" :total="total"
                                                @size-change="handleSizeChange" @current-change="handlePageChange" />
                                        </el-config-provider>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </main>
        </el-scrollbar>
    </Drawer>


    <NewTargetingPackage :visible="NewTargetingPackageState.visible" @handleClose="handleNewTargetingPackageClose" />



</template>

<script setup lang="ts">
import { reactive, watchEffect, ref, onMounted, watch } from "vue";
import Drawer from "@/components/Drawer.vue";
import { Search } from "@element-plus/icons-vue";
import { zhCn } from "element-plus/es/locales.mjs";
import {
    type IQueryPreferenceList,
    ISyncPreference,
    queryPreferenceList,
    syncPreference,
} from "@/api/modules/promotion";
import NewTargetingPackage from "./NewTargetingPackage.vue";

interface IProps {
    visible: boolean;
    size: number;
    advertiser_id_array: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);

const drawerOptions = reactive<IProps>({
    visible: props.visible,
    size: props.size || 1016,
    advertiser_id_array: [],
});

watchEffect(() => {
    drawerOptions.visible = props.visible;
    drawerOptions.advertiser_id_array = props.advertiser_id_array;
});

watch(() => drawerOptions.visible, () => {
    if (drawerOptions.visible) {
        queryPreferenceListFunc({
            advertiser_id: drawerOptions.advertiser_id_array[0],
            page_limit: 1000,
        });
    }
})

const handleDrawerClose = (type: number) => {
    if (type === 1) {
        emits("handleDrawerClose", {
            type: 1,
            selectedTargetingPackage: selectedRows.value,
        });
    } else {
        emits("handleDrawerClose", { type: 0 });
    }
};

const keyword = ref();
const keyword_type = ref("name");
const delivery_range = ref("UNIVERSAL");

const delivery_mode_options = [
    {
        value: "DEFAULT",
        label: "默认",
    },
    {
        value: "UNIVERSAL",
        label: "通投智选",
    },
    {
        value: "UNION",
        label: "穿山甲",
    },
];

const tableKey = {
    name: "定向包名称",
    audience_package_id: "定向包ID",
    delivery_range: "投放范围",
    landing_type: "定向包类型",
};

const tableData = ref();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();
const multipleTableRef = ref();

const selectedRows = ref<any[]>([]); // 初始化时选中所有行

const handleSelectionChange = (selection: any[]) => {
    selectedRows.value = selection; // 更新 selectedRows 数组
};

const canSelectRow = (row: any) => {
    if (selectedRows.value?.length > 0) {
        return selectedRows.value.some((selectedRow) => selectedRow.id === row.id);
    } else {
        return true;
    }
};

const handleSizeChange = () => {
    queryPreferenceListFunc({
        advertiser_id: drawerOptions.advertiser_id_array[0],
        cur_page: currentPage.value,
    });
};

const handlePageChange = () => {
    queryPreferenceListFunc({
        advertiser_id: drawerOptions.advertiser_id_array[0],
        page_limit: pageSize.value,
    });
};

const loading = ref(false);

const queryPreferenceListFunc = async (params?: IQueryPreferenceList) => {
    loading.value = true;
    const res: any = await queryPreferenceList(params);
    if (res.state === 1) {
        tableData.value = res.data.list;
        total.value = res.data.page_info.total;
        currentPage.value = res.data.page_info.cur_page;
        pageSize.value = res.data.page_info.page_limit;

        loading.value = false;
    }
};

// 投放范围枚举值
const delivery_range_enum: Record<string, string> = {
    DEFAULT: "默认",
    UNION: "穿山甲",
    UNIVERSAL: "通投智选",
};

// 定向包推广类型
const landing_type_enum: Record<string, string> = {
    EXTERNAL: "落地页",
    ARTICLE: "文章推广",
    GOODS: "商品推广",
    DPA: "商品目录",
    STORE: "门店推广",
    AWEME: "抖音号推广",
    SHOP: "店铺直投",
    APP_ANDROID: "应用下载-安卓",
    APP_IOS: "应用下载-IOS",
    LIVE: "直播间推广",
    QUICK_APP: "快应用",
    MICRO_GAME: "小游戏推广",
};

// onMounted(() => {
//     queryPreferenceListFunc({
//         delivery_range: "DEFAULT",
//     });
// });

const handleDeliveryModeChange = (value: string | number) => {
    if (value) {
        queryPreferenceListFunc({
            advertiser_id: drawerOptions.advertiser_id_array[0],
            delivery_range: String(value),
        });
    }
};

const handleDeliveryModeClear = () => {
    queryPreferenceListFunc({
        advertiser_id: drawerOptions.advertiser_id_array[0],
    });
};

const handleSearchClick = () => {
    if (keyword.value) {
        if (keyword_type.value === "name") {
            queryPreferenceListFunc({
                advertiser_id: drawerOptions.advertiser_id_array[0],
                name: keyword.value,
            });
        } else {
            queryPreferenceListFunc({
                advertiser_id: drawerOptions.advertiser_id_array[0],
                audience_package_id: keyword.value,
            });
        }
    } else {
        queryPreferenceListFunc({
            // advertiser_id: 1787695788195915,
            advertiser_id: drawerOptions.advertiser_id_array[0],
        });
    }
};

const MultipleAccountRefreshLoading = ref(false);
// 多账户刷新
const syncPreferenceFunc = async (params: ISyncPreference) => {
    MultipleAccountRefreshLoading.value = true;
    try {
        const res = await syncPreference(params)
        console.log(res);

        if (res.state === 1) {
            queryPreferenceListFunc({
                // advertiser_id: 1787695788195915,
                advertiser_id: drawerOptions.advertiser_id_array[0],
            });
        }

    } catch (error) {
        console.error("syncPreferenceFunc------->", error);
    } finally {
        MultipleAccountRefreshLoading.value = false;
    }
}

const handleMultipleAccountRefreshClick = () => {
    syncPreferenceFunc({
        advertiser_id: drawerOptions.advertiser_id_array.join(","),
    })
}


// 新建头条定向包
const NewTargetingPackageState = reactive({
    visible: false,
});

const handleNewTargetingPackageClick = () => {
    NewTargetingPackageState.visible = true;
};

const handleNewTargetingPackageClose = (options: {
    type: number;
    form: any;
}) => {
    if (options.type === 1) { } else {
        NewTargetingPackageState.visible = false;
    }
};


</script>


<style>
.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}

.input-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}
</style>