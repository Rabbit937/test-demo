<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template #header>
            <header style="
          position: relative;
          padding: 0 16px;
          background-color: #fff;
          border-bottom: 1px solid #e8eaec;
          ">
                <slot name="header">
                    <div class="font-size-16px font-700 line-height-48px color-[#333]">账户定向包</div>
                </slot>
            </header>
        </template>



        <el-scrollbar style="height: calc(100vh - 140px)">
            <main class="m-16px pl-16px pr-16px">
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col>
                        <el-text>头条定向包使用注意事项</el-text>
                    </el-col>
                    <el-col>
                        <el-row>
                            <el-col>
                                <el-text>
                                    选择头条定向包
                                </el-text>
                            </el-col>
                            <el-col>
                                <el-button>
                                    多账户刷新
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <ul>
                                    <li>贵州爆户</li>
                                </ul>
                            </el-col>
                            <el-col :span="21">
                                <el-row>
                                    <el-col>
                                        <el-input v-model="keyword" style="max-width: 600px" placeholder="请输入关键词"
                                            clearable>
                                            <template #prepend>
                                                <el-select v-model="keyword_type" style="width: 115px">
                                                    <el-option label="名称" value="name" />
                                                    <el-option label="ID" value="id" />
                                                </el-select>
                                            </template>
                                            <template #append>
                                                <el-button :icon="Search" />
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col>
                                        <el-select style="width:150px;" v-model="delivery_range" clearable>
                                            <el-option v-for="item in delivery_mode_options" :key="item.value"
                                                :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button type="primary">新建头条定向</el-button>
                                    </el-col>

                                    <el-col>
                                        <el-checkbox>
                                            <el-text>仅查看可用的定向包</el-text>
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                            <el-table-column type="selection" width="55" />
                                            <el-table-column v-for="(value, key, index) in tableKey" :prop="key"
                                                :label="value" :width="200" align="center"></el-table-column>
                                        </el-table>

                                        <el-config-provider :locale="zhCn">
                                            <!-- <el-pagination class="mt-10px" v-model:current-page="currentPage"
                                                v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]" background
                                                layout="total, sizes, prev, pager, next, jumper" :total="total"
                                                @size-change="handleSizeChange" @current-change="handlePageChange" /> -->


                                            <el-pagination v-model:current-page="currentPage"
                                                v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]"
                                                layout="total, sizes, prev, pager, next, jumper" :total="400"
                                                @size-change="handleSizeChange" @current-change="handlePageChange" />
                                        </el-config-provider>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </main>
        </el-scrollbar>
    </Drawer>
</template>

<script setup lang="ts">
import { reactive, watchEffect, ref, onMounted } from 'vue'
import Drawer from '@/components/Drawer.vue'
import { Search } from '@element-plus/icons-vue'
import { zhCn } from "element-plus/es/locales.mjs"
import { type IQueryPreferenceList, queryPreferenceList } from '@/api/modules/promotion';


interface IProps {
    visible: boolean;
    size: number
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(['handleDrawerClose'])

const drawerOptions = reactive({
    visible: props.visible,
    size: props.size || 1016,
});

watchEffect(() => {
    drawerOptions.visible = props.visible;
});

const handleDrawerClose = () => {

}

const keyword = ref();
const keyword_type = ref('name')
const delivery_range = ref('UNIVERSAL')

const delivery_mode_options = [
    {
        value: 'DEFAULT',
        label: '默认'
    },
    {
        value: 'UNIVERSAL',
        label: '通投智选'
    },
    {
        value: 'UNION',
        label: '穿山甲'
    }
]

const tableKey = {
    name: "定向包名称",
    audience_package_id: '定向包ID',
    delivery_range: '投放范围',
    landing_type: '定向包类型'
}

const tableData = ref();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleSelectionChange = (row: any) => {

}

const handleSizeChange = (size: number) => {
    console.log(size)
}

const handlePageChange = (page: number) => {
    console.log(page);
}

const queryPreferenceListFunc = async (params: IQueryPreferenceList) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const res: any = await queryPreferenceList(params);
    console.log(res);

    if (res.state === 1) {
        tableData.value = res.data.list;
        total.value = res.data.page_info.total;
        currentPage.value = res.data.page_info.cur_page;
        pageSize.value = res.data.page_info.page_limit;
    }   
}

onMounted(() => {
    queryPreferenceListFunc({
        advertiser_id: 1787695788195915
    });
})


</script>
