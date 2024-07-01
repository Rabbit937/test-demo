<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择落地页</div>
        </template>

        

    </Drawer>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import Drawer from "@/components/Drawer.vue";

interface IProps {
    visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);


const drawerOptions = reactive({
    visible: props.visible ?? false,
    size: 1016,
});

const handleDrawerClose = (type: number) => {
    console.log(type)
    emits('handleDrawerClose', type);
};

watchEffect(() => {
    drawerOptions.visible = props.visible;
});





</script>
