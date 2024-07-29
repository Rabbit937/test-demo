<template>
    <section class="px-16px flex h-48px line-height-48px bg-[#fff]">
        <h1 class="flex-1 font-size-16px color-[#333] m-0px">巨量新建任务</h1>
    </section>

    <section class="px-16px py-12px flex flex-wrap align-items-center bg-[#fff] ">
        <!-- <div class="w-180px mr-12px mb-12px">
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
</div> -->


        <div class="w-200px mr-12px mb-12px">
            <el-select clearable placeholder="请选择用户" v-model="searchParams.user_id"
                @change="handleMaterialDesignChange">
                <template #prefix>
                    <span>用户名称:</span>
                </template>
                <el-option v-for="item in materialDesignList" :key="item.id" :label="item.text" :value="item.id" />
            </el-select>
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
        <!-- <div class="bg-[#fff6ee] py-6px px-16px mb-8px" style="border:1px solid #ffddc1;">
            <el-text type="warning"> <el-icon>
                    <WarningFilled />
                </el-icon>默认展示近30天任务记录，通过账户筛选仅支持查询近10天任务；超过10天的任务执行状态可能存在异常</el-text>
        </div> -->

        <div
            class="flex align-items-center justify-between h-50px px-16px py-8px bg-[#fff] border-[#e8eaec] !border-b-0px">
            <el-button type="primary">
                <el-icon>
                    <Plus />
                </el-icon>
                新建广告
            </el-button>
        </div>
        <div>
            <el-table v-loading="tableLoading" :data="taskProgressTableData" empty-text="没有数据" border max-height="580">
                <el-table-column label="任务名称" prop="name"></el-table-column>
                <el-table-column label="推广目的" prop="landing_type">
                    <template #default="scope">
                        {{ landing_type_radio[scope.row.landing_type] }}
                    </template>
                </el-table-column>
                <el-table-column label="投放模式" prop="delivery_type">
                    <template #default="scope">
                        {{ delivery_type_radio.filter(delivery_type => delivery_type.value ===
                            scope.row.delivery_type)[0].label }}
                    </template>
                </el-table-column>
                <el-table-column label="营销目标" prop="marketing_goal">
                    <template #default="scope">
                        {{ marketing_goal_radio.filter(marketing_goal => marketing_goal.value ===
                            scope.row.marketing_goal)[0].label }}
                    </template>
                </el-table-column>
                <el-table-column label="广告类型" prop="ad_type">
                    <template #default="scope">
                        {{ ad_type_radio.filter(ad_type => ad_type.value === scope.row.ad_type)[0].label }}
                    </template>
                </el-table-column>
                <el-table-column label="投放类型" prop="delivery_mode">
                    <template #default="scope">
                        {{ delivery_mode_radio.filter(delivery_mode => delivery_mode.value ===
                            scope.row.delivery_mode)[0].label }}
                    </template>
                </el-table-column>
                <el-table-column label="媒体账户" prop="advertiser_id"></el-table-column>
                <el-table-column label="创建时间" prop="atime"></el-table-column>
                <el-table-column label="错误信息" prop="err_msg">
                    <template #default="scope">
                        <el-text size="small" type="danger">
                            {{ scope.row.err_msg }}
                        </el-text>
                    </template>
                </el-table-column>
                <el-table-column label="执行状态" prop="task_desc"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="bg-[#fff] mt-8px py-8px px-8px">
            <el-config-provider :locale="zhCn">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </el-config-provider>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
// import { Search } from "@element-plus/icons-vue"
import { getMaterialDesignList } from "@/api/modules/material";
import { type IQueryTaskProgress, queryTaskProgress, type IDeteleTask, deleteTask } from "@/api/modules/task";
import { delivery_type_radio, landing_type_radio, marketing_goal_radio, ad_type_radio, delivery_mode_radio } from "../promotion/ad/toutiao/radio-info/NewProject";
import { zhCn } from "element-plus/es/locales.mjs";
import { ElMessage, ElMessageBox } from 'element-plus'
import "element-plus/es/components/message-box/style/css";



const searchParams = reactive({
    name: "",
    datePicker: "",
    user_id: ''
})

const taskProgressTableData = ref();
const tableLoading = ref(false);

const queryTaskProgressFunc = async (params: IQueryTaskProgress) => {
    tableLoading.value = true;
    try {
        const res = await queryTaskProgress(params);
        if (res.state === 1) {
            taskProgressTableData.value = res.data.list;
            total.value = Number(res.data.page_info.total);
            currentPage.value = Number(res.data.page_info.cur_page);
            pageSize.value = Number(res.data.page_info.page_limit);
        }
    } catch (error) {
        console.log(error);
    } finally {
        tableLoading.value = false;
    }
}

const materialDesignList = ref();

// 获取用户列表接口
const getMaterialDesignListFunc = async () => {
    try {
        const res = await getMaterialDesignList();
        if (res.state === 1) {
            materialDesignList.value = res.data;
        }
    } catch (error) {
        console.error("getMaterialDesignListFunc---->", error)
    }

};

const handleMaterialDesignChange = () => {
    queryTaskProgressFunc({
        user_id: searchParams.user_id
    })
}


// 分页
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0)

const handleSizeChange = () => {
    queryTaskProgressFunc({
        user_id: searchParams.user_id,
        page_limit: pageSize.value,
        page_no: currentPage.value
    })

}

const handleCurrentChange = () => {
    queryTaskProgressFunc({
        user_id: searchParams.user_id,
        page_limit: pageSize.value,
        page_no: currentPage.value
    })
}

onMounted(() => {
    queryTaskProgressFunc({});
    getMaterialDesignListFunc();
})

// 删除
const handleDelete = (row: any) => {
    ElMessageBox.confirm(
        '确认删除吗？',
        '删除任务',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteTaskFunc({
                id: row.id
            })
        })
        .catch(() => {
            console.log('Cancel')
        })
}


// 删除任务接口
const deleteTaskFunc = async (params: IDeteleTask) => {
    try {
        const res = await deleteTask(params);
        if (res.state === 1) {
            queryTaskProgressFunc({
                user_id: searchParams.user_id,
                page_limit: pageSize.value,
                page_no: currentPage.value
            })
        } else {
            ElMessage({
                type: "error",
                message: res.msg
            })
        }
    } catch (error) {
        console.error("deleteTaskFunc----------->", error)
    }
}

</script>


<style>
.input-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}
</style>