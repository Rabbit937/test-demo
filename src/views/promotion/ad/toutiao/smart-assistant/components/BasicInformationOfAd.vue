<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size" @Close="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">广告基本信息</div>
        </template>
        <el-scrollbar style="height: calc(100vh - 140px)">
            <main class="m-16px pl-16px pr-16px">
                <!-- 推广身份 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">推广身份</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="推广身份">
                                <el-radio-group v-model="promotional_identity">
                                    <el-radio-button :value="1"> 抖音号 </el-radio-button>
                                    <el-radio-button :value="2"> 账户信息 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="匹配方式">
                                <el-radio-group v-model="matching_method">
                                    <el-radio-button :value="1"> 所有广告选择同一抖音号 </el-radio-button>
                                    <el-radio-button :value="2"> 每个账户选择一个抖音号 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择抖音号">
                                <el-radio-group>
                                    <el-button type="primary" @click="selectTikTokAccount">选择抖音号</el-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- 原生锚点 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">原生锚点</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="原生锚点类型">
                                <el-radio-group v-model="native_anchor_type">
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 自动生成 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- 创意组件 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">创意组件</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <!-- <el-form-item label="附加创意组件">
                                <el-radio-group v-model="additional_creative_components">
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->

                            <el-form-item label="行动号召">
                                <el-input placeholder="空格分隔,最多10个,每个标签不超过6个字" v-model="callToAction"
                                    style="width : 244px;" @keyup.enter="addcallToAction" /><el-button type="primary"
                                    @click="addcallToAction">添加（回车键）</el-button>
                            </el-form-item>
                            <el-form-item>
                                <div class="w-374px bg-[#fff] border-[#e8eaec] ">
                                    <div class="flex  px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                        <div>
                                            <el-text>已添加标签</el-text>
                                        </div>
                                        <div>
                                            <el-button link type="primary">清空<el-icon>
                                                    <RefreshRight />
                                                </el-icon></el-button>
                                        </div>
                                    </div>
                                    <div class="h-180px px-10px py-7px">
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap : 5px; ">
                                            <div v-for="callToAction in callToActionList"
                                                class="flex w-166px h-24px line-height-24px bg-[#f4f5fc] mb-6px border-radius-6px px-8px color-[#515a6e] justify-between overflow-y-auto">
                                                <div>
                                                    <span>{{ callToAction }}</span>
                                                </div>
                                                <div>
                                                    <el-button link><el-icon>
                                                            <CloseBold />
                                                        </el-icon></el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div class="w-374px bg-[#fff] border-[#e8eaec] " style="border-left: none">
                                    <div class="flex  px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                        <div>
                                            <el-text>推荐标签</el-text>
                                        </div>
                                        <div>
                                            <el-button link type="primary">清空<el-icon>
                                                    <RefreshRight />
                                                </el-icon></el-button>
                                        </div>
                                    </div>
                                    <div class="h-180px px-10px py-7px flex flex-wrap"
                                        style="justify-content: space-evenly;align-content:flex-start;">
                                        <el-checkbox-group v-model="callToActionList"
                                            style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap : 5px;">
                                            <el-checkbox v-for="item in recommendCallToActionList" :label="item"
                                                :value="item" :key="item" class="!w-100%" />
                                        </el-checkbox-group>

                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-checkbox v-model="enableSmartGenerationChecked" label="开启智能生成" />
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 产品信息 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">产品信息</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="配置模式" style="margin-bottom:0px;">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 统一配置 </el-radio-button>
                                    <el-radio-button :value="1"> 分帐户配置 </el-radio-button>
                                    <el-radio-button :value="2"> 分项目配置 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="产品名称">
                                <el-input placeholder="2-40个字符，中文占两个字符"></el-input>
                            </el-form-item>


                            <el-form-item label="产品主图">
                                <el-input placeholder="2-40个字符，中文占两个字符"></el-input>
                            </el-form-item>

                            <el-form-item label="产品卖点">
                            </el-form-item>

                            <el-form-item>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 广告设置 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">广告设置</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="广告评论">
                                <el-radio-group v-model="additional_creative_components">
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button link type="primary">展开品牌信息设置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- 广告预算与出价 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">广告预算与出价</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="预算出价配置模式">
                                <el-radio-group>
                                    <el-radio-button>统一配置</el-radio-button>
                                    <el-radio-button>分帐户配置</el-radio-button>
                                    <el-radio-button>分项目配置</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>



                <!-- 广告名称 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">广告名称</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="广告名称">

                            </el-form-item>
                            <el-form-item>
                                <el-text>通配符</el-text>
                                <el-text>+渠道包名</el-text>
                                <el-text>+监测活动名</el-text>
                                <el-text>+已有监测链接组名</el-text>
                                <el-text>+插入更多</el-text>
                            </el-form-item>
                            <el-form-item label="广告默认状态">
                                <el-radio-group>
                                    <el-radio-button>暂停</el-radio-button>
                                    <el-radio-button>开启</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 
                            <el-form-item>
                                <el-checkbox>
                                    <el-text>搜索快投豁免（仅支持媒体平台申请了搜索快投豁免账户，否则“出价系数”和“定向拓展”媒体API将默认开启)</el-text>
                                </el-checkbox>
                            </el-form-item> -->
                        </el-form>
                    </el-col>
                </el-row>
            </main>
        </el-scrollbar>
    </Drawer>


    <!-- 选择抖音号 -->
    <SelectTikTokAccount :visible="SelectTikTokAccountState.visible" :title="SelectTikTokAccountState.title"
        @handleDialogClose="selectTikTokAccountDialog" />
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import Drawer from "@/components/Drawer.vue";
import SelectTikTokAccount from './SelectTikTokAccount.vue'
import { type ICreatePromotion, createPromotion } from '@/api/modules/promotion'
import { watch } from "vue";

interface IProps {
    visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});

const drawerOptions = reactive({
    visible: props.visible ?? false,
    size: 1016,
});

const handleDrawerClose = () => {
};

watchEffect(() => {
    drawerOptions.visible = props.visible;
});



const form: ICreatePromotion = reactive({

})

const promotional_identity = ref(1)
const matching_method = ref(1)
const native_anchor_type = ref(1);
const additional_creative_components = ref(1)

const SelectTikTokAccountState = reactive({
    visible: false,
    title: '选择抖音号'
})

const selectTikTokAccount = () => {
    SelectTikTokAccountState.visible = true;
}
const selectTikTokAccountDialog = () => {
    SelectTikTokAccountState.visible = false;
}


const callToAction = ref<string>();
const callToActionList = ref<string[]>([])

const addcallToAction = () => {
    if (callToAction.value) {
        if (callToAction.value.length < 10) {
            callToActionList.value.push(callToAction.value)
        }
    }
}

const recommendCallToActionList = [
    '一键领取',
    '了解更多',
    '官方下载',
    '更多精彩',
    '极速下载',
    '查看详情',
    '立即下载',
    '立即预约',
    '领取优惠',
    '领取卡券',
    '马上领取'
]

watch(() => callToActionList.value, (newVal, oldVal) => {
    console.log(newVal, oldVal);



})



const enableSmartGenerationChecked = ref(false);

</script>
