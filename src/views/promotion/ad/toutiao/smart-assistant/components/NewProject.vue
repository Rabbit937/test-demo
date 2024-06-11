<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <el-scrollbar style="height: calc(100vh - 140px)">
            <main class="m-16px pl-16px pr-16px">
                <!-- 推广目的 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">推广目的</el-col>
                    <el-col class="p-16px mb-8px">
                        <el-form class="flex flex-wrap">
                            <el-form-item v-for="item in boxCardItem" :key="item.id"
                                @click="handleBoxCardItem(item.id)">
                                <div class="flex w-208px p-16px pt-12px pb-24px mr-16px cursor-pointer"
                                    style="border: 1px solid #e8eaec; border-radius: 3px"
                                    :style="item.active === true ? { borderColor: '#197afb' } : ''">
                                    <div>
                                        <div>{{ item.title }}</div>
                                        <div class="w-110px line-height-18px h-30px  color-[#999] font-size-12px">
                                            {{ item.content }}
                                        </div>
                                    </div>
                                    <div>
                                        <img class="w-48px h-48px" style="transform: translate(16px, 16px)"
                                            src="https://cl.mobgi.com//img/application.565e6114.png" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <el-col class="pl-16px pr-16px mb-24px">
                        <el-radio-group v-model="globalState.app_promotion_type">
                            <el-radio-button v-for="(item, index) in app_promotion_type_radio" :value="item.value">
                                {{ item.label }}
                            </el-radio-button>
                        </el-radio-group>
                        <div>
                            <el-text size="small" class="line-height-24px color-[#999]">吸引用户下载并安装您的应用程序</el-text>
                        </div>
                    </el-col>

                    <el-col class="pl-16px pr-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="投放模式">
                                <el-radio-group v-model="globalState.delivery_mode">
                                    <el-radio-button v-for="(item, index) in delivery_mode_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="营销场景">
                                <el-radio-group v-model="globalState.marketing_goal">
                                    <el-radio-button v-for="(item, index) in marketing_goal_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="广告类型">
                                <el-radio-group v-model="globalState.ad_type">
                                    <el-radio-button v-for="(item, index) in ad_type_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="投放类型">
                                <el-radio-group v-model="globalState.delivery_type">
                                    <el-radio-button :value="'NORMAL'"> 常规投放 </el-radio-button>
                                    <el-popover placement="right-start" :width="200" trigger="hover"
                                        content="媒体API暂不支持通投广告搭建周期稳投">
                                        <template #reference>
                                            <el-radio-button :value="'DURATION'" disabled> 周期稳投 </el-radio-button>
                                        </template>
                                    </el-popover>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 投放内容与目标 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放内容与目标</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="平台类型">
                                <el-radio-group v-model="globalState.platform_type">
                                    <el-radio-button v-for="(item) in platform_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.value }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="头条应用" v-if="globalState.platform_type === 'Android'">
                                <el-select-v2 v-model="globalState.app_name" :options="headline_application_options"
                                    placeholder="请选择" style="width: 300px" />
                            </el-form-item>
                            <el-form-item label="应用名称">
                                <el-input style="width: 300px" placeholder="请输入应用名称" v-model="globalState.app_name" />
                            </el-form-item>

                            <el-form-item label="检测链接来源">
                                <el-radio-group v-model="globalState.detect_link_source">
                                    <el-radio-button :value="1"> 巨量后台检测链接组 </el-radio-button>
                                    <el-radio-button :value="2"> 创量导入检测活动 </el-radio-button>
                                    <el-radio-button :value="3"> 手动输入 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="选择链接组">
                                <el-button type="primary" :disabled="globalState.app_name ? false : true"
                                    @click="selectConnectionGroup">选择链接组</el-button>
                            </el-form-item>

                            <el-form-item label="下载方式">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 直接下载 </el-radio-button>
                                    <el-radio-button :value="2"> 落地页下载 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <!-- <el-form-item label="优先应用商店下载" v-if="globalState.platformType !== 1">
                                <el-radio-group>
                                    <el-radio-button>直接下载</el-radio-button>
                                    <el-radio-button>落地页下载</el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->
                            <!-- 
                            <el-form-item label="数据对接方式">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 事件管理 </el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->


                            <!--           <el-form-item label="优化目标">
                                <el-form :label-width="144" label-position="left" class="p-16px pr-40px"
                                    style="border: 1px solid #e8eaec">
                                    <el-form-item label="事件回传方式" style="margin-bottom: 16px">
                                        <el-radio-group>
                                            <el-radio-button :value="1"> 应用SDK回传 </el-radio-button>
                                            <el-radio-button :value="1"> 应用API回传 </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="优化目标" style="margin-bottom: 16px">
                                        <el-select style="width: 360px"></el-select>
                                    </el-form-item>
                                    <el-form-item label="深度优化目标">
                                        <el-select style="width: 360px"></el-select>
                                    </el-form-item>
                                </el-form>
                            </el-form-item> -->
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 投放版位 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放版位</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="广告位置" style="margin-bottom:0px;">
                                <el-radio-group v-model="globalState.advertisingPosition">
                                    <el-radio-button :value="1"> 通选智选 </el-radio-button>
                                    <el-radio-button :value="2"> 首选媒体 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text>通投智选下，广告会投到信息流和搜索场景，提升单计划跑量与效果稳定性</el-text>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 用户定向 -->
                <!--         <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">用户定向</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="定向包来源">
                                <el-radio-group v-model="userTargeting.targetedPackageSource">
                                    <el-radio-button :value="1"> 账户已有定向包 </el-radio-button>
                                    <el-radio-button :value="2"> 创量定向包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="匹配方式">
                                <el-radio-group v-model="userTargeting.matchingMethod">
                                    <el-radio-button :value="1"> 每个账户选择一个定向包 </el-radio-button>
                                    <el-radio-button :value="2"> 每个项目选择一个定向包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择定向包">
                                <el-button type="primary">选择定向包</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row> -->

                <!-- 项目排期与预算 -->
                <!--              <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">项目排期与预算</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="投放时间">
                                <el-radio-group v-model="projectScheduleAndBudget.deliveryTime">
                                    <el-radio-button :value="1"> 从今天到长期投放 </el-radio-button>
                                    <el-radio-button :value="2"> 设置开始和结束日期 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="投放时段">
                                <el-radio-group v-model="projectScheduleAndBudget.deliveryPeriod">
                                    <el-radio-button :value="1"> 不限 </el-radio-button>
                                    <el-radio-button :value="2"> 指定时间段 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="竞价策略">
                                <div class="w-110px flex flex-col mr-10px p-12px cursor-pointer"
                                    v-for="item in boxCardBiddingStrategy" :key="item.id"
                                    @click="handleBoxCardBiddingStrategy(item.id)"
                                    style="border: 1px solid #e8eaec;border-radius: 4px;"
                                    :style="item.active ? { borderColor: '#197afb' } : ''">
                                    <div class="font-size-14px font-700 color-[#333]"
                                        :style="item.active ? { color: '#197afb' } : ''">
                                        {{ item.title }}</div>
                                    <div class="color-[#999] font-size-12px h-32px line-height-16px"
                                        :style="item.active ? { color: '#197afb' } : ''">
                                        {{ item.content }}
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-text> 巨量广告媒体加白功能，确认账户拥有权限再启用</el-text>
                            </el-form-item>

                            <el-form-item label="项目预算">
                                <el-radio-group v-model="projectScheduleAndBudget.projectBudget">
                                    <el-radio-button :value="1"> 不限 </el-radio-button>
                                    <el-radio-button :value="2"> 日预算 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="付费方式">
                                <el-radio-group v-model="projectScheduleAndBudget.paymentMethod">
                                    <el-radio-button :value="1"> 目标转化出价-按展示付费 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row> -->



                <!-- 搜索快投 -->
                <!--          <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">搜索快投</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="关键词">

                            </el-form-item>
                            <el-form-item label="出价系数" style="margin-bottom: 0px;">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text>不启用出价系数时默认出价系数为1（仅针对可设置出价系数的账户生效）</el-text>
                            </el-form-item>

                            <el-form-item>
                                <el-input placeholder="请输入出价系数" />
                            </el-form-item>

                            <el-form-item label="定向扩展">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item>
                                <el-checkbox>
                                    <el-text>搜索快投豁免（仅支持媒体平台申请了搜索快投豁免账户，否则“出价系数”和“定向拓展”媒体API将默认开启)</el-text>
                                </el-checkbox>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row> -->



                <!-- 项目名称 -->
                <!--         <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">项目名称</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="项目名称">

                            </el-form-item>
                            <el-form-item label="项目默认状态">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 暂停 </el-radio-button>
                                    <el-radio-button :value="2"> 开启 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row> -->
            </main>
        </el-scrollbar>
    </Drawer>

    <ConnectionGroup :visible="ConnectionGroupState.visible" :type="ConnectionGroupState.type"
        :title="ConnectionGroupState.title" />
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, watchEffect, onMounted, nextTick } from "vue";
import Drawer from "@/components/Drawer.vue";
import ConnectionGroup from './ConnectionGroup.vue'

import { ElMessageBox } from "element-plus";
import "element-plus/es/components/message-box/style/css";
import { WarningFilled } from "@element-plus/icons-vue";

import { queryAndroidAppList } from '@/api/modules/promotion'

interface IProps {
    visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(['handleNewProjectClose'])

const drawerOptions = reactive({
    visible: props.visible,
    size: 1016,
});

watchEffect(() => {
    drawerOptions.visible = props.visible;
});

const handleDrawerClose = (type: number) => {
    emits('handleNewProjectClose', type)
};



const globalState = reactive({
    advertiser_id: '',
    operation: 'ENABLE', // DISABLE
    delivery_mode: 'MANUAL',
    app_promotion_type: 'DOWNLOAD',
    landing_type: 'APP',
    marketing_goal: 'VIDEO_AND_IMAGE',
    ad_type: "ALL",
    delivery_type: 'NORMAL',
    name: '',
    platform_type: '',
    app_name: '',

    // 检测链接来源
    detect_link_source: 1,


});

// 子目标
const app_promotion_type_radio = [
    {
        value: "DOWNLOAD",
        label: "应用下载"
    },
    {
        value: "LAUNCH",
        label: "应用调起"
    },
    {
        value: "RESERVE",
        label: "预约下载"
    },
]

//  投放模式
const delivery_mode_radio = [
    {
        value: "MANUAL",
        label: "手动投放"
    },
    {
        value: "PROCEDURAL",
        label: "自动投放(UBMax)"
    },
]

// 营销场景
const marketing_goal_radio = [
    {
        value: "VIDEO_AND_IMAGE",
        label: "短视频/图片"
    },
    {
        value: "LIVE",
        label: "直播"
    },
]

// 广告类型
const ad_type_radio = [
    {
        value: "ALL",
        label: "通投广告"
    },
    {
        value: "SEARCH",
        label: "搜索广告"
    },
]

// 投放类型
const delivery_type_radio = [
    {
        value: 'NORMAL',
        label: '常规投放'
    },
    {
        value: 'DURATION',
        label: '周期稳投'
    },
]

// 平台类型
const platform_type_radio = [
    {
        value: 'Android',
    },
    {
        value: 'IOS',
    },
]

// 头条应用
const AndroidAppList = ref();
const headline_application_options = ref();

interface IQueryAndroidAppList {
    advertiser_id: string;
    page_limit: number
}

const queryAndroidAppListFunc = async (params: IQueryAndroidAppList) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const res: any = await queryAndroidAppList(params)
    AndroidAppList.value = res.data.list;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    headline_application_options.value = res.data.list.map((item: any) => ({
        value: `${item.app_name}-${item.package_name}`,
        label: `${item.app_name}(${item.package_name})`,
    }))
}

onMounted(() => {
    queryAndroidAppListFunc({ advertiser_id: "1787695788195915", page_limit: 1000 });
})


// ConnectionGroup
const ConnectionGroupState = reactive({
    visible: false,
    type: 0,
    title: ''
})

const selectConnectionGroup = () => {
    console.log(globalState.detect_link_source)

    ConnectionGroupState.visible = true;
    ConnectionGroupState.type = globalState.detect_link_source;
    ConnectionGroupState.title = '选择巨量后台监测连接组';

}







const boxCardItem = ref([
    {
        id: 0,
        title: "应用推广",
        content: "推广您的线上APP",
        active: true,
        value: 'APP'
    },
    {
        id: 1,
        title: "小程序",
        content: "吸引更多用户进入小程序",
        active: false,
        value: 'MICRO_GAME'
    },
    {
        id: 2,
        title: "快应用",
        content: "吸引更多用户进入快应用",
        active: false,
        value: 'QUICK_APP'
    },
]);

const handleBoxCardItem = (id: number) => {
    ElMessageBox.confirm(
        "切换推广目的将会清空您已填写的所有内容，是否继续切换？",
        "提示",
        {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            icon: markRaw(WarningFilled),
        },
    ).then(() => {
        boxCardItem.value = boxCardItem.value.map((item) => {
            item.active = false;
            if (item.id === id) {
                item.active = true;
                globalState.landing_type = item.value;
            }
            return {
                id: item.id,
                title: item.title,
                content: item.content,
                active: item.active,
                value: item.value
            };
        });
    });
};





// const boxCardBiddingStrategy = ref([
//     {
//         id: 0,
//         title: "稳定成本-常规版",
//         content: "成本稳定在出价附近",
//         active: true,
//     },
//     {
//         id: 1,
//         title: "稳定成本-升级版",
//         content: "广告潜力探索",
//         active: false,
//     },
//     {
//         id: 2,
//         title: "放量投放",
//         content: "成本上浮，获取更多跑量",
//         active: false,
//     },
//     {
//         id: 3,
//         title: "最优成本",
//         content: "均匀消耗预算，成本不超过出价",
//         active: false,
//     },
//     {
//         id: 4,
//         title: "最大转化",
//         content: "花完预算，拿到最大转化（价值）",
//         active: false,
//     },
// ]);



// // 用户定向
// const userTargeting = reactive({
//     targetedPackageSource: 1, // 定向包来源
//     matchingMethod: 1, // 匹配方式
// });

// // 项目排期与预算
// const projectScheduleAndBudget = reactive({
//     deliveryTime: 1, // 投放时间
//     deliveryPeriod: 1, // 投放时段
//     biddingStrategy: 1, // 竞价策略
//     projectBudget: 1, // 项目预算
//     paymentMethod: 1, // 付费方式
// });

// const handleBoxCardBiddingStrategy = (id: number) => {
//     boxCardBiddingStrategy.value = boxCardBiddingStrategy.value.map((item) => {
//         item.active = false;
//         if (item.id === id) {
//             item.active = true;
//             projectScheduleAndBudget.biddingStrategy = id;
//         }
//         return {
//             id: item.id,
//             title: item.title,
//             content: item.content,
//             active: item.active,
//         };
//     });
// };

// 投放模式切换
// const handleDeliveryModeChange = (value: string | number | boolean) => {
// if (value === 1) {
// globalState.relatedProducts = 2;
// } else {
// globalState.relatedProducts = 1;
// }
// };

// // 选择产品
// const selectProduct = () => {

// }

</script>
