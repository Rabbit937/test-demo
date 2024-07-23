<template>
  <el-col :span="3" style="border-right: 1px solid #e8eaec; background-color: #fff">
    <div class="mt-13px mb-8px ml-20px font-size-14px cursor-pointer dark" :class="activeClass ? 'active' : ''"
      @click="handleAllClick">
      全部专辑
    </div>
    <div class="font-size-12px" v-loading="props.treeState.loading">
      <Tree :treeData="props.treeState.treeData" @handle-node-click="handleTreeClick"></Tree>
    </div>
  </el-col>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  treeState: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["handleClick"]);

const activeClass = ref(true);
// biome-ignore lint/complexity/noBannedTypes: <explanation>
let removeSelectedClass: Function;

// 点击全部专辑
const handleAllClick = () => {
  if (removeSelectedClass) removeSelectedClass();
  activeClass.value = true;
  emit("handleClick");
};

// 点击树节点
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleTreeClick = (options: any) => {
  activeClass.value = false;
  removeSelectedClass = options.removeSelectedClass;

  emit("handleClick", options.data);
};
</script>

<style scoped>
.active {
  color: #197afb;
}
</style>
