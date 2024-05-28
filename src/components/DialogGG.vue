<template>
  <el-dialog v-model="dialogFormVisible" :width="width" :append-to-body="true" :close-on-click-modal="false"
    :before-close="handleClose">
    <template style="margin: 10px">
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
          <el-button @click="handleClose('cancel')" class="w-120px">取消</el-button>
          <el-button type="primary" @click="handleClose('confirm')" class="w-120px">
            确认
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

interface Props {
  title: string
  visable: boolean
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  visable: false,
  width: 992
})

const emit = defineEmits(['handleClose'])

const dialogFormVisible = ref(props.visable)

watchEffect(() => {
  dialogFormVisible.value = props.visable
})

const handleClose = (done: string) => {
  if (typeof done === 'string' && done === 'confirm') {
    emit('handleClose', 'confirm')
  } else {
    dialogFormVisible.value = false
    emit('handleClose', 'cancel')
  }
}
</script>

<style lang="scss">
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
