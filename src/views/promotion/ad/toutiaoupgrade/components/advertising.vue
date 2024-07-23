<template>
    <el-row class="flex pl-12px pr-12px pt-16px pb-16px" style="background-color: #fff;">
        <el-col :span="1.5" class="w-240px mr-8px">
            <el-select size="small">
                <template #prefix>
                    <span>账户主体:</span>
                </template>
            </el-select>
        </el-col>

        <el-col :span="1.5" class="w-240px mr-8px">
            <el-select size="small">
                <template #prefix>
                    <span>创建项目:</span>
                </template>
            </el-select>
        </el-col>
        <el-col :span="1.5" class="w-240px mr-8px">
            <el-select size="small">
                <template #prefix>
                    <span>优化师:</span>
                </template>
            </el-select>
        </el-col>

        <el-col :span="1.5" class="w-240px mr-8px">
            <el-select size="small">
                <template #prefix>
                    <span>产品:</span>
                </template>
            </el-select>
        </el-col>
        <el-col :span="1.5" class="w-180px mr-8px">
            <el-input size="small">
                <template #append>
                    <el-button type="primary" size="small" :icon="Search" />
                </template>
            </el-input>
        </el-col>
        <el-col :span="1.5" class="mr-8px">
            <el-button size="small" link type="primary">清空</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button size="small" type="primary">查询</el-button>
        </el-col>
    </el-row>

    <el-row class="p-16px">
        <!-- 固定导航 -->
        <el-col style="background-color: #fff;" class="pt-8px pr-16px pb-8px pl-16px">
            <el-row class="flex grid-justify-between flex-items-center">
                <el-col :span="1.5">
                    <el-button>添加账户</el-button>
                    <el-button>批量操作</el-button>
                    <el-button>创意清理</el-button>
                    <el-button>自动投放</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button>导出数据</el-button>
                    <el-button>自定义指标</el-button>
                </el-col>
            </el-row>
        </el-col>
        <!-- 表格 -->
        <el-col style="background-color: #fff;">
            <el-table :data="tableData" height="600" style="width: 100%">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </el-col>
        <!-- 分页 -->
        <el-col style="background-color: #fff;" class="pt-8px pr-16px pb-8px pl-16px">
            <!-- <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" /> -->
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
// import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const tableData = [
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		date: "2016-05-08",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		date: "2016-05-06",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		date: "2016-05-07",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
];
</script>