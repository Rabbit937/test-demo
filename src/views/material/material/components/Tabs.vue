<template>
  <el-tabs v-model="activeTab" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in tabs" :label="item.label" :name="item.name" :key="index"></el-tab-pane>
  </el-tabs>

  <template v-if="activeTab === 'albumManagement'">
    <slot name="album"></slot>
  </template>
  <template v-else>
    <slot name="material"></slot>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
const activeTab = ref("albumManagement");
const tabs = ref([
  {
    label: "专辑管理",
    name: "albumManagement",
  },
  {
    label: "素材管理",
    name: "materialManagement",
  },
]);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab);
  // console.log(event);
};
</script>

<style lang="scss" scoped>
.el-tabs {
  background-color: #fff;
  padding-left: 16px;
}

.el-tabs :deep(.el-tabs__header) {
  margin: 0px;
}

.el-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  font-size: 700;
}
</style>
