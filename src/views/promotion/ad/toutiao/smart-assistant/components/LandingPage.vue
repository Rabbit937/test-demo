<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted, watch } from "vue";
import Drawer from "@/components/Drawer.vue";
import {
    type IQueryLandingPage,
    queryLandingPage,
    type IQueryAccountKvList,
    queryAccountKvList,
    ILandingPage,
    type ISyncLandingPage,
    syncLandingPage
} from "@/api/modules/promotion";
import { ElMessage } from "element-plus";

interface IProps {
    visible: boolean;
    size?: number;
    advertiser_id_array: string[]
}
const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);

const drawerOptions = reactive<IProps>({
    visible: props.visible ?? false,
    size: 1016,
    advertiser_id_array: []
});

const handleDrawerClose = (type: number) => {
    if (type === 1) {
        if (checkedLandingPage.value.length > 0) {
            form.promotion_page_group[0].landing_page = checkedLandingPage.value.map((item) => `${item.siteId}?name=${item.name}`);
            emits("handleDrawerClose", { type: 1, form: form, checkedLandingPage: checkedLandingPage.value });
        } else {
            ElMessage({
                message: "请选择至少一条落地页",
                type: "warning",
            });
        }
    } else {
        emits("handleDrawerClose", { type: 0 });
    }
};

watchEffect(() => {
    drawerOptions.visible = props.visible;
    drawerOptions.advertiser_id_array = props.advertiser_id_array;
});

watch(() => drawerOptions.visible, () => {
    if (drawerOptions.visible) {
        queryAccountKvListFunc({
            PID: "11",
            ADVERTISER_ID: drawerOptions.advertiser_id_array[0]
        });

        queryLandingPageFunc({
            advertiser_id: drawerOptions.advertiser_id_array.join(','),
            page_limit: 1000
        });
    }
})


// 每个广告配置
const each_ad_configuration = ref<number>(1);

// 组件信息
const form = reactive<ILandingPage>({
    // 落地页分配方式
    landing_page_conf: 'same',
    promotion_page_group: [{
        landing_page: []
    }]
})

// 落地页分配方式
const landing_page_allocation_method_radio = [
    {
        label: "全部相同",
        value: "same",
    },
    {
        label: "按账户分配",
        value: "ad_same",
    }
]


// 查询帐号显示列表
const accountList = ref<{
    id: string;
    text: string;
}[]>();
// 选中的帐号
const accountSelected = ref();
// 帐号列表加载loading
const accountList_loading = ref(false);

// 查询帐号列表
const queryAccountKvListFunc = async (params: IQueryAccountKvList) => {
    accountList_loading.value = true;
    try {
        const res = await queryAccountKvList(params);
        if (res.state === 1) {
            accountList.value = res.data;
            accountList_loading.value = false;
        } else {
            console.error("queryAccountListFunc request error");
        }
    } catch (error) {
        console.error(error);
    }
};


// onMounted(() => {
//     queryAccountKvListFunc({
//         PID: "11",
//     });
// });

// 帐号列表切换
const handleAccountListChange = () => {

    if (accountSelected.value) {
        queryLandingPageFunc({
            advertiser_id: accountSelected.value,
            page_limit: 1000
        });
    } else {
        queryLandingPageFunc({
            advertiser_id: drawerOptions.advertiser_id_array.join(','),
            page_limit: 1000
        });
    }

};


// 落地页列表
const LandingPageList = ref();
// 选中的落地页列表
const checkedLandingPage = ref<{ atime: string; name: string; siteId: string; thumbnail: string; }[]>([]);
// 查询落地页列表
const queryLandingPageFunc = async (params: IQueryLandingPage) => {
    const res: any = await queryLandingPage(params);
    if (res.state === 1) {
        LandingPageList.value = res.data.list;
    } else {
        console.error("queryLandingPageFunc request error");
    }
};

// 清空已选中的落地页
const handleCheckedLandingClear = () => {
    checkedLandingPage.value = [];
};

// 删除单个落地页
const handleCheckedLandingDelete = (value: string) => {
    checkedLandingPage.value = checkedLandingPage.value.filter((item) => item.name !== value);
}

// onMounted(() => {
//     queryLandingPageFunc({
//         page_limit: 1000
//     });
// })

// 同步橙子落地页
const syncLandingPageFunc = async (params: ISyncLandingPage) => {
    try {
        const res = await syncLandingPage(params);
        if (res.state === 1) {
            queryLandingPageFunc({
                advertiser_id: accountSelected.value,
                page_limit: 1000
            });
        } else {
            ElMessage({
                type: "warning",
                message: res.msg
            })
        }
        console.log(res);
    } catch (error) {
        console.error(error);
    }
};



// 调用同步接口
const handleAccountListRefresh = () => {
    if (accountSelected.value) {
        syncLandingPageFunc({
            advertiser_id: accountSelected.value,
        })
    } else {
        ElMessage({
            type: "warning",
            message: "请选择一个帐号之后，在进行同步"
        })
    }
};

</script>

<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择落地页</div>
        </template>


        <main class="m-16px p-16px bg-[#fff]" style="height: calc(100vh - 150px)">
            <el-scrollbar style="height: 100%">
                <el-form :label-position="'left'" :label-width="'150'">
                    <el-form-item label="每个广告配置">
                        <el-input-number :min="1" :max="10" v-model="each_ad_configuration"
                            class="mr-8px !w-100px" />个落地页链接
                    </el-form-item>

                    <!-- <el-form-item label="落地页类型">
                        <el-radio-group v-model="landing_page_type">
                            <el-radio-button :value="'orange_landing_page'"> 橙子落地页 </el-radio-button>
                        </el-radio-group>
                    </el-form-item> -->

                    <el-form-item label="落地页分配方式">
                        <el-radio-group v-model="form.landing_page_conf">
                            <el-radio-button v-for="item in landing_page_allocation_method_radio" :label="item.label"
                                :value="item.value"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <el-row class="w-762px  bg-[#fafafa] ">
                    <el-col :span="1.5"
                        class="w-100% h-64px p-8px border-top-[#e8eaec] border-right-[#e8eaec] border-left-[#e8eaec] flex justify-between align-items-center">
                        <el-text>选择落地页</el-text>
                        <!-- <el-button type="primary">多账户刷新</el-button> -->
                    </el-col>
                    <el-col class="p-16px w-100% border-[#e8eaec]" style="border-bottom: none;">
                        <div>
                            <el-select filterable class="!w-480px mr-16px" clearable placeholder="所有账户"
                                v-model="accountSelected" @change="handleAccountListChange">
                                <el-option v-for="item in accountList" :label="item.text" :value="item.id"></el-option>
                            </el-select>
                            <el-button link type="primary" @click="handleAccountListRefresh">同步</el-button>
                        </div>
                    </el-col>

                    <el-col :span="1.5" class="flex p-16px w-100% border-[#e8eaec]">
                        <div class="w-480px h-500px border-[#e8eaec] mr-16px bg-[#fff]">
                            <!-- <div
                                class="header h-48px border-bottom-[#e8eaec] px-16px font-size-12px flex justify-between align-items-center align-content-center">
                                <div class="left flex align-items-center align-content-center ">
                                    <div class="mr-12px">
                                        <span>项目数：5</span>
                                    </div>
                                    <div>
                                        <span>广告数：4</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <el-button>
                                        <el-icon class="mr-4px">
                                            <Edit />
                                        </el-icon>快速选择
                                    </el-button>
                                </div>
                            </div> -->

                            <div
                                class="header h-48px border-bottom-[#e8eaec] px-16px font-size-12px flex align-items-center align-content-center">
                                <div>
                                    <span>落地页名称</span>
                                </div>
                            </div>

                            <div class="header w-100% px-16px font-size-12px flex">
                                <el-scrollbar class="w-100%" height="420">
                                    <el-checkbox-group style="width:calc(100% - 32px)" v-model="checkedLandingPage"
                                        :max="Number(each_ad_configuration)">
                                        <el-checkbox style="width: 100%;" v-for="landingPage in LandingPageList"
                                            :key="landingPage" :label="landingPage" :value="landingPage">
                                            {{ landingPage.name }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-scrollbar>
                            </div>
                        </div>

                        <div class="w-200px border-[#e8eaec] bg-[#fff]">

                            <div class="flex justify-between align-content-center align-items-center  line-height-40px h-40px px-8px font-size-12px bg-[#f8f9fd]"
                                style="border-bottom: 1px solid #dcdee2;">
                                <div>
                                    <span>已选：</span>

                                </div>
                                <div>
                                    <el-button type="primary" link @click="handleCheckedLandingClear">
                                        清空
                                        <el-icon>
                                            <RefreshLeft />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                            <el-scrollbar height="380px">
                                <div class="h-180px px-10px py-7px">
                                    <div>
                                        <div v-for="checkedLanding in checkedLandingPage"
                                            class="flex w-166px font-size-12px h-24px line-height-24px bg-[#f4f5fc] mb-6px border-radius-6px px-8px color-[#515a6e] justify-between overflow-y-auto">
                                            <div>
                                                <span>{{ checkedLanding.name }}</span>
                                            </div>
                                            <div>
                                                <el-button link
                                                    @click="handleCheckedLandingDelete(checkedLanding.name)"><el-icon>
                                                        <CloseBold />
                                                    </el-icon></el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </main>


    </Drawer>
</template>
