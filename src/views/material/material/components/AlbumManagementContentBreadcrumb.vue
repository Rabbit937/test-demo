<template>
  <el-row
    class="pl-16px pt-12px pb-12px pr-16px"
    style="border: solid #e8eaec; border-width: 1px 0px"
  >
    <el-col>
      <el-text v-if="text">{{ text }}</el-text>
      <el-breadcrumb v-else separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadListRef" :key="item.ID">
          <span v-if="breadListRef.length - 1 === index"></span>
          <a @click="handleBreadcrumbItem(item, index)">
            <span>{{ item.ANAME }}</span></a
          >
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

interface Props {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	breadList: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	searchParams: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["handleClick"]);

const breadListRef = ref(props.breadList);
const searchParams = ref(props.searchParams);
const text = ref();

watchEffect(() => {
	breadListRef.value = props.breadList;
	searchParams.value = props.searchParams;
	// // console.log(searchParams.value);

	if (searchParams.value) {
		if (Number(searchParams.value.search_type) === 1) {
			text.value = `搜索「专辑」： ${
				searchParams.value.keyword ? searchParams.value.keyword : "全部"
			}`;
		} else {
			text.value = `搜索「文件夹」： ${
				searchParams.value.keyword ? searchParams.value.keyword : "全部"
			}`;
		}
	} else {
		text.value = "";
	}
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleBreadcrumbItem = (item: any, index: number) => {
	breadListRef.value.splice(index + 1);
	emit("handleClick", { type: "breadcrumb", action: "", item });
};
</script>
