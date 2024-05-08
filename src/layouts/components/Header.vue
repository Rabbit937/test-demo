<template>
	<el-row class="h-100%">
		<el-col :span="2" class="flex self-center">
			<img src="@/assets/images/logo.png" alt="logo" class="w-104px" />
		</el-col>
		<el-col :span="20">
			<HeaderNav :nav-list="navList" :active-index="activeIndex"></HeaderNav>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import HeaderNav from "./HeaderNav.vue";

import type { INav } from '../interface/header.type'


const route = useRoute();

const navList = ref<INav[]>([
	{
		path: "/home",
		title: "首页",
	},
	{
		path: "/promotion",
		title: "推广",
	},
	{
		path: "/material",
		title: "素材",
	},
]);

const activeIndex = computed(() =>
	String(route.meta.activeIndex ? route.meta.activeIndex : route.path),
);
</script>