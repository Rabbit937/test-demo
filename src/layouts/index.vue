<template>
    <div class="h-100vh">
        <el-container class="h-100%">
            <el-header class="border-b-1px border-b-gray border-b-solid" height="64px">
                <HeaderVue></HeaderVue>
            </el-header>
            <el-container style="background-color: #f8f8f9">
                <el-aside width="160px" v-if="showSidebar">
                    <Sidebar :default-active="defaultActive" :menu-items="sidebarList"></Sidebar>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import HeaderVue from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

import homeRoute from "@/router/routes/homeRoute";
import materialRoute from "@/router/routes/materialRoute";
import promotionRoute from "@/router/routes/promotionRoute";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const hasRoutes: Record<string, any> = {
	home: homeRoute,
	material: materialRoute,
	promotion: promotionRoute,
};

const route = useRoute();
const routeTitle = computed(
	() => (route.meta.title ? route.meta.title : route.path) as string,
);
const showSidebar = ref(false);
const defaultActive = ref("");
const sidebarList = ref();

watchEffect(() => {
	showSidebar.value = Boolean(hasRoutes[routeTitle.value]?.children.length > 0);
	defaultActive.value = route.path;
	sidebarList.value = hasRoutes[routeTitle.value]?.children;
});
</script>

<style scoped>
.el-main {
    padding: 0px;
}
</style>