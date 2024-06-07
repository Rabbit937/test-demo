<template>
	<Dialog :title="selectPopover.title" :visible="selectPopover.visible" @handleClose="handleDialogClose">
		<!-- 选择媒体账户 -->
		<section class="font-size-12px color-[#666]" v-if="selectPopover.type === 1">
			<el-row class="flex mt-16px mb-16px">
				<!-- <el-col :span="1.5" class="mr-8px">
                    <el-select v-model="mediaAccountState.project" clearable placeholder="全部" style="width: 240px">
                        <template #prefix>创量项目:</template>
<el-option v-for="item in projectOptions" :key="item.value" :label="item.label" :value="item.value" />
</el-select>
</el-col> -->
				<el-col :span="1.5" class="mr-8px">
					<el-select v-model="mediaAccountState.mainBody" clearable placeholder="全部" style="width: 240px">
						<template #prefix>账户主体:</template>
						<el-option v-for="item in mainBodyOptions" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-col>
				<el-col :span="1.5" class="mr-8px">
					<el-input v-model="mediaAccountState.searchValue" style="max-width: 600px" placeholder="搜索媒体账户">
						<template #append>
							<el-button :icon="Search" size="small" />
						</template>
					</el-input>
				</el-col>
				<el-col :span="1.5" class="flex mr-8px">
					<el-button link size="small" type="primary">清空</el-button>
				</el-col>
			</el-row>
			<el-row class="mb-8px">
				<el-col>
					<el-text size="small">
						<el-icon color="#ff9b48">
							<InfoFilled />
						</el-icon>
						仅支持同个主体账户
					</el-text>
				</el-col>
			</el-row>
			<el-row class="mb-8px">
				<el-col>
					<el-text size="small">
						已选<el-text size="small" type="primary" class="!mr-4px !ml-4px">0</el-text>个账户
					</el-text>
					<el-text size="small" type="primary" class="!ml-8px"> 清空已选 </el-text>
				</el-col>
			</el-row>
			<el-row class="mb-8px">
				<el-col>
					<el-table v-loading="loading" :data="tableData" :border="true" style="width: 100%; height: 300px"
						fixed @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55" />
						<el-table-column prop="ADVERTISER_ID" label="账户ID" width="180" />
						<el-table-column prop="ALIAS" label="账户名称" width="180" />
						<el-table-column prop="COMPANY" label="账户主体" sortable />
						<el-table-column prop="REMARK" label="账户备注" />
					</el-table>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<Pagination :currentPage="paginationState.currentPage" :pageSize="paginationState.pageSize"
						:total="paginationState.total" @handleClick="handlePaginationEvent"></Pagination>
				</el-col>
			</el-row>
		</section>
	</Dialog>
</template>


<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { Search } from "@element-plus/icons-vue";
import { getAlbumList } from "@/api/modules/promotion";
import Dialog from "@/components/Dialog.vue";

interface IProps {
	visible: boolean;
	title?: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);

const selectPopover = reactive({
	title: props.title ?? "选择媒体账户",
	visible: false,
	width: 0,
	type: 1,
});

// 表格多选
const multipleSelection = ref([]);

watchEffect(() => {
	selectPopover.visible = props.visible;
});

const handleDialogClose = (type: 1 | 0) => {
	console.log();

	if (type === 1) {
		if (multipleSelection.value.length === 1) {
			emtis("handleClose", 1, multipleSelection.value);
			selectPopover.visible = false;
		} else {
			ElMessage({
				showClose: true,
				message: "请选择一条媒体账户信息",
				type: "warning",
			});
		}
	} else {
		emtis("handleClose", 0);
		selectPopover.visible = false;
	}
};

interface IOption {
	value: string;
	label: string;
}

const mediaAccountState = reactive<{
	project: string;
	mainBody: string;
	searchValue: string;
}>({
	project: "",
	mainBody: "",
	searchValue: "",
});

const mainBodyOptions = ref<IOption[]>();

const loading = ref(false);

const tableData = ref();

const paginationState = reactive({
	currentPage: 1,
	pageSize: 20,
	total: 10,
});

onMounted(() => {
	getAlbumListFunc({ PID: "11" });
});

interface IGetAlbumListFuncParams {
	PID: string;
	page_no?: number;
	page_limit?: number;
}

const getAlbumListFunc = async (params: IGetAlbumListFuncParams) => {
	loading.value = true;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const res: any = await getAlbumList({
		PID: params.PID,
		page_no: params.page_no ?? 0,
		page_limit: params.page_limit ?? 20,
	});

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

const handleSelectionChange = (val: []) => {
	multipleSelection.value = val;
};

interface IPaginationEvent {
	type: string;
	action: string;
	item: {
		currentPage: number;
		limit: number;
	};
}

// 分页
const handlePaginationEvent = (val: IPaginationEvent) => {
	getAlbumListFunc({
		PID: "11",
		page_no: val.item.currentPage,
		page_limit: val.item.limit,
	});
};
</script>
