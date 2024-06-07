<template>
    <el-drawer :model-value="drawer" :append-to-body="true" :open-delay="100" :show-close="true"
        :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose" :size="props.size" :with-header="false" lock-scroll
        style="background-color: rgb(240, 242, 245)">
        <header style="
          position: relative;
          padding: 0 16px;
          background-color: #fff;
          border-bottom: 1px solid #e8eaec;
          ">
            <slot name="header">
                <div class="font-size-16px font-700 line-height-48px color-[#333]">新建项目</div>
            </slot>
        </header>
        <slot></slot>
        <slot name="footer">
            <footer class="pos-absolute bottom-0px left-0px w-100% h-70px pl-12px pt-16px pr-24px pb-16px"
                style="background-color: #fff; border-top: 1px solid #e8eaec">
                <div class="flex flex-items-start h-70px pt-12px">
                    <div class="pos-absolute right-16px">
                        <el-button class="w-88px" @click="cancelClick">取消</el-button>
                        <el-button class="w-88px" type="primary" @click="confirmClick">确认</el-button>
                    </div>
                </div>
            </footer>
        </slot>

    </el-drawer>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { ElMessageBox } from "element-plus";
import "element-plus/es/components/message-box/style/css";

interface Props {
    visible: boolean;
    size?: number;
}

const props = withDefaults(defineProps<Props>(), {
    size: 1016,
});

const emits = defineEmits(['handleDrawerClose']);

const drawer = ref(props.visible);

watchEffect(() => {
    drawer.value = props.visible;
})



const handleClose = (done: () => void) => {
    ElMessageBox.confirm(
        "您确定关闭这个弹窗吗？关闭之后，所编辑的内容将不会保存",
        "提示",
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            done();

        })
        .catch(() => {
            // catch error
            console.error("drawer component: fail");
        });
};


function cancelClick() {
    // drawer.value = false
    emits('handleDrawerClose', 0)
}

function confirmClick() {
    // drawer.value = false
    emits('handleDrawerClose', 1)
}
</script>

<style>
.el-drawer__body {
    padding: 0;
}
</style>