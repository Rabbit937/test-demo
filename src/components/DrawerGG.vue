<template>
  <el-drawer :model-value="props.visible" :append-to-body="true" :open-delay="100" :show-close="true"
    :close-on-click-modal="true" :before-close="beforeClose" :size="props.size" :with-header="false" lock-scroll
    style="background-color: rgb(240, 242, 245)">
    <!-- 这里放置el-drawer的内容 -->
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts">
interface Props {
	visible: boolean;
	size: number;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits(["update:visible", "close"]);

const beforeClose = () => {
	console.log(123213);
	// 处理关闭el-drawer前的逻辑
	emits("update:visible", false); // 关闭el-drawer
	emits("close"); // 触发close事件
};
</script>

<style>
/* 去掉.el-drawer__body的padding */
.el-drawer__body {
  padding: 0;
  /* 设置padding为0，去除内边距 */
}
</style>
