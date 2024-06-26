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
            <main class="m-16px pl-16px pr-16px h-100%">
                <el-button @click="handleClick">创建广告</el-button>
            </main>
        </el-scrollbar>
    </Drawer>
</template>

<script setup lang="ts">
import { reactive, watchEffect, ref, onMounted } from 'vue'
import Drawer from '@/components/Drawer.vue'
import { Search } from '@element-plus/icons-vue'
import { zhCn } from "element-plus/es/locales.mjs"
import { type ICreatePromotion, createPromotion } from '@/api/modules/promotion';

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


const form: ICreatePromotion = reactive({
    advertiser_id: "1787695788195915",
    project_id: "7374761138175967269",
    name: "11_100214_test_native_22111111",
    operation: "DISABLE",
    aweme_id: "1186934325",
    auth_type: "AWEME_ACCOUNT",
    anchor_related_type: "AUTO",
    // materials_type: "PROMOTION_MATERIALS",
    video_material_list: [
        JSON.stringify({
            image_mode: "CREATIVE_IMAGE_MODE_VIDEO",
            video_id: "v02033g10000cna0hurc77u6rf2kblug",
            video_cover_id: "web.business.image/20240531a7ad21df9b3f69c34efcac60",
            video_hp_visibility: "HIDE_VIDEO_ON_HP"
        })
    ],
    text_abstract_list: [JSON.stringify({ abstract_text: "这是一个测试文本摘要，很有必要测试一下，是的必须测试一下" })],
    title_material_list: [{ title: "马上下载试玩" }, { title: "2块钱你买不了吃亏" }],
    product_info: JSON.stringify({ titles: ["忍界大战"], image_ids: ["web.business.image/202402205d0d74c09c1612244e8cbef1"], selling_points: ["近期热卖产品", "立即下载试玩"] }),
    web_url_material_list: ["https://www.chengzijianzhan.com/tetris/page/7374754531337437234"],
    call_to_action_buttons: ["一起战斗", "我们大家庭"],
    intelligent_generation: "ON",
    is_comment_disable: "OFF",
    ad_download_status: "OFF",
    budget_mode: "BUDGET_MODE_DAY",
    budget: "300",
    cpa_bid: "10",
    deep_cpabid: "100",
})

const createPromotionFunc = async (params: ICreatePromotion) => {
    const res = await createPromotion(params);
    // console.log(res)
}


const handleClick = () => {
    createPromotionFunc(form)
}


</script>
