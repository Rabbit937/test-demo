<template>
  <el-dialog v-model="dialogVisible" :width="width" :close-on-click-modal="false" @close="handleClose">
    <template style="margin: 10px" #header>
      <slot name="header">
        <el-row>
          <el-text size="large" class="color-dark font-bold">{{ title }}</el-text>
        </el-row>
      </slot>
    </template>
    <slot> </slot>

    <template #footer>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="handleButtonClick(0)" class="w-120px">取消</el-button>
          <el-button type="primary" @click="handleButtonClick(1)" class="w-120px">
            确认
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";

interface Props {
  title: string;
  visible: boolean;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: "标题",
  visible: false,
  width: 992,
});

const emit = defineEmits(["handleClose"]);

const dialogVisible = ref(props.visible);

watchEffect(() => {
  dialogVisible.value = props.visible;
});

const handleClose = () => {
  emit("handleClose", 0);
};

const handleButtonClick = (type: 1 | 0) => {
  if (type === 1) {
    emit("handleClose", 1);
  } else {
    emit("handleClose", 0);
  }
};
</script>

<style scoped>
.el-dialog {
  padding: 0;

  .el-dialog__header {
    padding: 16px 32px;
    border-bottom: 1px solid #e8eaec;

    .el-dialog__headerbtn {
      padding-right: 32px;
    }

    .el-row {
      justify-content: space-between;

      .el-button {
        border: none;
        padding: 0;
      }
    }
  }

  .el-dialog__body {
    padding: 16px 32px;
  }

  .el-dialog__footer {
    padding: 16px 32px;
    border-top: 1px solid #e8eaec;
  }
}
</style>
