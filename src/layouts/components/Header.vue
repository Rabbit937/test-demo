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
import { onMounted, ref } from 'vue'
import HeaderNav from './HeaderNav.vue';


interface INav {
    path: string
    title: string
    disabled?: boolean
}

const navList = ref<INav[]>([
    {
        path: '/home',
        title: '首页'
    },
    {
        path: '/promotion',
        title: '推广'
    },
    {
        path: '/material',
        title: '素材'
    },
])

const activeIndex = ref()



</script>