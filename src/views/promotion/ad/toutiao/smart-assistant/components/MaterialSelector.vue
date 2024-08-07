<template>
    <el-dialog v-model="dialogState.visible" :width="dialogState.width" :append-to-body="true"
        :close-on-click-modal="false" :show-close="false" :top="'6vh'">
        <div class="position-absolute right-16px z-100">
            <el-button>管理素材</el-button>
        </div>
        <el-tabs v-model="tabName" class="demo-tabs" @tab-click="handletabsClick">
            <el-tab-pane label="素材库" name="material_library">
                <div class="max-h-200px px-24px py-12px overflow-hidden border-bottom-[#e8eaec] flex">
                    <el-form class="flex flex-wrap align-items-center" style="background-color: #fff">
                        <el-form-item label="名称或ID:">
                            <el-input v-model="searchParames.keyword" :placeholder="placeholderText"
                                class="input-with-select" style="width: 300px">
                                <template #prepend>
                                    <el-select v-model="searchParames.search_type" style="width: 110px"
                                        @change="handleAccountOrIdChange">
                                        <el-option v-for="(item, index) in searchSelectList" :label="item.label"
                                            :value="item.value" :key="index"></el-option>
                                    </el-select>
                                </template>
                                <template #append>
                                    <el-button :icon="Search" @click="handleSearch" />
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="创建日期:" class="pl-16px">
                            <el-config-provider :locale="zhCn">
                                <el-date-picker v-model="dataPicker" @change="handleDatePickerChange"
                                    value-format="YYYYMMDD" type="daterange" :shortcuts="shortcuts" range-separator="~"
                                    start-placeholder="开始日期" end-placeholder="结束日期" style="width: 300px">
                                </el-date-picker>
                            </el-config-provider>
                        </el-form-item>

                        <!-- <el-form-item label="素材目录:" class="pl-16px">
                                <el-cascader v-model="searchParames.cascaderValue" placeholder="全选"
                                    :options="cascaderOptions" :props="cascaderProps" clearable />
                            </el-form-item> -->

                        <el-form-item label="类型:" class="pl-16px">
                            <el-select v-model="searchParames.category" @change="handleMaterialTypeOrStatusChange"
                                placeholder="请选择素材类型" style="width: 300px" clearable>
                                <el-option v-for="item in materialTypeOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="素材状态:">
                            <el-select v-model="searchParames.status" @change="handleMaterialTypeOrStatusChange"
                                placeholder="请选择素材状态" style="width: 300px" clearable>
                                <el-option v-for="item in materialStatusOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item class="pl-16px">
                            <el-button link type="primary" @click="clearSearchParames">清空</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- <div class="h-50px flex justify-between align-content-center align-items-center">
                        <div class="flex px-24px">
                            <div class="mr-24px">
                                <el-radio-group>
                                    <el-radio-button :value="1">
                                        <el-icon>
                                            <Menu />
                                        </el-icon>
                                        <el-text>网格</el-text>
                                    </el-radio-button>
                                    <el-radio-button :value="2">
                                        <el-icon>
                                            <List />
                                        </el-icon>
                                        <el-text>列表</el-text>
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="mr-24px">
                                <el-checkbox>
                                    <el-text>仅显示可投放素材</el-text>
                                </el-checkbox>
                            </div>

                            <div class="mr-24px">
                                <el-checkbox v-model="checked1">
                                    <el-text>过滤拒审次数≥</el-text>
                                    <el-input :disabled="true" class="!w-50px px-8px"></el-input>
                                    <el-text>的素材</el-text>
                                </el-checkbox>
                            </div>

                            <div class="mr-24px">
                                <el-checkbox>
                                    <el-text>过滤建议次数≥</el-text>
                                    <el-input :disabled="true" class="!w-50px px-8px"></el-input>
                                    <el-text>的素材</el-text>
                                </el-checkbox>
                            </div>
                        </div>
                        <div>
                            <el-button type="primary" link>刷新</el-button>
                        </div>
                    </div> -->
                <el-scrollbar height="320px" class="!bg-[#f0f2f5] p-16px">
                    <el-checkbox-group v-if="videos.length > 0" v-model="selectedVideos" v-loading="loading"
                        :max="dialogState.multiple ? 10000 : 1">
                        <div class=" bg-[#f0f2f5] min-h-150px  flex flex-wrap p-2px">
                            <div class="w-216px position-relative mb-8px mr-8px font-size-12px cursor-pointer bg-[#fff] border-radius-3px checkbox-item"
                                v-for="video in videos" :key="video.id">
                                <!-- 图片 -->
                                <template v-if="Number(video.mime) === 2">
                                    <div
                                        class="w-100% position-relative h-120px bg-[#e8eaec] overflow-hidden text-center">
                                        <el-checkbox :value="video" class="!position-absolute  !left-8px"></el-checkbox>
                                        <img :src="video.upload_dir" class=" h-100% outline-none bg-[#e8eaec]" />
                                        <div class="position-absolute right-8px bottom-8px left-8px text-center">
                                            <div class="flex justify-between">
                                                <div class="w-80px line-height-16px color-[#fff] bg-[#00000080]"
                                                    style="border-radius: 2px">
                                                    <span>{{ video.info.dimension }}</span>
                                                </div>
                                                <!-- <div class="w-80px line-height-16px color-[#fff] bg-[#00000080]"
                                                        style="border-radius: 2px">
                                                        <span>{{ video.info.duration }}</span>
                                                    </div> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col justify-around px-8px pt-8px pb-10px font-size-12px line-height-20px"
                                        style="border: 1px solid #dcdee2;border-top: 0px;border-bottom-right-radius: 3px;border-bottom-left-radius: 3px;">
                                        <div class="flex justify-between">
                                            <span :title="video.material_name"
                                                class="h-20px overflow-hidden font-600 color-[#333] ellipsis">{{
                                                    video.material_name
                                                }}</span>
                                            <span class="ml-4px flex-shrink-0">{{
                                                video.info.size
                                            }}</span>
                                        </div>

                                        <div class="font-400 color-[#666]"> 上传时间：{{ video.create_time }}</div>
                                        <div class="font-400 color-[#666]"> 累计关联广告数<span>：0</span></div>

                                        <div class="flex flex-row w-100%">
                                            <div class="flex flex-wrap" style="height: 48px;">
                                                <!-- 标签 -->
                                                <!-- <div class="font-400 color-[#666]">
                                                        <span class="px-8px mt-2px mb-6px font-size-12px ellipsis"
                                                            style="border-style: solid;border-width: 1px;border-radius:3px;"
                                                            :style="{ borderColor: '#a5a5a5', color: '#a5a5a5' }">未使用</span>
                                                    </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="w-100% position-relative h-120px bg-[#e8eaec] overflow-hidden"
                                        style="background:no-repeat 50%; background-image: url(&quot;https://tos.mobgi.com/tos_beijing/material_cover/material_1/12000013178/12000021420/26b28268e71e53808c37978d030e9d0c253753.jpg&quot;);background-size: contain;border-top-left-radius: 3px;border-top-right-radius: 3px;">
                                        <el-checkbox :value="video" class="!position-absolute  !left-8px"></el-checkbox>
                                        <video :src="video.upload_dir" :poster="video.info.preview" controls
                                            controlslist="nodownload noremoteplayback"
                                            class="w-100% h-100% outline-none bg-[#e8eaec]">
                                        </video>
                                        <div class="position-absolute right-8px bottom-8px left-8px text-center">
                                            <div class="flex justify-between">
                                                <div class="w-80px line-height-16px color-[#fff] bg-[#00000080]"
                                                    style="border-radius: 2px">
                                                    <span>{{ video.info.dimension }}</span>
                                                </div>
                                                <div class="w-80px line-height-16px color-[#fff] bg-[#00000080]"
                                                    style="border-radius: 2px">
                                                    <span>{{ video.info.duration }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col justify-around px-8px pt-8px pb-10px font-size-12px line-height-20px"
                                        style="border: 1px solid #dcdee2;border-top: 0px;border-bottom-right-radius: 3px;border-bottom-left-radius: 3px;">
                                        <div class="flex justify-between">
                                            <span :title="video.material_name"
                                                class="h-20px overflow-hidden font-600 color-[#333] ellipsis">{{
                                                    video.material_name
                                                }}</span>
                                            <span class="ml-4px flex-shrink-0">{{
                                                video.info.size
                                            }}</span>
                                        </div>

                                        <div class="font-400 color-[#666]"> 上传时间：{{ video.create_time }}</div>
                                        <div class="font-400 color-[#666]"> 累计关联广告数<span>：0</span></div>

                                        <div class="flex flex-row w-100%">
                                            <div class="flex flex-wrap" style="height: 48px;">
                                                <!-- 标签 -->
                                                <!-- <div class="font-400 color-[#666]">
                                                        <span class="px-8px mt-2px mb-6px font-size-12px ellipsis"
                                                            style="border-style: solid;border-width: 1px;border-radius:3px;"
                                                            :style="{ borderColor: '#a5a5a5', color: '#a5a5a5' }">未使用</span>
                                                    </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </el-checkbox-group>
                    <el-empty v-else description="没有数据" />
                </el-scrollbar>

                <!-- 分页 -->
                <el-config-provider :locale="zhCn">
                    <el-pagination class="mt-8px" v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </el-config-provider>
                <!-- <el-tab-pane label="媒体素材" name="media_material">
                <span>
                    媒体素材
                </span> -->
            </el-tab-pane>
        </el-tabs>

        <template #footer>
            <div class="dialog-footer">
                <el-button class="w-120px" @click="handleDialogClose(0)">取消</el-button>
                <el-button :loading="confirmLoading" type="primary" @click="handleDialogClose(1)" class="w-120px">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<script lang="ts" setup>
import { ref, reactive, watchEffect, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { zhCn } from "element-plus/es/locales.mjs";
import "element-plus/es/components/message/style/css";
import {
    type IQueryCommonMaterial,
    queryCommonMaterial,
    type IUploadMaterial2Media,
    uploadMaterial2Media,
} from "@/api/modules/promotion";
import { ElMessage } from "element-plus";

interface IProps {
    visible: boolean;
    title?: string;
    width?: number;
    category: number;
    multiple?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleDialogClose"]);

const dialogState = reactive<IProps>({
    title: props.title,
    visible: false,
    width: 1200,
    multiple: false,
    category: 1
});



const handleDialogClose = (type: number) => {
    if (type === 1) {
        if (selectedVideos.value.length > 0) {
            const material_info = selectedVideos.value.map((video: any) => {
                if (video.mime === "1") {
                    return {
                        filename: video.material_name,
                        mime: video.mime,
                        mat_id: video.material_id,
                        post_url: video.info.preview,
                        url: video.upload_dir,
                        vert_hori: video.vert_hori
                    };
                }
                return {
                    filename: video.material_name,
                    mime: video.mime,
                    mat_id: video.material_id,
                    url: video.upload_dir,
                    vert_hori: video.vert_hori
                };
            });

            uploadMaterial2MediaFunc({
                advertiser_id: "1787695788195915",
                cpnid: "3",
                material_info: material_info,
            });
        } else {
            ElMessage.warning({
                message: "请选择素材",
                type: "warning",
                duration: 2000,
            });
        }
    } else {
        emtis("handleDialogClose", 0);
    }
};

// 素材库tabs
const tabName = ref("material_library");

// tabs切换函数
const handletabsClick = (value: string) => {
    console.log(value);
};

const searchParames = reactive<IQueryCommonMaterial>({
    keyword: "",
    search_type: 2,
    category: undefined,
    status: undefined,
    create_date: "",
});

const searchSelectList = [
    {
        label: "素材ID",
        value: 1,
    },
    {
        label: "素材名称",
        value: 2,
    },
];

const placeholderText = ref("请输入素材名称");

const handleAccountOrIdChange = () => {
    searchParames.keyword = "";
    if (searchParames.search_type === 1) {
        placeholderText.value = "请输入素材ID"
    } else {
        placeholderText.value = "请输入素材名称"
    }
}

const handleSearch = () => {
    console.log(searchParames.keyword)
    console.log(searchParames.search_type)
    matListFunc();
};

const shortcuts = [
    {
        text: "今天",
        value: () => {
            const end = new Date();
            const start = new Date();
            return [start, end];
        },
    },
    {
        text: "昨天",
        value: () => {
            const end = new Date();
            const start = new Date();

            end.setDate(end.getDate() - 1);
            start.setDate(start.getDate() - 1);

            return [start, end];
        },
    },
    {
        text: "近三天",
        value: () => {
            const end = new Date();
            const start = new Date();

            start.setDate(start.getDate() - 3);

            return [start, end];
        },
    },
    {
        text: "近7天",
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 7);
            return [start, end];
        },
    },
    {
        text: "近30天",
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            return [start, end];
        },
    },
    {
        text: "近60天",
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 2);
            return [start, end];
        },
    },
    {
        text: "近90天",
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 3);
            return [start, end];
        },
    },

    {
        text: "近一年",
        value: () => {
            const end = new Date();
            const start = new Date();

            start.setMonth(start.getMonth() - 12);
            return [start, end];
        },
    },
];

const dataPicker = ref();

const handleDatePickerChange = () => {
    searchParames.create_date = dataPicker.value.join(" - ");
    matListFunc();
}


const materialTypeOptions = [
    { label: "视频", value: 1 },
    { label: "图片", value: 2 },
];

const materialStatusOptions = [
    { label: "停用", value: "1" },
    { label: "启用", value: "0" },
];

const handleMaterialTypeOrStatusChange = () => {
    matListFunc();
}


// 清空
const clearSearchParames = () => {
    searchParames.keyword = "";
    searchParames.search_type = 2;
    searchParames.category = undefined;
    searchParames.status = undefined;
    searchParames.create_date = "";
    matListFunc();
}

const selectedVideos = ref([]);
const videos = ref<any[]>([]);
const loading = ref(false)

// 查询素材列表
const matListFunc = async () => {
    loading.value = true;
    const param = {
        keyword: searchParames.keyword,
        search_type: searchParames.search_type,
        category: searchParames.category,
        status: searchParames.status,
        create_date: searchParames.create_date,
        page_no: currentPage.value,
        page_limit: pageSize.value,
    }
    try {
        const res = await queryCommonMaterial(param);
        console.log("matListFunc----->", res);

        if (res.state === 1) {
            videos.value = res.data.list;
            currentPage.value = Number(res.data.page_info.cur_page);
            pageSize.value = Number(res.data.page_info.page_limit);
            total.value = Number(res.data.page_info.total);
        }
    } catch (error) {
        console.error("matListFunc error----->", error);
    } finally {
        loading.value = false;
    }
};

const confirmLoading = ref(false)

// 确认之后上传到媒体接口
const uploadMaterial2MediaFunc = async (params: IUploadMaterial2Media) => {
    confirmLoading.value = true;
    const res = await uploadMaterial2Media(params);
    if (res.state === 1) {
        selectedVideos.value = [];
        emtis("handleDialogClose", { type: 1, form: res.data });
        confirmLoading.value = false;
    }
};

// 分页
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);

const handleSizeChange = () => {
    console.log(pageSize.value)
    matListFunc();
}

const handleCurrentChange = () => {
    console.log(currentPage.value);
    matListFunc();
}




watchEffect(() => {
    dialogState.visible = props.visible;
    dialogState.multiple = props.multiple;
    searchParames.category = props.category;
});

watch(
    () => dialogState.visible,
    () => {
        if (dialogState.visible === true) {
            matListFunc();
        }
    },
);
</script>



<style scoped>
.no-hover {
    pointer-events: none;
}

.no-hover:hover {
    cursor: default
}


.checkbox-item:hover {
    box-shadow: 0 0 6px 0 hsla(0, 0%, 47.5%, .5)
}
</style>


<style>
.el-dialog__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>