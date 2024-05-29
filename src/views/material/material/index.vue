<template>
  <el-row class="flex grid-justify-between flex-items-center pl-12px pr-12px"
    style="background-color: #fff;border-bottom: 1px solid #dcdfe6;">
    <el-col :span="6">
      <el-menu :default-active="activeIndex" mode="horizontal" style="border-bottom: 0 !important;"
        @select="selectMenu">
        <el-menu-item :index="item.path" v-for="(item, index) in navList" :key="index" :disabled="item.disabled">
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

  <component :is="activeComponent"></component>

</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import type { ComponentCustomOptions } from 'vue'
import AlbumManagement from "./components/AlbumManagement.vue";
import MaterialManagement from "./components/MaterialManagement.vue";
import type { INav } from '@/layouts/interface/header.type'

const navList = ref<INav[]>([
  {
    title: "专辑管理",
    path: "album",
  },
  {
    title: "素材管理",
    path: "material",
  },
]);

type Key = 'album' | 'material';

const componentList: Record<Key, ComponentCustomOptions> = {
  album: AlbumManagement,
  material: MaterialManagement
}

const activeIndex = ref<Key>('album')
const activeComponent = shallowRef()

onMounted(() => {
  activeComponent.value = componentList[activeIndex.value];
})

const selectMenu = (key: Key) => {
  const component = componentList[key]
  activeComponent.value = component;
}

</script>