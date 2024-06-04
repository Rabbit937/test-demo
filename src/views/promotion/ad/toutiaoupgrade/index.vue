<template>
    <el-row class="flex grid-justify-between flex-items-center pl-12px pr-12px"
        style="background-color: #fff;border-bottom: 1px solid #dcdfe6;">
        <el-col :span="6">
            <el-menu :default-active="activeIndex" mode="horizontal" style="border-bottom: 0 !important;"
                @select="selectMenu">
                <el-menu-item :index="item.path" v-for="(item, index) in navList" :key="index"
                    :disabled="item.disabled">
                    {{ item.title }}
                </el-menu-item>
            </el-menu>
        </el-col>

        <el-col :span="1.5">
            <el-button @click="OpenBatch">
                批量新建
            </el-button>
            <el-button class="mr-12px">
                使用已有策略新建
            </el-button>
            <DatePicker v-model:date-value="dateValue" />
        </el-col>
    </el-row>

    <component :is="activeComponent"></component>
</template>

<script lang="ts" setup>
import { type ComponentCustomOptions, onMounted, ref, shallowRef } from "vue";
import AccountVue from "./components/account.vue";
import ProjectVue from "./components/project.vue";
import AdvertisingVue from "./components/advertising.vue";
import type { INav } from "@/layouts/interface/header.type";
import DatePicker from "@/components/DatePicker.vue";
import { useRouter } from "vue-router";

const navList = ref<INav[]>([
	{
		path: "account",
		title: "账户",
	},
	{
		path: "project",
		title: "项目",
	},
	{
		path: "advertising",
		title: "广告",
	},
]);

type Key = "account" | "project" | "advertising";

const componentList: Record<Key, ComponentCustomOptions> = {
	account: AccountVue,
	project: ProjectVue,
	advertising: AdvertisingVue,
};

const activeIndex = ref<Key>("account");
const activeComponent = shallowRef();

onMounted(() => {
	activeComponent.value = componentList[activeIndex.value];
});

const selectMenu = (key: Key) => {
	const component = componentList[key];
	activeComponent.value = component;
};

const dateValue = ref([new Date(), new Date()]);
const router = useRouter();
const OpenBatch = () => {
	const routeData = router.resolve({ path: "/batch" });
	window.open(routeData.href, "_blank");
};
</script>

<style></style>