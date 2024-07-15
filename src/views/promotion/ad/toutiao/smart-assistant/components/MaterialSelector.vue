<script lang="ts" setup>
import { ref, reactive, watchEffect, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { zhCn } from "element-plus/es/locales.mjs";
import "element-plus/es/components/message/style/css";
import {
	type IMatList,
	type IUploadMaterial2Media,
	matList,
	uploadMaterial2Media,
} from "@/api/modules/promotion";
import { ElMessage } from "element-plus";

interface IProps {
	visible: boolean;
	title?: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleDialogClose"]);

const dialogState = reactive({
	title: props.title,
	visible: false,
	width: 1200,
});

watchEffect(() => {
	dialogState.visible = props.visible;
});

const handleClose = () => {
	console.log("handleClose");
	emtis("handleDialogClose", 0);
};

const handleCancelButton = () => {
	dialogState.visible = false;
	console.log("cancel");
	emtis("handleDialogClose", 0);
};

const handleConfirmButton = () => {
	console.log("confirm");
	// dialogState.visible = false;
	if (selectedVideos.value.length > 0) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const material_info = selectedVideos.value.map((video: any) => {
			if (video.mime === "1") {
				return {
					filename: video.material_name,
					mime: video.mime,
					mat_id: video.material_id,
					post_url: video.info.preview,
				};
			}
			return {
				filename: video.material_name,
				mime: video.mime,
				mat_id: video.material_id,
				url: video.upload_dir,
			};
		});

		uploadMaterial2MediaFunc({
			advertiser_id: "1787695788195915",
			cpnid: "1",
			material_info: material_info,
		});
	} else {
		ElMessage.warning({
			message: "请选择素材",
			type: "warning",
			duration: 2000,
		});
	}
};

const activeName = ref("first");

const handletabsClick = () => {};

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

const handleSearch = () => {};

const checked1 = ref();

const selectedVideos = ref([]);
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const videos = ref<any[]>([]);

const handleChange = () => {
	console.log(selectedVideos.value);
};

const matListFunc = async (param: IMatList) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const res: any = await matList(param);

	console.log(res);

	if (res.state === 1) {
		videos.value = res.data.list;
	}
};

onMounted(() => {
	matListFunc({
		create_date: "2024-04-01 - 2024-06-30",
		category: 1,
	});
});

const uploadMaterial2MediaFunc = async (params: IUploadMaterial2Media) => {
	const res = await uploadMaterial2Media(params);
	console.log(res);
	console.log(res.data);

	if (res.state === 1) {
		selectedVideos.value = [];
		emtis("handleDialogClose", 1, res.data);
	}
};
</script>

<template>
    <el-dialog v-model="dialogState.visible" :width="dialogState.width" :append-to-body="true"
        :close-on-click-modal="false" :show-close="false" :top="'6vh'">
        <div class="position-absolute right-16px z-100">
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
                <el-scrollbar height="320px" class="!bg-[#f0f2f5] p-16px">
                    <el-checkbox-group v-model="selectedVideos" @change="handleChange">
                        <div class=" bg-[#f0f2f5] min-h-150px  flex flex-wrap p-2px">
                            <div class="w-216px position-relative mb-8px mr-8px font-size-12px cursor-pointer bg-[#fff] border-radius-3px checkbox-item"
                                v-for="video in videos" :key="video.id">
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
                                            <!-- <div class="font-400 color-[#666]">
                                                <span class="px-8px mt-2px mb-6px font-size-12px ellipsis"
                                                    style="border-style: solid;border-width: 1px;border-radius:3px;"
                                                    :style="{ borderColor: '#a5a5a5', color: '#a5a5a5' }">未使用</span>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-checkbox-group>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="媒体素材" name="second">
                <span>
                    媒体素材
                </span>
            </el-tab-pane>
        </el-tabs>

        <template #footer>
            <div class="dialog-footer">
                <el-button class="w-120px" @click="handleCancelButton">取消</el-button>
                <el-button type="primary" @click="handleConfirmButton" class="w-120px">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


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