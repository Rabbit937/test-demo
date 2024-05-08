<template>
    <el-menu unique-opened router :default-active="props.defaultActive" style="height: 100%">
        <SidebarItem :menuItems="props.menuItems"></SidebarItem>
    </el-menu>
</template>

<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue'

import type { menuItem } from '../interface/header.type'


interface Props {
    menuItems: menuItem[]
    defaultActive?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>