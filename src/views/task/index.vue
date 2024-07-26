<template>
    <section class="px-16px flex h-48px line-height-48px bg-[#fff]">
        <h1 class="flex-1 font-size-16px color-[#333] m-0px">巨量新建任务</h1>
    </section>

    <section class="px-16px py-12px flex flex-wrap align-items-center bg-[#fff] ">
        <div class="w-180px mr-12px mb-12px">
            <el-input v-model="searchParams.name" style="width: 180px" placeholder="搜索任务" class="input-with-select">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>


        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="全部">
                <template #prefix>
                    <span>创建项目:</span>
                </template>
            </el-select>
        </div>

        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="请选择推广目的">
                <template #prefix>
                    <span>推广目的:</span>
                </template>
            </el-select>
        </div>


        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="请选择投放模式">
                <template #prefix>
                    <span>投放模式:</span>
                </template>
            </el-select>
        </div>

        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="请选择营销场景">
                <template #prefix>
                    <span>营销场景:</span>
                </template>
            </el-select>
        </div>

        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="请选择广告类型">
                <template #prefix>
                    <span>广告类型:</span>
                </template>
            </el-select>
        </div>

        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="请选择投放类型">
                <template #prefix>
                    <span>投放类型:</span>
                </template>
            </el-select>
        </div>

        <div class="w-200px mr-12px mb-12px">
            <el-select clearable>
                <template #prefix>
                    <span>提交状态:</span>
                </template>
            </el-select>
        </div>

        <div class="w-200px mr-12px mb-12px">
            <el-select clearable>
                <template #prefix>
                    <span>提交规则:</span>
                </template>
            </el-select>
        </div>
        <div class="mr-12px mb-12px">
            <el-date-picker v-model="searchParams.datePicker" type="daterange" start-placeholder="开始日期"
                end-placeholder="结束日期" />
        </div>

        <div class=" mr-12px mb-12px">
            <el-button link type="primary">
                清空
            </el-button>
        </div>

        <div class=" mr-12px mb-12px">
            <el-button link type="primary">
                刷新列表
            </el-button>
        </div>
    </section>


    <section class="p-16px">
        <div class="bg-[#fff6ee] py-6px px-16px mb-8px" style="border:1px solid #ffddc1;">
            <el-text type="warning"> <el-icon>
                    <WarningFilled />
                </el-icon>默认展示近30天任务记录，通过账户筛选仅支持查询近10天任务；超过10天的任务执行状态可能存在异常</el-text>
        </div>

        <div
            class="flex align-items-center justify-between h-50px px-16px py-8px bg-[#fff] border-[#e8eaec] border-b-0px">
            <el-button type="primary">
                <el-icon>
                    <Plus />
                </el-icon>
                新建广告
            </el-button>
        </div>
        <div>
            <el-table :data="taskProgressTableData" empty-text="没有数据">
                <el-table-column label="任务名称"></el-table-column>
                <el-table-column label="操作"></el-table-column>
                <el-table-column label="推广目的"></el-table-column>
                <el-table-column label="投放模式"></el-table-column>
                <el-table-column label="营销场景"></el-table-column>
                <el-table-column label="广告类型"></el-table-column>
                <el-table-column label="投放类型"></el-table-column>
                <el-table-column label="媒体账户"></el-table-column>
                <el-table-column label="提交规则"></el-table-column>
                <el-table-column label="创建时间"></el-table-column>
                <el-table-column label="执行状态"></el-table-column>
                <el-table-column label="任务详情"></el-table-column>
            </el-table>
        </div>
        <!-- 
        <div>
            <span>分页</span>
        </div> -->
    </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue"
import { type IQueryTaskProgress, queryTaskProgress } from "@/api/modules/promotion";

const searchParams = reactive({
    name: "",
    datePicker: ""
})

const taskProgressTableData = ref();

const queryTaskProgressFunc = async (params: IQueryTaskProgress) => {
    try {
        const res = await queryTaskProgress(params);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}


onMounted(() => {
    queryTaskProgressFunc({});
})

</script>


<style>
.input-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}
</style>