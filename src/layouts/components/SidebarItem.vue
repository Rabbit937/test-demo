<template>
  <template v-for="item in props.menuItems">
    <template v-if="item.children">
      <el-sub-menu :index="item.path" :key="item.path">
        <template #title>
          {{ item.meta.name }}
        </template>
        <SidebarItem :menuItems="item.children"></SidebarItem>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.meta.index" :key="item.path">
        {{ item.meta.name }}
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { menuItem } from '../interface/header.type';

interface Props {
  menuItems?: menuItem[]
}

const props = withDefaults(defineProps<Props>(), {})
</script>
