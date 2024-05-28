<template>
    <Dialog :title="selectPopover.title" :visible="selectPopover.visible" @handleClose="handleDialogClose">
        <!-- 选择媒体账户 -->
        <section class="font-size-12px color-[#666]" v-if="selectPopover.type === 1">
            <el-row class="flex mt-16px mb-16px">
                <el-col :span="1.5" class="mr-8px">
                    <el-select v-model="mediaAccountState.project" clearable placeholder="全部" style="width: 240px">
                        <template #prefix>创量项目:</template>
                        <el-option v-for="item in projectOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
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
                        fixed>
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="date" label="账户名称" width="180" />
                        <el-table-column prop="name" label="账户主体" width="180" sortable />
                        <el-table-column prop="address" label="账户备注" />
                        <el-table-column prop="address" label="创量项目" />
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <Pagination :currentPage="paginationState.currentPage" :pageSize="paginationState.pageSize"
                        :total="paginationState.total"></Pagination>
                </el-col>
            </el-row>
        </section>
    </Dialog>
</template>


<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import { Search } from "@element-plus/icons-vue";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);

const selectPopover = reactive({
	title: "",
	visible: false,
	width: 0,
	type: 1,
});

watchEffect(() => {
	selectPopover.visible = props.visible;
	console.log(props.visible);
});

const handleDialogClose = (done: "confirm" | "cancel") => {
	selectPopover.visible = false;
	if (done === "confirm") {
		console.log("confirm");
	} else {
		console.log("cancel");
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

const projectOptions = ref<IOption[]>();
const mainBodyOptions = ref<IOption[]>();

const loading = ref(false);

const tableData = [
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
];

const paginationState = reactive({
	currentPage: 1,
	pageSize: 10,
	total: 10,
});
</script>