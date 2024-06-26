<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template #header>
            <header style="position: relative;padding: 0 16px;background-color: #fff;border-bottom: 1px solid #e8eaec;">
                <slot name="header">
                    <div class="font-size-16px font-700 line-height-48px color-[#333]">
                        {{ title }}
                    </div>
                </slot>
            </header>
        </template>

        <el-scrollbar style="height: calc(100vh - 140px)">
            <main class="m-16px h-100%" style="height: calc(100vh - 180px)">
                <section class="mb-16px p-16px h-100%"
                    style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <div>
                        <el-text type="warning">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                            已根据项目基本信息中选中的头条应用：【水了个果（com.slgg.h5）】过滤监测链接组
                        </el-text>
                    </div>
                    <div>
                        <div class="p-8px bg-[#fafafa] flex justify-between align-content-center"
                            style="border:1px solid #e8eaec;border-bottom:none;">
                            <div>
                                <el-text class="font-bold">
                                    选择监测链接组
                                </el-text>
                            </div>
                            <div>
                                <el-button type="primary">
                                    多账户刷新
                                </el-button>
                                <el-button type="primary" plain>
                                    多账户快速选择
                                </el-button>
                            </div>
                        </div>
                        <div class="flex border-[#e8eaec]">
                            <div class="w-127px">
                                <ul>
                                    <li class="flex align-items-center align-content-center h-57px px-8px py-10px font-size-14px color-[#333] cursor-pointer bg-[#fafafa]"
                                        style="border: 1px solid #e8eaec;border-right: none;border-left: none;">
                                        <div class="overflow-hidden line-height-36px ellipsis">
                                            <el-text>加速星期二-天拓-4(1787695788195915)</el-text>
                                        </div>
                                        <div>
                                            <el-icon>
                                                <CircleCheck />
                                            </el-icon>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="p-16px flex" style="border-left: 1px solid #e8eaec;">
                                <div class="w-500px">
                                    <div :span="1.5" class="w-100% flex mb-8px">
                                        <el-input style="max-width: 500px" placeholder="请输入关键词" class="mr-8px" />
                                        <el-button>查询</el-button>
                                    </div>

                                    <div class="w-100%" style="border: 1px solid #dcdee2;">
                                        <div :span="1.5" class="w-100%">
                                            <div class="h-48px px-8px flex align-content-center align-items-center justify-between"
                                                style="border-bottom:1px solid #dcdee2;">
                                                <div :span="1.5" class="font-bold">
                                                    <el-text>项目数：1</el-text>
                                                </div>

                                                <div :span="1.5">
                                                    <el-button link>刷新</el-button>
                                                    <el-button>
                                                        <el-icon>
                                                            <Edit />
                                                        </el-icon>快速选择
                                                    </el-button>
                                                </div>
                                            </div>

                                            <div class="w-100% h-36px px-8px flex align-content-center align-items-center"
                                                style="border-bottom:1px solid #dcdee2;">
                                                <el-checkbox size="small">
                                                    仅看关联数为0
                                                </el-checkbox>
                                            </div>


                                            <div class="w-100% h-36px px-8px flex align-content-center align-items-center justify-between"
                                                style="border-bottom:1px solid #dcdee2;">
                                                <div>
                                                    <el-text size="small">监测链接组名称</el-text>
                                                </div>
                                                <!-- <div>
                                                    <el-text size="small">类型</el-text>
                                                    <el-text size="small">关联项目数</el-text>
                                                </div> -->
                                            </div>

                                            <div class="w-100%" style="height: calc(100vh - 480px)">
                                                <el-scrollbar class="h-100%">
                                                    <el-table class="p-10px min-height-400px" v-if="MonitorGroupList"
                                                        :data="MonitorGroupList" ref="multipleTableRef"
                                                        @selection-change="handleSelectionChange" border>
                                                        <el-table-column type="selection" width="50" />
                                                        <el-table-column property="track_url_group_name" label="名称"
                                                            width="428" />
                                                    </el-table>
                                                    <section v-else
                                                        class="w-100% h-100% flex align-content-center align-items-center justify-center"
                                                        style="height: calc(100vh - 480px)">
                                                        <div class="font-size-12px color-[#606266]">
                                                            <p> 没找到想要的已有监测链接组？请使用本地导入监测链接组 </p>
                                                            <p>已有监测组同步不到问题解决方案：</p>
                                                            <div class="ml-16px">
                                                                <p>1.请先确认搭建账户有共享应用</p>
                                                                <p>
                                                                    2.重新同步事件管理，确保资产同步到创量</p>
                                                                <p>3.重新同步头条应用、头条分包</p>
                                                                <p>
                                                                    4.上述操作完成后请稍等5分钟，然后重新同步已有监测组
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </el-scrollbar>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="w-260px ml-16px">
                                    <div class="w-100% mt-40px"
                                        style="border: 1px solid #dcdee2;height: calc(100vh - 358px);">
                                        <div class="flex justify-between align-content-center align-items-center  line-height-40px h-40px px-8px font-size-12px bg-[#f8f9fd]"
                                            style="border-bottom: 1px solid #dcdee2;">
                                            <div>
                                                <span>已选：</span>
                                                <span v-if="MonitorGroupSelected">1/1</span>
                                                <span v-else>0/1</span>
                                            </div>
                                            <div>
                                                <el-button type="primary" link @click="emptyMonitorGroupSelected">
                                                    清空
                                                    <el-icon>
                                                        <RefreshLeft />
                                                    </el-icon>
                                                </el-button>
                                            </div>
                                        </div>

                                        <div class="p-10px" v-if="MonitorGroupSelected">
                                            <div class="bg-[#fafafa] font-size-12px p-4px color-[#666]">
                                                {{ MonitorGroupSelected[0]?.track_url_group_name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </el-scrollbar>
    </Drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, watchEffect, ref } from "vue";
import Drawer from "@/components/Drawer.vue";
import { type IQueryMonitorGroupList, queryMonitorGroupList } from "@/api/modules/promotion";

interface IProps {
    visible: boolean;
    size?: number;
    type: number;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);

const drawerOptions = reactive({
    visible: props.visible,
    size: props.size || 1016,
});


const title = ref('选择')


watchEffect(() => {
    drawerOptions.visible = props.visible;

    console.log(props)

    if (props.type === 1) {
        title.value = '选择巨量后台检测链接组'
    } else if (props.type === 2) {
        title.value = '选择创量导入检测活动'
    } else {
        title.value = '选择'
    }

});

const handleDrawerClose = (type: number) => {
    emits('handleDrawerClose', type)
};


const MonitorGroupList = ref();

const queryMonitorGroupListFunc = async (params: IQueryMonitorGroupList) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const res: any = await queryMonitorGroupList(params);
    console.log(res);
    if (res.state === 1) {
        MonitorGroupList.value = res.data.list;
    }
};

onMounted(() => {
    queryMonitorGroupListFunc({
        advertiser_id: "1787695788195915",
        download_url:
            "https://apps.bytesfield.com/download/basic/cur/c1e4f76f2c6608cf2ce4f1d00684d6be37439fc5",
    });
});



const MonitorGroupSelected = ref();
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleSelectionChange = (monitorGroup: any) => {
    console.log(monitorGroup.length)
    if (monitorGroup.length === 1) {
        MonitorGroupSelected.value = monitorGroup;
    } else {
        MonitorGroupSelected.value = false;
    }
}

const emptyMonitorGroupSelected = () => {
    MonitorGroupSelected.value = false;
    toggleSelection();
}


const multipleTableRef = ref();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const toggleSelection = (rows?: any) => {
    if (rows) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        rows.forEach((row: any) => {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            multipleTableRef.value!.toggleRowSelection(row, undefined)
        })
    } else {
        multipleTableRef.value?.clearSelection()
    }
}
</script>
