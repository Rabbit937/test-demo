<template>
    <div class="h-100vh">
        <el-container class="h-100%">
            <el-header class="border-b-1px border-b-gray border-b-solid" height="64px">
                <HeaderVue></HeaderVue>
            </el-header>
            <el-container style="background-color: #f8f8f9">
                <el-aside width="160px" v-if="showSidebar">
                    <Sidebar :default-active="defaultActive" :menu-items="menuIten"></Sidebar>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import HeaderVue from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

import homeRoute from '@/router/routes/homeRoute'
import materialRoute from '@/router/routes/materialRoute'
import promotionRoute from '@/router/routes/promotionRoute'

const hasRoutes: Record<string, any> = {
    home: homeRoute,
    // material: materialRoute,
    // promotion: promotionRoute
}

const route = useRoute()
const routeTitle = computed(() => (route.meta.title ? route.meta.title : route.path) as string)
const showSidebar = ref(false)
const defaultActive = ref('')
const menuIten = ref()

watchEffect(() => {
    // showSidebar.value = hasRoutes[routeTitle.value]?.children.length > 0 ? true : false
    // defaultActive.value = route.path
    // menuIten.value = hasRoutes[routeTitle.value]?.children
})
</script>

<style scoped>
.el-main {
    padding: 0px;
}
</style>