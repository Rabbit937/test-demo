<template>
  <el-col :span="1.5" class="mr-4">
    <el-input v-model="state.keyword" placeholder="请输入关键词" class="input-with-select" size="small">
      <template #prepend>
        <el-select v-model="state.search_type" style="width: 100px">
          <el-option v-for="(item, index) in searchSelectList" :label="item.label" :value="item.value"
            :key="index"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </el-col>
  <el-col :span="1.5" class="mr-4">
    <el-button @click="clearSeacrhParamsFunc">清空</el-button>
  </el-col>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Search } from "@element-plus/icons-vue";

const emit = defineEmits(["handleClick"]);

const state = reactive({
	keyword: "",
	search_type: 1,
});

const searchSelectList = [
	{
		label: "搜专辑",
		value: 1,
	},
	{
		label: "搜文件夹",
		value: 2,
	},
];

const handleSearch = () => {
	emit("handleClick", state);
};

const clearSeacrhParamsFunc = () => {
	state.keyword = "";
	emit("handleClick", state);
};
</script>
