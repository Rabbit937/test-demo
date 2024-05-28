<template>
  <el-config-provider :locale="zhCn">
    <el-pagination class="pl-16px" :current-page="currentPage" :page-size="pageSize" :total="total"
      layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :page-sizes="props.pageSizes">
    </el-pagination>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { zhCn } from "element-plus/es/locales.mjs";

export interface Props {
	currentPage: number;
	pageSize: number;
	// pageSizes?: number[],
	total: number;
}

const props = withDefaults(defineProps<Props>(), {
	currentPage: 1,
	pageSize: 10,
	pageSizes: [10, 20, 30, 50, 100],
	total: 0,
});

const emit = defineEmits(["handleClick"]);

const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);
watchEffect(() => {
	pageSize.value = props.pageSize;
});

const handleSizeChange = (size: number) => {
	pageSize.value = size;
	emit("handleClick", {
		type: "pagination",
		action: "sizeChange",
		item: { currentPage: currentPage.value, limit: pageSize.value },
	});
};

const handleCurrentChange = (page: number) => {
	currentPage.value = page;
	emit("handleClick", {
		type: "pagination",
		action: "currentChange",
		item: { currentPage: currentPage.value, limit: pageSize.value },
	});
};
</script>
