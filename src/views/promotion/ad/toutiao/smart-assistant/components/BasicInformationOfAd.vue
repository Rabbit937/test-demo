<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
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
                            <el-form-item label="匹配方式" v-if="promotional_identity === 1">
                                <el-radio-group v-model="form.promotion_aweme">
                                    <el-radio-button :value="'same'"> 所有广告选择同一抖音号 </el-radio-button>
                                    <el-radio-button :value="'ad_same'"> 每个账户选择一个抖音号 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择抖音号" v-if="promotional_identity === 1">
                                <el-radio-group>
                                    <el-button type="primary" @click="selectTikTokAccount">选择抖音号</el-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <!-- 原生锚点 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px"
                    v-if="promotional_identity === 1">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">原生锚点</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="原生锚点类型">
                                <el-radio-group v-model="form.anchor_related_type">
                                    <el-radio-button :value="'OFF'"> 不启用 </el-radio-button>
                                    <el-radio-button :value="'AUTO'"> 自动生成 </el-radio-button>
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
                                    style="width : 244px;" @keyup.enter="addcallToAction" :maxlength="12"
                                    :minlength="6" /><el-button type="primary"
                                    @click="addcallToAction">添加（回车键）</el-button>
                            </el-form-item>
                            <el-form-item style="margin-bottom:0px;">
                                <div class="w-374px bg-[#fff] border-[#e8eaec] ">
                                    <div class="flex  px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                        <div>
                                            <el-text>已添加标签</el-text>
                                        </div>
                                        <div>
                                            <el-button link type="primary" @click="clearCallToActionList">清空<el-icon>
                                                    <RefreshRight />
                                                </el-icon></el-button>
                                        </div>
                                    </div>
                                    <el-scrollbar height="180px">
                                        <div class="h-180px px-10px py-7px">
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap : 5px; ">
                                                <div v-for="(callToAction, index) in callToActionList"
                                                    class="flex w-166px h-24px line-height-24px bg-[#f4f5fc] mb-6px border-radius-6px px-8px color-[#515a6e] justify-between overflow-y-auto">
                                                    <div>
                                                        <span>{{ callToAction }}</span>
                                                    </div>
                                                    <div>
                                                        <el-button link
                                                            @click="deleteCallToAction(callToAction)"><el-icon>
                                                                <CloseBold />
                                                            </el-icon></el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>



                                <div class="w-374px bg-[#fff] border-[#e8eaec] " style="border-left: none">
                                    <div class="flex  px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                        <div>
                                            <el-text>推荐标签</el-text>
                                        </div>
                                        <div>
                                            <el-button link type="primary"
                                                @click="clearCallToActionListRecommendList">清空<el-icon>
                                                    <RefreshRight />
                                                </el-icon></el-button>
                                        </div>
                                    </div>
                                    <div class="h-180px px-10px py-7px flex flex-wrap"
                                        style="justify-content: space-evenly;align-content:flex-start;">
                                        <el-scrollbar height="180px">
                                            <el-checkbox-group v-model="callToActionListRecommendList"
                                                :max="10 - addCallToActionList.length"
                                                style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap : 5px;">
                                                <el-checkbox v-for="item in recommendCallToActionList" :label="item"
                                                    :value="item" :key="item" class="!w-100%" />
                                            </el-checkbox-group>
                                        </el-scrollbar>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item style="margin-bottom:0px">
                                <el-text type="warning">
                                    <el-icon>
                                        <InfoFilled />
                                    </el-icon>
                                    行动号召最多只可选择10个
                                </el-text>
                            </el-form-item>
                            <el-form-item style="margin-top: 0px;">
                                <el-checkbox v-model="form.intelligent_generation" label="开启智能生成" :true-value="'ON'"
                                    :false-value="'OFF'" />
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
                            <el-form-item label="配置模式">
                                <el-radio-group v-model="form.product_info_conf">
                                    <el-radio-button :value="'same'"> 统一配置 </el-radio-button>
                                    <el-radio-button :value="'ad_same'"> 分帐户配置 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="产品名称">
                                <el-input v-model="product_name" style="width: 300px" placeholder="2-40个字符，中文占两个字符"
                                    show-word-limit maxlength="40"></el-input>
                            </el-form-item>
                            <el-form-item label="产品主图">
                                <div class="flex flex-wrap">
                                    <div class="w-108px h-108px bg-[#fff] mr-8px mt-8px"
                                        v-for="item in product_info_image_ids"
                                        style="display: inline-flex;align-items: center;justify-content: center;box-sizing: border-box;">
                                        <div class="position-relative flex align-items-center align-content-center w-100% h-100% font-size-14px color-[#666] cursor-pointer bg-[#f8f8f8]"
                                            style="border:1px dashed #d6d6d6;border-radius:4px;">
                                            <el-image style="width: 100%; height: 100%" :src="item" />
                                            <div class="position-absolute top-0 right-0 py-4px"
                                                style="display: flex;align-items: center;justify-content: center;box-sizing: border-box;">
                                                <el-button link @click="deleteProductInfoImage(item)"
                                                    style="padding: 0px 5px;box-sizing: border-box;">
                                                    <el-icon>
                                                        <CloseBold />
                                                    </el-icon>
                                                </el-button>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="product_info_image_ids.length <= 10"
                                        class="w-108px h-108px bg-[#fff] mt-8px"
                                        style="display: inline-flex;align-items: center;justify-content: center;border:.758865px solid #dadfe3;border-radius:4px;box-sizing: border-box;">
                                        <div class="flex align-items-center align-content-center w-95px h-95px font-size-14px color-[#666] cursor-pointer bg-[#f8f8f8]"
                                            style="border:1px dashed #d6d6d6;border-radius:4px;" @click="addImageIds">
                                            <el-text>
                                                <el-icon>
                                                    <Plus />
                                                </el-icon> 图片({{ product_info_image_ids.length }}/10)
                                            </el-text>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>


                            <el-form-item label="产品卖点">
                                <el-input placeholder="空格分隔,最多10个,每个标签不超过6个字" v-model="product_info_title"
                                    style="width : 244px;" @keyup.enter="addProductInfoSellingPoint" /><el-button
                                    type="primary" @click="addProductInfoSellingPoint">添加（回车键）</el-button>
                            </el-form-item>
                            <el-form-item style="margin-bottom:0px;">
                                <div class="w-374px bg-[#fff] border-[#e8eaec] ">
                                    <div class="flex  px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                        <div>
                                            <el-text>已添加标签</el-text>
                                        </div>
                                        <div>
                                            <el-button link type="primary"
                                                @click="clearProductSellingPointsListSelected">清空<el-icon>
                                                    <RefreshRight />
                                                </el-icon></el-button>
                                        </div>
                                    </div>
                                    <el-scrollbar height="180px">
                                        <div class="h-180px px-10px py-7px">
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap : 5px; ">
                                                <div v-for="product_selling_points in product_selling_points_list_selected"
                                                    class="flex w-166px h-24px line-height-24px bg-[#f4f5fc] mb-6px border-radius-6px px-8px color-[#515a6e] justify-between overflow-y-auto">
                                                    <div>
                                                        <span>{{ product_selling_points }}</span>
                                                    </div>
                                                    <div>
                                                        <el-button link
                                                            @click="deleteProductSellingPointsListSelected(product_selling_points)"><el-icon>
                                                                <CloseBold />
                                                            </el-icon></el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>

                                <div class="w-374px bg-[#fff] border-[#e8eaec] " style="border-left: none">
                                    <div class="flex  px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                        <div>
                                            <el-text>推荐产品卖点</el-text>
                                        </div>
                                        <div>
                                            <el-button link type="primary"
                                                @click="clearRecommendProductSellingPointsListSelected">清空<el-icon>
                                                    <RefreshRight />
                                                </el-icon></el-button>
                                        </div>
                                    </div>
                                    <div class="h-180px px-10px py-7px flex flex-wrap"
                                        style="justify-content: space-evenly;align-content:flex-start;">
                                        <el-scrollbar height="180px">
                                            <el-checkbox-group v-model="recommend_product_selling_points_list_selected"
                                                style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap : 5px;">
                                                <el-checkbox v-for="item in recommend_product_selling_points_list"
                                                    :label="item" :value="item" :key="item" class="!w-100%" />
                                            </el-checkbox-group>
                                        </el-scrollbar>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item style="margin-top:0px">
                                <el-text type="warning">
                                    <el-icon>
                                        <InfoFilled />
                                    </el-icon>
                                    产品卖点最多只可选择10个
                                </el-text>
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
                                <el-radio-group v-model="form.promotion_aweme">
                                    <el-radio-button :value="'same'">统一配置</el-radio-button>
                                    <el-radio-button :value="'ad_same'">分帐户配置</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="1.5" class="w-100% m-16px border-[#e8eaec]">
                        <!-- <div class="h-64px p-16px text-right">
                            <el-text>全部收起</el-text>
                        </div> -->
                        <!-- <div
                            class="font-size-12px color-[#999] flex justify-between p-12px bg-[#f2f2f2] border-top-[#e8eaec] border-bottom-[#e8eaec]">
                            <div>
                                <span>竞价策略：</span>
                                <span class="font-size-14px color-[#000]">最大转化</span>
                            </div>
                            <div>
                                <span>优化目标：</span>
                                <span class="font-size-14px color-[#000]">付费/无</span>
                            </div>
                            <div>
                                <span>深度优化方式：</span>
                                <span class="font-size-14px color-[#000]">首次付费</span>
                            </div>
                            <div>
                                <span>付费方式：</span>
                                <span class="font-size-14px color-[#000]">目标转化出价-按展示付费</span>
                            </div>
                        </div> -->

                        <div class="p-16px">
                            <ul>
                                <li class="border-[#e8eaec]">
                                    <div
                                        class="font-size-12px  flex justify-between p-12px bg-[#f2f2f2]  border-bottom-[#e8eaec]">
                                        <div>
                                            <span>预算出价规则</span>
                                        </div>

                                        <div>
                                            <!-- <span>收起</span> -->
                                        </div>
                                    </div>
                                    <div class="p-16px">
                                        <el-form :label-position="'left'">
                                            <el-form-item :label="'预算'" :label-width="200">
                                                <el-input placeholder="请输入预算金额" style="width: 160px;margin-right: 16px;"
                                                    v-model="budget_amount"></el-input><span>元</span>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
                                <el-input v-model="form.promotion_name" style="width: 360px;" :maxlength="100"
                                    show-word-limit></el-input>
                            </el-form-item>
                            <!-- <el-form-item>
                                <el-text>通配符</el-text>
                                <el-text>+渠道包名</el-text>
                                <el-text>+监测活动名</el-text>
                                <el-text>+已有监测链接组名</el-text>
                                <el-text>+插入更多</el-text>
                            </el-form-item> -->
                            <el-form-item label="广告默认状态">
                                <el-radio-group v-model="form.promotion_operation">
                                    <el-radio-button :value="'DISABLE'">暂停</el-radio-button>
                                    <el-radio-button :value="'ENABLE'">开启</el-radio-button>
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

    <!-- 选择产品主图 -->
    <MaterialSelector :visible="MaterialSelectorState.visible"
        @handle-dialog-close="handleMaterialSelectorDialogClose" />
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, watch } from "vue";
import Drawer from "@/components/Drawer.vue";
import SelectTikTokAccount from "./SelectTikTokAccount.vue";
import MaterialSelector from "./MaterialSelector.vue";
import type { IBasicInformationOfAd, IUploadMaterial2MediaResultData } from "@/api/modules/promotion";
import { ElMessage } from "element-plus";

interface IProps {
    visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleBasicInformationOfAdClose"]);

const drawerOptions = reactive({
    visible: props.visible ?? false,
    size: 1016,
});

watchEffect(() => {
    drawerOptions.visible = props.visible;
});

const handleDrawerClose = (type: number) => {
    if (type === 1) {
        console.log(form)
        emits("handleBasicInformationOfAdClose", { type: 1, form: form });
    } else {
        emits("handleBasicInformationOfAdClose", { type: 0 });
    }
};

const form = reactive<IBasicInformationOfAd>({
    ad_download_status: '',
    anchor_related_type: 'OFF',
    aweme_info_group: [],
    product_info_group: [],
    call_to_action_buttons: [],
    intelligent_generation: '',
    is_comment_disable: '',
    keywords: [],
    mini_program_info: '',
    playable_url_material_list: [],
    pre_promotion_budget_group: [],
    product_info_conf: 'same',
    promotion_aweme: 'same',
    promotion_name: '<日期>-<时分秒>-<当日标号>',
    promotion_operation: 'ENABLE',
    source: '',
    web_url_material_list: []
});

const promotional_identity = ref(1);

const SelectTikTokAccountState = reactive({
    visible: false,
    title: "选择抖音号",
});

const selectTikTokAccount = () => {
    SelectTikTokAccountState.visible = true;
};
const selectTikTokAccountDialog = (options: { type: number, AwemeList: any }) => {
    SelectTikTokAccountState.visible = false;
    if (options.type === 1) {
        form.aweme_info_group = options.AwemeList;
    }
};

const callToAction = ref<string>();
const callToActionList = ref<string[]>([]);

const addCallToActionList = ref<string[]>([])

const addcallToAction = () => {
    if (callToAction.value) {
        if (callToActionList.value.length < 10) {
            if (addCallToActionList.value.includes(callToAction.value)) {
                callToAction.value = "";
                ElMessage({
                    message: "请勿重复添加行动号召",
                    type: 'warning'
                })
            } else {
                addCallToActionList.value.push(callToAction.value);
                callToAction.value = "";
            }
        } else {
            callToAction.value = "";
            ElMessage({
                message: "行动号召最多只能10个",
                type: 'warning'
            })
        }
    } else {
        ElMessage({
            message: "添加行动号召内容不能为空",
            type: 'warning'
        })
    }
};

const callToActionListRecommendList = ref<string[]>([]);
const recommendCallToActionList = [
    "一键领取",
    "了解更多",
    "官方下载",
    "更多精彩",
    "极速下载",
    "查看详情",
    "立即下载",
    "立即预约",
    "领取优惠",
    "领取卡券",
    "马上领取",
];

watchEffect(() => {
    callToActionList.value = [...addCallToActionList.value, ...callToActionListRecommendList.value];
})

const deleteCallToAction = (value: string) => {
    if (addCallToActionList.value.includes(value)) {
        addCallToActionList.value = addCallToActionList.value.filter(item => item !== value);
    }

    if (callToActionListRecommendList.value.includes(value)) {
        callToActionListRecommendList.value = callToActionListRecommendList.value.filter(item => item !== value);
    }
}


// 清空已选的行动号召
const clearCallToActionList = () => {
    callToActionList.value = []
    addCallToActionList.value = []
    callToActionListRecommendList.value = []
}

// 清空已选推荐的行动号召
const clearCallToActionListRecommendList = () => {
    callToActionListRecommendList.value = []
}



// 产品名称
const product_name = ref<string>('');

// 产品主图
const product_info_image_ids = ref<string[]>([]);

const MaterialSelectorState = reactive({
    visible: false,
})

const addImageIds = () => {
    MaterialSelectorState.visible = true;
}

const MaterialSelectorForm = ref<IUploadMaterial2MediaResultData[]>([]);

const handleMaterialSelectorDialogClose = (options: { type: number; form: any }) => {
    MaterialSelectorState.visible = false;
    if (options.type === 1) {
        MaterialSelectorForm.value = options.form;
    }
    if (MaterialSelectorForm.value.length > 0) {
        product_info_image_ids.value.push(...MaterialSelectorForm.value.map((obj => obj.post_url)))
    }
}

// 删除已选的产品主图
const deleteProductInfoImage = (value: string) => {
    product_info_image_ids.value = product_info_image_ids.value.filter(item => item !== value);
}



// 产品卖点
// input输入内容
const product_info_title = ref<string>('');
// input输入内容列表
const product_selling_points_list = ref<string[]>([]);
// input输入内容和选择推荐的总列表
const product_selling_points_list_selected = ref<string[]>([]);
// 推荐产品卖点列表
const recommend_product_selling_points_list = ["近期热卖商品"];
// 推荐产品卖点选中列表
const recommend_product_selling_points_list_selected = ref<string[]>([]);

// 添加产品函数
const addProductInfoSellingPoint = () => {
    if (product_info_title.value) {
        if (product_selling_points_list_selected.value.length < 10) {
            if (product_selling_points_list.value.includes(product_info_title.value)) {
                product_info_title.value = "";
                ElMessage({
                    message: "请勿重复添加行动号召",
                    type: 'warning'
                })
            } else {
                product_selling_points_list.value.push(product_info_title.value);
                product_info_title.value = "";
            }
        } else {
            product_info_title.value = "";
            ElMessage({
                message: "行动号召最多只能10个",
                type: 'warning'
            })
        }
    } else {
        ElMessage({
            message: "添加行动号召内容不能为空",
            type: 'warning'
        })
    }
}


watchEffect(() => {
    product_selling_points_list_selected.value = [...product_selling_points_list.value, ...recommend_product_selling_points_list_selected.value];
})

const deleteProductSellingPointsListSelected = (value: string) => {
    if (product_selling_points_list.value.includes(value)) {
        product_selling_points_list.value = product_selling_points_list.value.filter(item => item !== value);
    }

    if (recommend_product_selling_points_list_selected.value.includes(value)) {
        recommend_product_selling_points_list_selected.value = recommend_product_selling_points_list_selected.value.filter(item => item !== value);
    }
}

// 清空已选产品卖点
const clearProductSellingPointsListSelected = () => {
    product_selling_points_list_selected.value = []
    product_selling_points_list.value = []
    recommend_product_selling_points_list_selected.value = []
}

// 清空已选推荐的产品卖点
const clearRecommendProductSellingPointsListSelected = () => {
    recommend_product_selling_points_list_selected.value = []
}

// 预算出价规则-预算
const budget_amount = ref<string>()



</script>
