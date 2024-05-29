<template>
    <el-popover :width="528" trigger="click" @show="showPopover" @hide="hidePopover">
        <template #reference>
            <div>
                <span class="mr-8px">预估生成<span class="color-[#197afb] ml-4px mr-4px">0</span>条广告</span>
                <el-icon :style="dynamicStyles">
                    <ArrowDown />
                </el-icon>
            </div>
        </template>
        <el-table :data="gridData" max-height="500px" :header-row-style="{ fontSize: '12px', fontWeight: 700 }"
            empty-text="没有数据">
            <el-table-column width="200" property="date" label="账户" />
            <el-table-column width="64" property="name" label="项目数" />
            <el-table-column width="80" property="address" label="创意组数" />
            <el-table-column width="80" property="address" label="标题包数" />
            <el-table-column width="64" property="address" label="广告数" />
        </el-table>
    </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue';

const transform = ref("");
const dynamicStyles = computed(() => ({
    transform: transform.value,
    transition: "all .3s",
}));
const showPopover = () => {
    transform.value = "rotate(-180deg)";
};
const hidePopover = () => {
    transform.value = "rotate(0deg)";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const gridData: any[] = [];

</script>