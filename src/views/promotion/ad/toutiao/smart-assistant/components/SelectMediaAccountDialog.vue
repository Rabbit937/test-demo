<template>
	<Dialog :title="selectPopover.title" :visible="selectPopover.visible" @handleClose="handleDialogClose">
		<!-- 选择媒体账户 -->
		<section class="font-size-12px color-[#666]" v-if="selectPopover.type === 1">
			<el-row class="flex mt-16px mb-16px">
				<el-col :span="1.5" class="mr-8px">
					<el-select v-model="mediaAccountState.mainBody" style="width: 240px" @change="handleMainBodyChange">
						<template #prefix>账户主体:</template>
						<el-option v-for="item in mainBodyOptions" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-col>
				<el-col :span="1.5" class="mr-8px">
					<el-input v-model="mediaAccountState.searchValue" style="max-width: 600px" placeholder="搜索媒体账户">
						<template #append>
							<el-button :icon="Search" size="small" @click="handleSearchClick" />
						</template>
					</el-input>
				</el-col>
				<el-col :span="1.5" class="flex mr-8px">
					<el-button link size="small" type="primary" @click="handleClearClick">清空</el-button>
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
						fixed @selection-change="handleSelectionChange" empty-text="没有数据">
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
import {
	type IQueryAccountList,
	queryCompanyInfo,
	queryAccountList,
} from "@/api/modules/promotion";
import Dialog from "@/components/Dialog.vue";
import Pagination from "@/components/Pagination.vue";

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

watchEffect(() => {
	selectPopover.visible = props.visible;
});

const handleDialogClose = (type: 1 | 0) => {
	if (type === 1) {
		if (multipleSelection.value.length === 0) {
			ElMessage({
				showClose: true,
				message: "请选择一条媒体账户信息",
				type: "warning",
			});
		} else {
			emtis("handleClose", 1, multipleSelection.value);
		}
	} else {
		emtis("handleClose", 0);
	}
};

interface IOption {
	value: string;
	label: string;
}


// 账户选择查询信息
const mediaAccountState = reactive<{
	mainBody: string;
	searchValue: string;
}>({
	mainBody: "1",
	searchValue: "",
});

// 表格信息
const loading = ref(false);
const tableData = ref();
const paginationState = reactive({
	currentPage: 1,
	pageSize: 20,
	total: 10,
});

// 主体选项
const mainBodyOptions = ref<IOption[]>();
// 请求主体函数
const queryCompanyInfoFunc = async () => {
	try {
		const res = await queryCompanyInfo();
		if (res.state === 1) {
			mainBodyOptions.value = res.data.map(
				(item: { id: string; text: string }) => {
					return {
						value: item.id,
						label: item.text,
					};
				},
			);
		} else {
			ElMessage({
				showClose: true,
				message: res.msg,
				type: "warning",
			});
		}
	} catch (error) {
		console.error("queryAccountKvListFunc", error);
	}
};
// 修改主体选项的change函数
const handleMainBodyChange = (value: string) => {
	mediaAccountState.mainBody = value;
	queryAccountListFunc({ PID: "11", CPNID: mediaAccountState.mainBody });
};

onMounted(() => {
	queryCompanyInfoFunc();
	queryAccountListFunc({ PID: "11", CPNID: mediaAccountState.mainBody });
});

const queryAccountListFunc = async (params: IQueryAccountList) => {
	loading.value = true;

	try {
		const res = await queryAccountList(params);

		if (res.state === 1) {
			tableData.value = res.data.list;
			paginationState.total = Number(res.data.page_info.total);
			paginationState.currentPage = Number(res.data.page_info.cur_page);
			paginationState.pageSize = Number(res.data.page_info.page_limit);
		} else {
			ElMessage({
				showClose: true,
				message: res.msg,
				type: "warning",
			});
		}
		loading.value = false;
	} catch (error) {
		console.error("queryAccountListFunc", error);
		ElMessage({
			showClose: true,
			message: "请求失败",
			type: "error",
		});

		loading.value = false;
	}
};


// 搜索媒体账户
const handleSearchClick = () => {
	queryAccountListFunc({ PID: "11", CPNID: mediaAccountState.mainBody, ALIAS: mediaAccountState.searchValue });
}

// 清空
const handleClearClick = () => {
	mediaAccountState.searchValue = "";
	queryAccountListFunc({ PID: "11", CPNID: mediaAccountState.mainBody, ALIAS: mediaAccountState.searchValue });
}


interface IPaginationEvent {
	type: string;
	action: string;
	item: {
		currentPage: number;
		limit: number;
	}
}

// 分页
const handlePaginationEvent = (paginationInfo: IPaginationEvent) => {
	queryAccountListFunc({
		PID: "11",
		CPNID: mediaAccountState.mainBody,
		ALIAS: mediaAccountState.searchValue,
		page_no: paginationInfo.item.currentPage,
		page_limit: paginationInfo.item.limit,
	});
};






// 表格多选
const multipleSelection = ref([]);

const handleSelectionChange = (val: []) => {
	multipleSelection.value = val;
};


</script>
