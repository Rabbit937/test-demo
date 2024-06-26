<template>
    <el-drawer :model-value="drawer" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
        :with-header="false" class="!bg-[#F0F2F5]" :size="size" @before-close="handleClose">
        <header
            class="bg-[#fff] px-16px border-bottom-[#e8eaec] flex align-content-center align-items-center justify-between">
            <slot name="header">
                <div class="font-size-16px font-700 line-height-48px color-[#333]">新建项目</div>
            </slot>
            <el-button @click="handleClose">
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>
        </header>
        <slot></slot>
        <slot name="footer">
            <footer
                class="pos-absolute bottom-0px left-0px w-100% h-70px pl-12px pt-16px pr-24px pb-16px bg-[#fff] border-top-[#e8eaec]">
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

const emits = defineEmits(["handleDrawerClose"]);

const drawer = ref(props.visible);

watchEffect(() => {
    drawer.value = props.visible;
});

const handleClose = () => {
    ElMessageBox.confirm(
        "您确定关闭这个弹窗吗？关闭之后，所编辑的内容将不会保存",
        "提示",
        {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
        },
    )
        .then(() => {
            emits("handleDrawerClose", 0);
        })
};

function cancelClick() {
    emits("handleDrawerClose", 0);
}

function confirmClick() {
    emits("handleDrawerClose", 1);
}
</script>

<style>
.el-drawer__body {
    padding: 0;
}
</style>