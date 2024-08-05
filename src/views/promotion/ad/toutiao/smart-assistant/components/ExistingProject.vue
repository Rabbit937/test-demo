<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择已有项目 </div>
        </template>
        <main class="m-16px p-16px bg-[#fff]" style="height: calc(100vh - 150px)">
            <el-scrollbar style="width: 100%;height: 100%">
                <div class="w-100% flex ">
                    <div class="w-100%">
                        <div class="w-100% flex flex-wrap">
                            <el-input class="select-with-select mr-8px mb-8px" style="width: 360px">
                                <template #prepend>
                                    <div>
                                        <el-text>媒体账户id</el-text>
                                    </div>
                                </template>
                                <template #append>
                                    <el-select placeholder="请选择创建用户" style="width: 260px"
                                        v-model="searchParams.advertiser_id" @change="queryProjectList">
                                        <el-option v-for="id in advertiser_id_array" :label="id"
                                            :value="id"></el-option>
                                    </el-select>
                                </template>
                            </el-input>

                            <el-input class="select-with-select mr-8px mb-8px" style="width: 360px">
                                <template #prepend>
                                    <div>
                                        <el-text>投放模式</el-text>
                                    </div>
                                </template>
                                <template #append>
                                    <el-select placeholder="请选择投放模式" style="width: 260px"
                                        v-model="searchParams.delivery_mode" @change="queryProjectList">
                                        <el-option v-for="delivery_mode in delivery_mode_radio"
                                            :label="delivery_mode.label" :value="delivery_mode.value"></el-option>
                                    </el-select>
                                </template>
                            </el-input>


                            <el-input class="select-with-select mr-8px mb-8px" style="width: 360px">
                                <template #prepend>
                                    <div>
                                        <el-text>推广目的</el-text>
                                    </div>
                                </template>
                                <template #append>
                                    <el-select placeholder="请选择推广目的" style="width: 260px"
                                        v-model="searchParams.landing_type" @change="queryProjectList">
                                        <el-option v-for="(value, key, index) in landing_type_radio" :label="value"
                                            :value="key" :key="index" />
                                    </el-select>
                                </template>
                            </el-input>

                            <el-input class="select-with-select mr-8px mb-8px" style="width: 360px">
                                <template #prepend>
                                    <div>
                                        <el-text>推广子目的</el-text>
                                    </div>
                                </template>
                                <template #append>
                                    <el-select placeholder="请选择推广子目的" style="width: 260px"
                                        v-model="searchParams.app_promotion_type" @change="queryProjectList">
                                        <el-option v-for="app_promotion_type in app_promotion_type_radio"
                                            :label="app_promotion_type.label" :value="app_promotion_type.value"
                                            :key="app_promotion_type.value" />
                                    </el-select>
                                </template>
                            </el-input>


                            <el-input class="select-with-select mr-8px mb-8px" style="width: 360px">
                                <template #prepend>
                                    <div>
                                        <el-text>营销场景</el-text>
                                    </div>
                                </template>
                                <template #append>
                                    <el-select placeholder="请选择营销场景" style="width: 260px"
                                        v-model="searchParams.marketing_goal" @change="queryProjectList">
                                        <el-option v-for="marketing_goal in marketing_goal_radio"
                                            :label="marketing_goal.label" :value="marketing_goal.value"
                                            :key="marketing_goal.value" />
                                    </el-select>
                                </template>
                            </el-input>



                            <el-input class="input-with-select mr-8px mb-8px" v-model="searchParams.name"
                                style="width: 360px;display: block;">
                                <template #prepend>
                                    <div>
                                        <el-text>名称</el-text>
                                    </div>
                                </template>
                            </el-input>
                        </div>

                        <div class="mt-16px">
                            <div class="h-400px">
                                <el-table class="w-100%" v-loading="tableLoading" :data="tableData" border
                                    align="center" :max-height="400" empty-text="没有数据"
                                    @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" width="55" />
                                    <el-table-column label="投放模式" prop="delivery_mode" align="center">
                                        <template #default="scope">
                                            <div>
                                                <span>
                                                    {{ delivery_mode_radio.filter(delivery_mode => delivery_mode.value
                                                        ===
                                                        scope.row.delivery_mode)[0].label }}
                                                </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="推广目的" prop="landing_type" align="center">
                                        <template #default="scope">
                                            <div>
                                                <span>
                                                    {{ landing_type_radio[String(scope.row.landing_type)] }}
                                                </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="子目标" prop="app_promotion_type" align="center">
                                        <template #default="scope">
                                            <div>
                                                <span>
                                                    {{ scope.row.app_promotion_type ?
                                                        app_promotion_type_radio.filter(app_promotion_type =>
                                                            app_promotion_type.value
                                                            ===
                                                            scope.row.app_promotion_type)[0].label : '' }}
                                                </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="营销场景" prop="marketing_goal" align="center">
                                        <template #default="scope">
                                            <div>
                                                <span>
                                                    {{ marketing_goal_radio.filter(marketing_goal =>
                                                        marketing_goal.value
                                                        ===
                                                        scope.row.marketing_goal)[0].label }}
                                                </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="广告类型" prop="ad_type" align="center">
                                        <template #default="scope">
                                            <div>
                                                <span>
                                                    {{ ad_type_radio.filter(ad_type => ad_type.value
                                                        ===
                                                        scope.row.ad_type)[0].label }}
                                                </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="投放类型" prop="delivery_type" align="center">
                                        <template #default="scope">
                                            <div>
                                                <span>
                                                    {{ delivery_type_radio.filter(delivery_type => delivery_type.value
                                                        ===
                                                        scope.row.delivery_type)[0].label }}
                                                </span>
                                            </div>
                                        </template>

                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="name" align="center" />
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </main>
    </Drawer>
</template>


<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import Drawer from "@/components/Drawer.vue";
import { IQueryProjectList, queryProjectList } from "@/api/modules/promotion";
import { delivery_mode_radio, landing_type_radio, app_promotion_type_radio, marketing_goal_radio, ad_type_radio, delivery_type_radio } from "../../radio-info/NewProject";

interface IProps {
    visible: boolean;
    advertiser_id_array: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);

const drawerOptions = reactive({
    visible: props.visible ?? false,
    size: 1016,
    advertiser_id_array: []
});

const handleDrawerClose = (type: number) => {
    if (type === 1) {
        emits("handleDrawerClose", { type: 1, form: form.value });
    } else {
        emits("handleDrawerClose", { type: 0 });
    }
};


const form = ref()

const searchParams = reactive({
    advertiser_id: '',
    delivery_mode: '',
    landing_type: '',
    app_promotion_type: "",
    marketing_goal: '',
    name: ''
})

const tableData = ref()
const tableLoading = ref(false);

const queryTitleBagFunc = async () => {
    tableLoading.value = true;
    const params: IQueryProjectList = {
        advertiser_id: searchParams.advertiser_id,
        delivery_mode: searchParams.delivery_mode,
        landing_type: searchParams.landing_type,
        app_promotion_type: searchParams.app_promotion_type,
        marketing_goal: searchParams.marketing_goal,
        name: searchParams.name,
    }
    try {
        const res: any = await queryProjectList(params)
        console.log(res);

        if (res.state === 1) {
            tableData.value = res.data.list;
        } else {
            console.error("queryTitleBagFunc------->", res.msg);
        }
    } catch (error) {
        console.error("queryTitleBagFunc------->", error);
    } finally {
        tableLoading.value = false;
    }
};

watchEffect(() => {
    drawerOptions.visible = props.visible;
    searchParams.advertiser_id = props.advertiser_id_array[0];

    if (props.visible === true && props.advertiser_id_array.length > 0) {
        queryTitleBagFunc();
    }
});



const handleSelectionChange = (newSelection: any[]) => {
    console.log(newSelection);
    form.value = newSelection;
}
</script>


<style scoped>
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