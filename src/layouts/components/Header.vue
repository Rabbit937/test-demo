<template>
	<el-row class="h-100%">
		<el-col :span="2" class="h-100% flex self-center">
			<el-image style="width:100%; height:100%;" :src="logo" :fit="'contain'" />
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
import logo from '@/assets/images/logo.png'

import type { INav } from "../interface/header.type";

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
	{
		path: "/task",
		title: "任务",
	}
]);

const activeIndex = computed(() =>
	String(route.meta.activeIndex ? route.meta.activeIndex : route.path),
);
</script>