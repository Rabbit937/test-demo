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
                <el-row class="mb-16px p-16px h-100%"
                    style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col>
                        <el-text>
                            头条定向包使用注意事项
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </el-text>
                    </el-col>
                    <el-col>
                        <el-row class="h-64px p-8px bg-[#fafafa] flex justify-between align-content-center"
                            style="border:1px solid #e8eaec;border-bottom:none;">
                            <el-col :span="1.5">
                                <el-text>
                                    选择头条定向包
                                </el-text>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button>
                                    多账户刷新
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row class="border-[#e8eaec]">
                            <el-col :span="4">
                                <ul>
                                    <li class="flex align-items-center align-content-center h-57px px-8px py-10px font-size-14px color-[#333] cursor-pointer bg-[#fafafa]"
                                        style="border: 1px solid #e8eaec;">
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
                            </el-col>
                            <el-col :span="20" class="p-16px" style="border-left: 1px solid #e8eaec;">
                                <el-row class="flex align-items-center ">
                                    <el-col :span="1.5" class="mr-8px">
                                        <el-input v-model="keyword" class="input-with-select" style="max-width: 500px"
                                            placeholder="请输入关键词" clearable>
                                            <template #prepend>
                                                <el-select v-model="keyword_type" style="width: 80px">
                                                    <el-option label="名称" value="name" />
                                                    <el-option label="ID" value="id" />
                                                </el-select>
                                            </template>
                                            <template #append>
                                                <el-button :icon="Search" @click="handleSearchClick" />
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="1.5" class="mr-8px">
                                        <el-select style="width:100px;" v-model="delivery_range" clearable
                                            placeholder="全部" @change="handleDeliveryModeChange"
                                            @clear="handleDeliveryModeClear">
                                            <el-option v-for="item in delivery_mode_options" :key="item.value"
                                                :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="1.5">
                                        <el-text>已选：0/1</el-text>
                                    </el-col>
                                </el-row>
                                <el-row class="my-8px">
                                    <el-col :span="1.5" class="mr-8px">
                                        <el-button type="primary"
                                            @click="handleNewTargetingPackageClick">新建头条定向</el-button>
                                    </el-col>
                                    <el-col :span="1.5">
                                        <el-checkbox>
                                            <el-text size="small">仅查看可用的定向包</el-text>
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-table border ref="multipleTableRef" :data="tableData"
                                            style="max-height: 600px;" @selection-change="handleSelectionChange"
                                            empty-text="没有数据" v-loading="loading">
                                            <el-table-column type="selection" width="55" />
                                            <el-table-column v-for="(value, key) in tableKey" :prop="key" :label="value"
                                                :width="200" align="center">
                                                <template #default="scope">
                                                    <span v-if="key === 'delivery_range'">{{
                                                        delivery_range_enum[scope.row[key]] }}</span>
                                                    <span v-else-if="key === 'landing_type'">{{
                                                        landing_type_enum[scope.row[key]] }}</span>
                                                    <span v-else>{{ scope.row[key] }}</span>
                                                </template>


                                            </el-table-column>
                                        </el-table>

                                        <el-config-provider :locale="zhCn">
                                            <el-pagination class="mt-20px" v-model:current-page="currentPage"
                                                v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
                                                layout="total, sizes, prev, pager, next, jumper" :total="total"
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
    advertiser_id: 1787695788195915,
    project_id: 7374761138175967269,
    name: "11_100214_test_native_22111",
    operation: "DISABLE",
    aweme_id: 1186934325,
    auth_type: "AWEME_ACCOUNT",
    anchor_related_type: "AUTO",
    materials_type: "PROMOTION_MATERIALS",
    video_material_list: [{ image_mode: "CREATIVE_IMAGE_MODE_VIDEO", "video_id": "v02033g10000cna0hurc77u6rf2kblug", "video_cover_id": "web.business.image/20240531a7ad21df9b3f69c34efcac60", "video_hp_visibility": "HIDE_VIDEO_ON_HP" }
text_abstract_list[]: { "abstract_text": "这是一个测试文本摘要，很有必要测试一下，是的必须测试一下" }
title_material_list[]: [""]
product_info: { "titles": ["忍界大战"], "image_ids": ["web.business.image/202402205d0d74c09c1612244e8cbef1"], "selling_points": ["近期热卖产品", "立即下载试玩"] }
web_url_material_list[]: https://www.chengzijianzhan.com/tetris/page/7374754531337437234
    call_to_action_buttons[]: ["一起战斗", "我们大家庭"]
intelligent_generation: ON
is_comment_disable: OFF
ad_download_status: OFF
budget_mode: BUDGET_MODE_DAY
budget: 300
cpa_bid: 10
deep_cpabid: 100
})

const createPromotionFunc = async()




</script>
