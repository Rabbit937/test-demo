<template>
    <el-menu router :default-active="activeIndex" class="header-menu-container cl-nav" mode="horizontal">
        <el-menu-item :index="item.path" v-for="(item, index) in props.navList" :key="index" :disabled="item.disabled">
            {{ item.title }}
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import type { INav } from "../interface/header.type";

interface Props {
	navList: INav[];
	activeIndex: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped>
.header-menu-container {
    flex: 1;
    height: 100%;
    padding-left: 50px;
    vertical-align: top;
}

.cl-nav {
    border-bottom: 0 !important;
}
</style>