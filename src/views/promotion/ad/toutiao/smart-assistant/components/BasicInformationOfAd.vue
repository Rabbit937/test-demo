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
                                <el-radio-group>
                                    <el-radio-button :value="1"> 抖音号 </el-radio-button>
                                    <el-radio-button :value="2"> 账户信息 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="抖音号来源">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 手动选择 </el-radio-button>
                                    <el-radio-button :value="2"> 从创意组匹配 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="匹配方式">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 所有广告选择同一抖音号 </el-radio-button>
                                    <el-radio-button :value="2"> 每个账户选择一个抖音号 </el-radio-button>
                                    <el-radio-button :value="3"> 每个项目选择一个抖音号 </el-radio-button>
                                    <el-radio-button :value="4"> 每个广告选择一个抖音号 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="选择抖音号">
                                <el-radio-group>
                                    <el-button type="primary">选择抖音号</el-button>
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
                                <el-radio-group>
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 自动生成 </el-radio-button>
                                    <el-radio-button :value="3"> 选择已有 </el-radio-button>
                                    <el-radio-button :value="4"> 模板生成 </el-radio-button>
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
                            <el-form-item label="附加创意组件">
                                <el-radio-group>
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="行动号召">

                            </el-form-item>
                            <el-form-item>

                            </el-form-item>
                            <el-form-item>
                                开启智能生成
                            </el-form-item>

                            <el-form-item label="来源">
                                <el-input></el-input>
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
                                <el-radio-group>
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
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import Drawer from "@/components/Drawer.vue";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});

const drawerOptions = reactive({
	visible: props.visible ?? false,
	size: 1016,
});

const handleDrawerClose = () => {
	drawerOptions.visible = false;
};

watchEffect(() => {
	drawerOptions.visible = props.visible;
});
</script>
