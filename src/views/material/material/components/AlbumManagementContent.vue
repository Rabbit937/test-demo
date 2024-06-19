<template>
  <el-col :span="21" style="background-color: #fff">
    <AlbumManagementContentHeader :treeClickNode="treeClickNode" :treeState="treeState" @handleClick="handleClick" />
    <AlbumManagementContentBreadcrumb :breadList="breadList" @handleClick="handleClick" :searchParams="searchParams" />
    <el-row>
      <el-col>
        <el-scrollbar style="min-height: 100px; max-height: 500px" v-loading="props.materialState.loading">
          <ul class="flex flex-wrap flex-items-stretch p-16px overflow-auto" v-if="showState">
            <MaterialItem :treeState="treeState" :item-list="props.materialState.materialItemList"
              @handleClick="handleClick" />
          </ul>
          <el-empty v-else description="没有数据" />
        </el-scrollbar>

        <el-row>
          <el-col :span="24" class="pl-16px pr-16px pt-5px pb-5px">
            <Pagination :currentPage="props.materialState.currentPage" :pageSize="props.materialState.pageSize"
              :total="props.materialState.total" @handleClick="handleClick" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import AlbumManagementContentHeader from "./AlbumManagementContentHeader.vue";
import AlbumManagementContentBreadcrumb from "./AlbumManagementContentBreadcrumb.vue";
import Pagination from "@/components/Pagination.vue";

import MaterialItem from "./MaterialItem.vue";

interface Props {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  materialState: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  treeClickNode: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  treeState: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  breadList: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  searchParams: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["handleClick"]);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleClick = (params: { type: string; action: string; item: any }) => {
  emit("handleClick", params);
};

const showState = ref(true);

watch(
  () => props.materialState,
  () => {
    if (props.materialState.materialItemList.length > 0) {
      showState.value = true;
    } else {
      showState.value = false;
    }
  },
);
</script>
