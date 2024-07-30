<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from "vue";
// import { Search } from '@element-plus/icons-vue'
import Drawer from "@/components/Drawer.vue";
import {
    INewTargetingPackage,
    type IQueryTitleBag,
    queryTitleBag,
    staffInfo,
} from "@/api/modules/promotion";
import AddTitlePack from "./AddTitlePack.vue";
import { ElMessage } from "element-plus";

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
    if (type === 1) {
        if (multipleSelection.value.length > 0) {
            form.promotion_title_group = [];
            multipleSelection.value.forEach(select => {
                if (select.name.includes('\n')) {
                    form.promotion_title_group.push({
                        title_material_list: select.name.split('\n').map((item: string) => {
                            return { title: item }
                        })
                    })
                } else {
                    form.promotion_title_group.push({
                        title_material_list: [{
                            title: select.name,
                        }],
                    })
                }
            })
            // console.log("multipleSelection", multipleSelection.value)
            // console.log("promotion_title_group", form.promotion_title_group)
            emits('handleDrawerClose', { type: 1, form: form, titlePackData: multipleSelection.value, })

        } else {
            ElMessage({
                type: "warning",
                message: "请选择至少一条标题信息",
            })
        }
    } else {
        emits("handleDrawerClose", { type: 0 });
    }
};

watchEffect(() => {
    drawerOptions.visible = props.visible;
});


const form = reactive<INewTargetingPackage>({
    title_conf: 'same',
    promotion_title_group: []
})

// 标题来源
const title_source = ref(1);

const title_source_radio = [
    {
        label: "标题包",
        value: 1,
    },
    {
        label: "标题库",
        value: 2,
    },
];

const handleTitleSourceChange = () => {
    queryTitleBagFunc({
        type: String(title_source.value),
        user_id: staffInfoSelected.value,
    });
};

// 标题分配方式
const title_distribution_method_radio = [
    {
        label: "全账户复用",
        value: 'same',
    },
    {
        label: "平均分配",
        value: 'agv',
    },
    {
        label: "分账户选择",
        value: 'ad_same',
    },
];

// 创意内标题数
const creative_title_number = ref(10);
const title_pack_table_data = ref();

const title_pack_table_props = {
    tag_name: "标题包名称",
    user_name: "创建用户",
    titles: "标题数",
    atime: "创建时间",
};

const tableLoading = ref(false);
const queryTitleBagFunc = async (params: IQueryTitleBag) => {
    tableLoading.value = true;
    const res: any = await queryTitleBag(params);

    if (res.state === 1) {
        title_pack_table_data.value = res.data.list;
        tableLoading.value = false;
    }
};

onMounted(() => {
    queryTitleBagFunc({
        type: String(title_source.value),
    });
});

const staffInfoList = ref();
const staffInfoSelected = ref();

const staffInfoFunc = async () => {
    const res: any = await staffInfo();
    if (res.state === 1) {
        staffInfoList.value = res.data;
    }
};

onMounted(() => {
    staffInfoFunc();
});

const handleStaffInfoChange = () => {
    queryTitleBagFunc({
        type: String(title_source.value),
        user_id: staffInfoSelected.value,
    });
};

const handleEdit = () => { };

const AddTitilePackState = reactive({
    title: "添加标题包",
    visible: false,
});

const addTitilePack = () => {
    AddTitilePackState.visible = true;
};

const handleAddTitlePackDialogClose = (type: number) => {
    if (type === 1) {
        AddTitilePackState.visible = false;
        queryTitleBagFunc({
            type: String(title_source.value),
            user_id: staffInfoSelected.value,
        });
    } else {
        AddTitilePackState.visible = false;
    }
};


const multipleSelection = ref<any[]>([]);
// 表格多选
const handleTitlePackDialogSelectionChange = (val: any[]) => {
    multipleSelection.value = val
    console.log(multipleSelection.value);
}
</script>

<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择标题 </div>
        </template>
        <main class="m-16px p-16px bg-[#fff]" style="height: calc(100vh - 150px)">
            <el-scrollbar style="height: 100%">
                <el-form :label-position="'left'" :label-width="'160'">
                    <el-form-item label="标题来源">
                        <el-radio-group v-model="title_source" @change="handleTitleSourceChange">
                            <el-radio-button v-for="item in title_source_radio" :label="item.label"
                                :value="item.value"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="标题分配方式" style="margin-bottom: 0px;">
                        <el-radio-group v-model="form.title_conf">
                            <el-radio-button v-for="item in title_distribution_method_radio" :label="item.label"
                                :value="item.value"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="line-height: 0px;">
                        <el-text size="small" v-if="form.title_conf === 'same'">所有账户都是用一样的标题</el-text>
                        <el-text size="small" v-else-if="form.title_conf === 'agv'">标题平均分到每个账户中</el-text>
                        <el-text size="small" v-else>每个账户单独选择标题</el-text>
                    </el-form-item>

                    <el-form-item label="创意内标题数" v-if="title_source === 2">
                        <el-input style="width: 60px;" v-model="creative_title_number"></el-input>
                    </el-form-item>
                </el-form>

                <div class="flex" style="flex-wrap: nowrap">
                    <div class="w-144px p-8px mr-16px ">
                    </div>
                    <div style="flex:1;">
                        <div class="flex">
                            <el-input class="select-with-select mr-8px" style="width: 360px">
                                <template #prepend>
                                    <div>
                                        <el-text>创建用户</el-text>
                                    </div>
                                </template>
                                <template #append>
                                    <el-select placeholder="请选择创建用户" style="width: 260px" v-model="staffInfoSelected"
                                        clearable @change="handleStaffInfoChange">
                                        <el-option v-for="staffInfo in staffInfoList" :label="staffInfo.text"
                                            :value="staffInfo.id"></el-option>

                                    </el-select>
                                </template>
                            </el-input>
                            <!-- <el-input class="input-with-select mr-8px" style="width: 260px">
                                <template #append>
                                    <el-button :icon="Search" />
                                </template>
                            </el-input> -->
                            <!-- <el-button link type="primary">清空</el-button> -->
                        </div>

                        <div class="mt-16px">
                            <div
                                class="px-16px py-8px border-right-[#e8eaec] border-left-[#e8eaec] border-top-[#e8eaec]">
                                <el-button type="primary" @click="addTitilePack"><el-icon>
                                        <Plus />
                                    </el-icon>新建标题包</el-button>
                            </div>
                            <div class="h-400px">
                                <el-table v-loading="tableLoading" :data="title_pack_table_data" border
                                    style="width:792px" align="center" :max-height="400" empty-text="没有数据"
                                    @selection-change="handleTitlePackDialogSelectionChange">
                                    <el-table-column type="selection" width="55" />
                                    <el-table-column v-for="(value, key) in title_pack_table_props" :prop="key"
                                        :label="value" align="center" />
                                    <el-table-column label="操作" align="center">
                                        <template #default>
                                            <el-button link type="primary" @click="handleEdit()">
                                                编辑
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </main>
    </Drawer>

    <AddTitlePack :visible="AddTitilePackState.visible" :title="AddTitilePackState.title"
        @handleDialogClose="handleAddTitlePackDialogClose" />
</template>


<style>
.select-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}

.select-with-select .el-input__wrapper {
    display: none;
}

.select-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}


.input-with-select .el-input-group__append {
    background-color: var(--el-fill-color-blank);
}
</style>