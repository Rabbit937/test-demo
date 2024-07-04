<script lang="ts" setup>
import { ref, onMounted, reactive, watchEffect, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { zhCn } from "element-plus/es/locales.mjs";
import "element-plus/es/components/message/style/css";
import { type IQueryAwemeList, queryAwemeList } from "@/api/modules/promotion";

interface IProps {
    visible: boolean;
    title?: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleDialogClose"]);

const dialogState = reactive({
    title: props.title,
    visible: false,
    width: 1200
});

watchEffect(() => {
    dialogState.visible = props.visible;
});

const handleClose = () => {

}

const activeName = ref('first')

const handletabsClick = () => {

}

const state = reactive({
    keyword: "",
    search_type: 2,
    materialType: "",
    materialStatus: "",
    dateValue: null,
    cascaderValue: "",
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

const materialTypeOptions = [
    { label: "视频", value: 1 },
    {
        label: "图片",
        value: 2,
    },
];

const materialStatusOptions = [
    { label: "停用", value: 1 },
    {
        label: "启用",
        value: 0,
    },
];

const placeholderText = ref("请输入素材名称");

const cascaderOptions = ref();
const cascaderProps = {
    checkStrictly: true,
    value: "ID",
    label: "ANAME",
    children: "CHILD",
};



const handleSearch = () => {
};


const checked1 = ref();


const selectedVideos = ref([])
const videos = [
    {
        id: 1,
        name: '20240702亿游海贼-720P.mp4',
        uploadTime: '2024-07-02',
        totalRelatedAds: 0,
        todayRelatedAds: 1,
        consumption: '无消耗'
    },
    {
        id: 2,
        name: '20240703原神-1080P.mp4',
        uploadTime: '2024-07-03',
        totalRelatedAds: 0,
        todayRelatedAds: 0,
        consumption: '无消耗'
    },
    {
        id: 3,
        name: '20240704王者荣耀-720P.mp4',
        uploadTime: '2024-07-04',
        totalRelatedAds: 0,
        todayRelatedAds: 0,
        consumption: '无消耗'
    }
]

const handleChange = () => {
    
}

</script>

<template>
    <el-dialog v-model="dialogState.visible" :width="dialogState.width" :append-to-body="true"
        :close-on-click-modal="false" :show-close="false" @close="handleClose">
        <div class="position-absolute right-16px">
            <el-button>管理素材</el-button>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handletabsClick">
            <el-tab-pane label="素材库" name="first">
                <div class="max-h-200px px-24px py-12px overflow-hidden border-bottom-[#e8eaec] flex"
                    style="transition: max-height .3s;">
                    <div class="flex" style="flex : 1">
                        <el-form class="flex flex-wrap" style="background-color: #fff">
                            <el-form-item label="名称或ID:">
                                <el-input v-model="state.keyword" :placeholder="placeholderText"
                                    class="input-with-select" style="width: 300px">
                                    <template #prepend>
                                        <el-select v-model="state.search_type" style="width: 110px">
                                            <el-option v-for="(item, index) in searchSelectList" :label="item.label"
                                                :value="item.value" :key="index"></el-option>
                                        </el-select>
                                    </template>
                                    <template #append>
                                        <el-button :icon="Search" @click="handleSearch" />
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-form-item label="类型:" class="pl-16px">
                                <el-config-provider :locale="zhCn">
                                    <el-date-picker v-model="state.dateValue" type="daterange" :shortcuts="shortcuts"
                                        range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"
                                        style="width: 200px">
                                        <template #prepend>
                                            <el-select v-model="state.search_type" style="width: 110px">
                                                <el-option v-for="(item, index) in searchSelectList" :label="item.label"
                                                    :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </template>
                                    </el-date-picker>
                                </el-config-provider>
                            </el-form-item>

                            <el-form-item label="素材目录:" class="pl-16px">
                                <el-cascader v-model="state.cascaderValue" placeholder="全选" :options="cascaderOptions"
                                    :props="cascaderProps" clearable />
                            </el-form-item>

                            <el-form-item label="类型:" class="pl-16px">
                                <el-select v-model="state.materialType" placeholder="请选择素材类型" style="width: 240px"
                                    clearable>
                                    <el-option v-for="item in materialTypeOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>

                            <el-form-item label="素材状态:" class="pl-16px">
                                <el-select v-model="state.materialStatus" placeholder="请选择素材状态" style="width: 240px"
                                    clearable>
                                    <el-option v-for="item in materialStatusOptions" :key="item.value"
                                        :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>

                            <el-form-item label="版式:" class="pl-16px">
                                <el-select v-model="state.materialStatus" placeholder="请选择素材状态" style="width: 240px"
                                    clearable>
                                    <el-option v-for="item in materialStatusOptions" :key="item.value"
                                        :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div>
                        <el-button link>清空</el-button>
                    </div>
                    <div>
                        <el-button link>收起</el-button>
                    </div>
                </div>
                <div class="h-50px flex justify-between align-content-center align-items-center">
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
                </div>

                <div class="px-16px py-24px overflow-auto bg-[#f0f2f5] min-h-150px min-h-300px">

                    <el-checkbox-group v-model="selectedVideos" @change="handleChange">
                        <el-checkbox-group v-for="video in videos" :key="video.id">
                            <el-checkbox :label="video.name" :value="video.id"></el-checkbox>
                            <div class="video-info">
                                <p>{{ video.name }}</p>
                                <p>上传时间：{{ video.uploadTime }}</p>
                                <p>累计关联广告数：{{ video.totalRelatedAds }}</p>
                                <p>今日创量关联广告数：{{ video.todayRelatedAds }}</p>
                                <p>消耗情况：{{ video.consumption }}</p>
                            </div>
                        </el-checkbox-group>
                    </el-checkbox-group>
                </div>
            </el-tab-pane>
            <el-tab-pane label="媒体素材" name="second">Config</el-tab-pane>
        </el-tabs>

        <template #footer>
            <div class="dialog-footer">
                <el-button class="w-120px">取消</el-button>
                <el-button type="primary" class="w-120px">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
