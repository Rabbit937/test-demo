<template>
    <Dialog :visible="visible" :title="'选择已有策略'" @handleClose="handleDialogClose">
        <el-row class="flex pl-16px pr-16px pt-12px pb-12px" style="border-bottom:2px solid #f8f8f9;">
            <el-col :span="1.5" class="mr-8px mb-8px">
                <el-select clearable placeholder="全部" style="width: 240px" size="small">
                    <template #prefix>推广目的:</template>

                </el-select>
            </el-col>
            <el-col :span="1.5" class="mr-8px mb-8px">
                <el-select clearable placeholder="全部" style="width: 240px" size="small">
                    <template #prefix>投放模式:</template>

                </el-select>
            </el-col>

            <el-col :span="1.5" class="mr-8px mb-8px">
                <el-select clearable placeholder="全部" style="width: 240px" size="small">
                    <template #prefix>营销场景:</template>

                </el-select>
            </el-col>

            <el-col :span="1.5" class="mr-8px mb-8px">
                <el-select clearable placeholder="全部" style="width: 240px" size="small">
                    <template #prefix>广告类型:</template>

                </el-select>
            </el-col>

            <el-col :span="1.5" class="mr-8px mb-8px">
                <el-select clearable placeholder="全部" style="width: 240px" size="small">
                    <template #prefix>投放类型:</template>

                </el-select>
            </el-col>
            <el-col :span="1.5" class="mr-8px mb-8px">
                <el-input style="width: 240px;max-width: 600px;" placeholder="输入策略名称" size="small">
                    <template #append>
                        <el-button :icon="Search" size="small"></el-button>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="1.5" class="flex mr-8px mb-8px">
                <el-button link size="small" type="primary">清空</el-button>
            </el-col>
        </el-row>
        <section class="mt-16px pl-32px pr-32px min-h-450px max-h-60vh">
            <el-table ref="singleTableRef" :data="tableData" highlight-current-row height="100%" style="width: 100%"
                border :header-cell-style="{ backgroundColor: '#fafafa', color: 'black', fontWeight: '1000' }">
                <el-table-column type="index" align="center" />
                <el-table-column property="date" label="策略组名称" align="center" />
                <el-table-column property="name" label="搭建模式" />
                <el-table-column property="address" label="推广目的" />
                <el-table-column property="address" label="投放模式" />
                <el-table-column property="address" label="营销场景" />
                <el-table-column property="address" label="广告类型" />
                <el-table-column property="address" label="投放类型" />
                <el-table-column property="address" label="描述" />
                <el-table-column property="address" label="操作">
                    <el-button text type="primary" size="small">复制</el-button>
                    <el-button text type="primary" size="small">删除</el-button>
                </el-table-column>
            </el-table>
        </section>
        <section>
            <PaginationVue :currentPage="paginationState.currentPage" :pageSize="paginationState.pageSize"
                :total="paginationState.total">
            </PaginationVue>
        </section>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from "vue";
import Dialog from "@/components/Dialog.vue";
import { Search } from "@element-plus/icons-vue";
import PaginationVue from "@/components/Pagination.vue";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);
const visible = ref(props.visible);

watchEffect(() => {
	visible.value = props.visible;
});

const paginationState = reactive({
	currentPage: 1,
	pageSize: 10,
	total: 10,
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const tableData: any[] = [
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
];

const handleDialogClose = (done: string) => {
	visible.value = false;
	if (done === "confirm") {
		emtis("handleClose", 1);
	} else {
		emtis("handleClose", 0);
	}
};
</script>
