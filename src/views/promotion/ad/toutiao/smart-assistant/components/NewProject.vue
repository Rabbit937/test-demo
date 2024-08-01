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

                    <el-col class="pl-16px pr-16px mb-24px" v-if="form.landing_type === 'APP'">
                        <el-radio-group v-model="form.app_promotion_type" @change="handleAppPromotionTypeChange">
                            <el-radio-button v-for="(item) in app_promotion_type_radio" :value="item.value">
                                {{ item.label }}
                            </el-radio-button>
                        </el-radio-group>
                        <div>
                            <el-text size="small" class="line-height-24px color-[#999]">吸引用户下载并安装您的应用程序</el-text>
                        </div>
                    </el-col>

                    <el-col class="pl-16px pr-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="投放模式"
                                :style="{ marginBottom: form.delivery_mode === 'PROCEDURAL' ? '0px' : '16px' }">
                                <el-radio-group v-model="form.delivery_mode" @change="handleDeliveryModeChange">
                                    <el-radio-button v-for="(item) in delivery_mode_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="form.delivery_mode === 'PROCEDURAL'">
                                <el-text><el-icon class="mr-4px" color="#e6a23c">
                                        <WarningFilled />
                                    </el-icon>需要向媒体申请账号自动投放的权限</el-text>
                            </el-form-item>

                            <el-form-item label="营销场景">
                                <el-radio-group v-model="form.marketing_goal">
                                    <el-radio-button v-for="(item) in marketing_goal_radio" :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="广告类型">
                                <el-radio-group v-model="form.ad_type">
                                    <el-radio-button v-for="(item) in ad_type_radio" :value="item.value"
                                        :disabled="form.delivery_mode === 'PROCEDURAL' && item.value === 'SEARCH'">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="投放类型">
                                <el-radio-group v-model="form.delivery_type">
                                    <el-radio-button :value="'NORMAL'"> 常规投放 </el-radio-button>
                                    <el-radio-button v-if="form.ad_type === 'SEARCH'" :value="'DURATION'"> 周期稳投
                                    </el-radio-button>
                                    <template v-else>
                                        <el-popover placement="right-start" :width="200" trigger="hover"
                                            content="媒体API暂不支持通投广告搭建周期稳投">
                                            <template #reference>
                                                <el-radio-button :value="'DURATION'" disabled> 周期稳投 </el-radio-button>
                                            </template>
                                        </el-popover>
                                    </template>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 投放内容与目标 -->
                <el-row
                    class="mb-16px bg-[#fff]] border-[#e8eaec] border-radius-6px bg-[#fff] border-[#e8eaec] border-radius-6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                    background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放内容与目标</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <template v-if="form.landing_type === 'MICRO_GAME'">
                                <el-form-item label="投放内容">
                                    <el-radio-group v-model="form.micro_promotion_type">
                                        <el-radio-button :value="'WECHAT_GAME'" :key="1">
                                            微信小游戏
                                        </el-radio-button>
                                        <el-radio-button :value="'BYTE_GAME'" :key="2">
                                            字节小游戏
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label="平台类型">
                                    <el-radio-group v-model="form.app_type" @change="handleAppTypeChange">
                                        <el-radio-button v-for="(item) in platform_type_radio" :value="item.value"
                                            :key="item.value">
                                            {{ item.label }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="头条应用" v-if="form.app_type === 'APP_ANDROID'">
                                    <el-select-v2 v-model="headline_application_value"
                                        @change="handleHeadlineApplicationChange"
                                        :options="headline_application_options" placeholder="请选择"
                                        style="width: 300px" />
                                    <el-button class="ml-16px"
                                        @click="handleAndroidApplicationListRefresh">刷新</el-button>
                                </el-form-item>

                                <el-form-item label="iTunes ID" v-if="form.app_type === 'APP_IOS'">
                                    <el-input style="width: 300px" placeholder="请输入iTunes ID" v-model="ITunesID" />
                                    <el-button class="ml-16px"
                                        @click="handleQueryIosApplication(ITunesID)">查询</el-button>
                                </el-form-item>

                                <el-form-item label="应用名称">
                                    <el-input style="width: 300px" placeholder="请输入应用名称" v-model="form.app_name" />
                                </el-form-item>

                                <el-form-item v-if="form.landing_type === 'APP'" label="下载方式">
                                    <el-radio-group v-model="form.download_type">
                                        <el-radio-button v-for="(item) in download_type_radio" :value="item.value"
                                            :key="item.value">
                                            {{ item.label }}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </template>

                            <!-- <el-form-item label="数据跟踪方式">
                                <el-radio-group v-model="data_tracking_method">
                                    <el-radio-button :value="1"> 应用分包+监测活动 </el-radio-button>
                                    <el-radio-button :value="2"> 仅应用分包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->
                            <!-- 
                            <el-form-item label="检测链接来源">
                                <el-radio-group v-model="detect_link_source">
                                    <el-radio-button :value="1"> 巨量后台检测链接组 </el-radio-button>
                                    <el-radio-button :value="2"> 创量导入检测活动 </el-radio-button>
                                    <el-radio-button :value="3"> 手动输入 </el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->

                            <!-- <el-form-item label="选择链接组">
                                <el-button type="primary" :disabled="form.app_name ? false : true"
                                    @click="selectConnectionGroup">选择链接组</el-button>
                            </el-form-item> -->


                            <!-- <el-form-item label="优先应用商店下载">
                                <el-radio-group v-model="form.download_mode">
                                    <el-radio-button value="APP_STORE_DELIVERY">启用</el-radio-button>
                                    <el-radio-button value="DEFAULT">不启用</el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->
                            <!-- <el-form-item label="数据对接方式"> -->
                            <!-- <el-radio-group v-model="form.data_docking_mode">
                                    <el-radio-button :value="'EVENT'"> 事件管理 </el-radio-button>
                                </el-radio-group> -->
                            <!-- </el-form-item> -->
                            <el-form-item label="优化目标">
                                <el-form :label-width="144" label-position="left" class="p-16px pr-40px"
                                    style="border: 1px solid #e8eaec">
                                    <!-- <el-form-item label="事件回传方式" class="!mb-16px">
                                        <el-radio-group v-model="eventReturnMethod">
                                            <el-radio-button :value="1"> 应用SDK回传 </el-radio-button>
                                            <el-radio-button :value="2"> 应用API回传 </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item> -->
                                    <el-form-item label="优化目标" class="!mb-16px">
                                        <el-select style="width: 360px" v-model="form.external_action"
                                            @change="selectOptimizeGoal" placeholder="请选择优化目标">
                                            <el-option v-for="item in optimizeGoal" :key="item.external_action"
                                                :label="item.optimization_name" :value="item.external_action" />
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="深度优化目标" class="!mb-16px">
                                        <el-select style="width: 360px" v-model="form.deep_external_action"
                                            placeholder="请选择深度优化目标" @change="selectDeepOptimizeGoal">
                                            <el-option v-for="item in deepOptimizeGoal" :key="item.deep_external_action"
                                                :label="item.optimization_name" :value="item.deep_external_action" />
                                        </el-select>
                                    </el-form-item>


                                    <el-form-item class="!mb-16px" label="深度优化方式"
                                        v-if="deep_bid_type_radio_filtered.length !== 0">
                                        <el-radio-group v-model="form.deep_bid_type">
                                            <el-radio-button v-for="(item) in deep_bid_type_radio_filtered"
                                                :value="item.value" :key="item.value">
                                                {{ item.label }}
                                            </el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
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
                                <el-radio-group v-model="form.inventory_catalog">
                                    <el-radio-button v-for="(item) in inventory_catalog_radio" :value="item.value"
                                        :key="item.value"
                                        :disabled="form.delivery_mode === 'PROCEDURAL' && item.value === 'MANUAL'">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text>通投智选下，广告会投到信息流和搜索场景，提升单计划跑量与效果稳定性</el-text>
                            </el-form-item>

                            <el-form-item label="首选媒体" v-if="form.inventory_catalog === 'MANUAL'">
                                <el-select v-model="form.inventory_type" multiple clearable collapse-tags
                                    placeholder="请选择首选媒体" popper-class="custom-header" :max-collapse-tags="1"
                                    style="width: 240px">
                                    <template #header>
                                        <el-checkbox v-model="checkAll" :indeterminate="indeterminate"
                                            @change="handleCheckAll">
                                            全选
                                        </el-checkbox>
                                    </template>
                                    <el-option v-for="item in inventory_type_radio" :key="item.value"
                                        :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>


                            <el-form-item label="投放方式"
                                v-if="form.inventory_type?.length === 1 && form.inventory_type.includes('INVENTORY_UNION_SLOT')">
                                <el-radio-group v-model="form.union_video_type">
                                    <el-radio-button v-for="(item) in union_video_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>


                <!-- 用户定向 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">用户定向</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <!-- <el-form-item label="定向包来源">
                                <el-radio-group v-model="targetedPackageSource">
                                    <el-radio-button :value="1"> 账户已有定向包 </el-radio-button>
                                    <el-radio-button :value="2"> 创量定向包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="匹配方式">
                                <el-radio-group v-model="matchingMethod">
                                    <el-radio-button :value="1"> 每个账户选择一个定向包 </el-radio-button>
                                    <el-radio-button :value="2"> 每个项目选择一个定向包 </el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->
                            <el-form-item label="选择定向包">
                                <el-button @click="selectAudiencePackage" type="primary">选择定向包</el-button>
                            </el-form-item>
                        </el-form>

                        <el-table :data="selectedTargetingPackage" v-if="selectedTargetingPackage.length > 0" border>
                            <el-table-column label="账户ID" width="300">
                                <template #default="scope">
                                    <div>
                                        <span>
                                            {{ scope.row.advertiser_id }}
                                        </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="定向包" width="auto">
                                <template #default="scope">
                                    <div>
                                        <span>
                                            {{ scope.row.name }}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {{ scope.row.audience_package_id }}
                                        </span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>




                <!-- 项目排期与预算 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">项目排期与预算</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="投放时间">
                                <el-radio-group v-model="form.schedule_type">
                                    <el-radio-button v-for="(item) in schedule_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item v-if="form.schedule_type === 'SCHEDULE_START_END'" style="width: 600px;">
                                <el-date-picker v-model="schedule_date" type="daterange" range-separator="~"
                                    start-placeholder="开始日期" end-placeholder="结束日期" :value-format="'YYYY-MM-DD'"
                                    @change="handleScheduleDateChange" />
                            </el-form-item>


                            <el-form-item label="投放时段">
                                <el-radio-group v-model="schedule_time_type">
                                    <el-radio-button :value="1"> 不限 </el-radio-button>
                                    <el-radio-button :value="2"> 指定时间段 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>



                            <el-form-item label="竞价策略">
                                <el-radio-group v-model="form.bid_type">
                                    <el-radio-button v-for="(item) in bid_type_radio" :value="item.value"
                                        :key="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="项目预算">
                                <el-radio-group v-model="form.budget_mode">
                                    <el-radio-button v-for="(item) in budget_mode_radio" :value="item.value"
                                        :key="item.value"
                                        :disabled="form.delivery_mode === 'PROCEDURAL' && item.value === 'BUDGET_MODE_INFINITE'">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="付费方式">
                                <el-radio-group v-model="form.pricing">
                                    <el-radio-button :value="'PRICING_OCPM'"> 目标转化出价-按展示付费 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="预算择优分配"
                                v-if="form.budget_mode === 'BUDGET_MODE_DAY' && form.bid_type === 'NO_BID'">
                                <el-radio-group v-model="form.budget_optimize_switch">
                                    <el-radio-button :value="'ON'"> 开启 </el-radio-button>
                                    <el-radio-button :value="'OFF'"> 不开启 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>


                            <el-form-item label="预算出价配置模式" v-if="form.budget_mode !== 'BUDGET_MODE_INFINITE'">
                                <el-radio-group v-model="form.project_budget">
                                    <el-radio-button :value="'same'"> 统一配置 </el-radio-button>
                                    <el-radio-button :value="'ad_same'"> 分帐户配置 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <el-col :span="1.5" class="w-100% m-16px border-[#e8eaec]"
                        v-if="form.budget_mode !== 'BUDGET_MODE_INFINITE'">
                        <!-- <div class="h-64px p-16px text-right">
                            <el-text>全部收起</el-text>
                        </div> -->
                        <div
                            class="font-size-12px color-[#999] flex justify-between p-12px bg-[#f2f2f2] border-top-[#e8eaec] border-bottom-[#e8eaec]">
                            <div>
                                <span>竞价策略：</span>
                                <span class="font-size-14px color-[#000]">
                                    {{ bid_type_radio.filter(bid_type => bid_type.value
                                        === form.bid_type)[0].label }}
                                </span>
                            </div>
                            <div>
                                <span>优化目标：</span>
                                <span class="font-size-14px color-[#000]"> {{
                                    external_action_radio[String(form.external_action)] }}
                                </span>
                            </div>
                            <div>
                                <span>深度优化方式：</span>
                                <span class="font-size-14px color-[#000]">
                                    {{ deep_bid_type_radio.filter(deep_bid_type => deep_bid_type.value
                                        === form.deep_bid_type)[0].label }}
                                </span>
                            </div>
                            <div>
                                <span>付费方式：</span>
                                <span class="font-size-14px color-[#000]">目标转化出价-按展示付费</span>
                            </div>
                        </div>

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
                                        <el-form>
                                            <el-form-item :label="'日预算'" :label-width="200">
                                                <el-input placeholder="请输入预算金额" style="width: 160px"
                                                    v-model="budget"></el-input>
                                                <el-button type="primary" link class="!mx-8px"
                                                    @click="handleBudgetChange(300)">300</el-button>|
                                                <el-button type="primary" link class="!mx-8px"
                                                    @click="handleBudgetChange(500)">500</el-button> |
                                                <el-button type="primary" link class="!mx-8px"
                                                    @click="handleBudgetChange(1000)">1000</el-button> |
                                                <el-button type="primary" link class="!mx-8px"
                                                    @click="handleBudgetChange(2000)"> 2000
                                                </el-button>
                                            </el-form-item>


                                            <template
                                                v-if="form.delivery_mode === 'PROCEDURAL' && form.bid_type === 'CUSTOM'">
                                                <el-form-item :label="'出价'" :label-width="200">
                                                    <el-input v-model="form.cpa_bid" placeholder="请输入出价"
                                                        style="width: 160px" />
                                                    <el-text class="!ml-8px">元</el-text>
                                                </el-form-item>
                                            </template>


                                            <template
                                                v-if="form.delivery_mode === 'PROCEDURAL' && form.bid_type === 'CUSTOM' && ['DEEP_BID_MIN', 'AUTO_MIN_SECOND_STAGE'].includes(String(form.deep_bid_type))">
                                                <el-form-item :label="'深度出价'" :label-width="200">
                                                    <el-input v-model="form.deep_cpabid" style="width: 160px" />
                                                    <el-text class="!ml-8px">元</el-text>
                                                </el-form-item>
                                            </template>


                                            <!-- ROI系数 -->
                                            <template
                                                v-if="form.delivery_mode === 'PROCEDURAL' && form.bid_type === 'CUSTOM' && ['ROI_COEFFICIENT',].includes(String(form.deep_bid_type))">
                                                <el-form-item :label="'ROI系数'" :label-width="200">
                                                    <el-input v-model="form.roi_goal" style="width: 160px" />
                                                    <el-text class="!ml-8px">元</el-text>
                                                </el-form-item>
                                            </template>

                                        </el-form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>



                <!--搜索快投 -->
                <el-row class=" mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">搜索快投</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <!-- <el-form-item label="关键词">
                                <el-input></el-input>
                            </el-form-item> -->
                            <el-form-item label="出价系数" style="margin-bottom: 0px;">
                                <el-radio-group v-model="search_bid_ratio_type">
                                    <el-radio-button :value="1"> 不启用 </el-radio-button>
                                    <el-radio-button :value="2"> 启用 </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-text>不启用出价系数时默认出价系数为1（仅针对可设置出价系数的账户生效）</el-text>
                            </el-form-item>
                            <el-form-item>
                                <el-input clearable style="width: 160px" v-if="search_bid_ratio_type === 2"
                                    v-model="form.search_bid_ratio" placeholder="请输入出价系数" />
                            </el-form-item>
                            <el-form-item label="定向扩展" style="margin-bottom: 0px;">
                                <el-radio-group v-model="form.audience_extend">
                                    <el-radio-button v-for="item in audience_extend_radio" :key="item.value"
                                        :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <!-- <el-form-item>
                                <el-checkbox>
                                    <el-text>搜索快投豁免（仅支持媒体平台申请了搜索快投豁免账户，否则“出价系数”和“定向拓展”媒体API将默认开启)</el-text>
                                </el-checkbox>
                            </el-form-item> -->
                        </el-form>
                    </el-col>
                </el-row>

                <!-- 项目名称 -->
                <el-row class="mb-16px" style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                    <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">项目名称</el-col>
                    <el-col class="p-16px">
                        <el-form :label-width="144" label-position="left">
                            <el-form-item label="项目名称">
                                <el-row>
                                    <el-col>
                                        <el-input v-model="form.name" style="width: 360px;" :maxlength="100"
                                            show-word-limit></el-input>
                                    </el-col>
                                    <!-- <el-col class="flex">
                                        <el-text style="margin-right: 8px;">通配符:</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary">+渠道包名</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary">+检测活动名</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary">+已有检测链接组名</el-text>
                                        <el-text class="cursor-pointer" style="margin-right: 8px;"
                                            type="primary"><el-icon>
                                                <Document />
                                            </el-icon>插入更多</el-text>
                                    </el-col> -->
                                    <!-- <el-col>
                                        <el-text type="warning"><el-icon>
                                                <WarningFilled />
                                            </el-icon> 取消<时间>或<标号>类通配符可能会导致名称重复，无法提交计划</el-text>
                                    </el-col>

                                    <el-col>
                                        <el-text type="warning"><el-icon>
                                                <WarningFilled />
                                            </el-icon>名称长度最多100字符（1汉字=2字符），使用通配符时，请注意控制自定义内容长度</el-text>
                                    </el-col> -->
                                </el-row>
                            </el-form-item>
                            <el-form-item label="项目默认状态">
                                <el-radio-group v-model="form.operation">
                                    <el-radio-button v-for="item in operation_radio" :key="item.value"
                                        :value="item.value">
                                        {{ item.label }}
                                    </el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </main>
        </el-scrollbar>
    </Drawer>
    <!-- 链接组 -->
    <!-- <ConnectionGroup :visible="ConnectionGroupState.visible" :type="ConnectionGroupState.type" /> -->
    <!-- 定向包 -->
    <AudiencePackage :visible="AudiencePackageState.visible" :size="AudiencePackageState.size"
        @handleDrawerClose="handleAudiencePackageDrawerClose" />
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, watchEffect, onMounted } from "vue";

import Drawer from "@/components/Drawer.vue";
import AudiencePackage from "./AudiencePackage.vue";
// import ConnectionGroup from "./ConnectionGroup.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { WarningFilled } from "@element-plus/icons-vue";
import "element-plus/es/components/message-box/style/css";

import {
    type INewProject,
    type IGetDeepOptimizeType,
    type IQueryIosApplication,
    queryAndroidAppList,
    getOptimizeGoal,
    getDeepOptimizeType,
    queryIosApplication,
    type IGetOptimizeGoalResultData,
    IAutoMonitorLink,
    autoMonitorLink,
    type ISyncAndroidApp,
    syncAndroidApp,
} from "@/api/modules/promotion";

import {
    app_promotion_type_radio,
    delivery_mode_radio,
    marketing_goal_radio,
    ad_type_radio,
    platform_type_radio,
    download_type_radio,
    inventory_catalog_radio,
    schedule_type_radio,
    bid_type_radio,
    budget_mode_radio,
    audience_extend_radio,
    operation_radio,
    deep_bid_type_radio,
    inventory_type_radio,
    union_video_type_radio,
    external_action_radio
} from "../../radio-info/NewProject";

interface IProps {
    visible: boolean;
    size?: number;
    advertiser_id_array: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleNewProjectClose"]);

const drawerOptions = reactive<IProps>({
    visible: props.visible,
    size: 1016,
    advertiser_id_array: [],
});

watchEffect(() => {
    drawerOptions.visible = props.visible;
    drawerOptions.advertiser_id_array = props.advertiser_id_array;
});

const handleDrawerClose = (type: number) => {
    if (type === 1) {
        emits("handleNewProjectClose", { type: 1, form: form });
    } else {
        emits("handleNewProjectClose", { type: 0 });
    }
};

const form: INewProject = reactive({
    delivery_mode: "MANUAL",
    app_promotion_type: "DOWNLOAD",
    landing_type: "APP",
    marketing_goal: "VIDEO_AND_IMAGE",
    ad_type: "ALL",
    delivery_type: "NORMAL",
    app_name: "",

    // 检测链接来源
    detect_link_source: 1,
    // 下载方式
    download_type: "DOWNLOAD_URL",
    download_mode: "DEFAULT",
    data_docking_mode: "EVENT",

    inventory_catalog: "UNIVERSAL_SMART",
    inventory_type: [],

    targetedPackageSource: 1,
    matchingMethod: 2,

    // 项目排期与预算
    schedule_type: "SCHEDULE_FROM_NOW",
    schedule_time_type: 1,
    schedule_time: "",
    start_time: "",
    end_time: "",
    bid_type: "CUSTOM",
    budget_mode: "BUDGET_MODE_INFINITE",
    pricing: "PRICING_OCPM",
    budget_optimize_switch: "OFF",

    search_bid_ratio_type: 2,
    search_bid_ratio: "",

    audience_extend: "ON",

    // 项目名称
    name: "<日期>-<时分秒>-<当日标号>",
    operation: "ENABLE", // DISABLE

    ac: [],
    age: [],
    android_osv: "",
    asset_ids: [1791972146324483],
    auto_extend_targets: [],
    budget: "",
    device_brand: [],
    device_type: [],
    district: "",
    download_url:
        "https://apps.bytesfield.com/download/basic/cur/c1e4f76f2c6608cf2ce4f1d00684d6be37439fc5",
    external_action: "",
    gender: "NONE",
    hide_if_converted: "PROMOTION",
    hide_if_exists: "UNLIMITED",
    interest_action_mode: "RECOMMEND",

    platform: [],
    superior_popularity_type: "",
    track_url_group_id: "1797289111929028",
    track_url_type: "GROUP_ID",
    union_video_type: "",
    value_optimized_type: "",
    app_type: "",
    deep_external_action: "NONE",
    deep_bid_type: "",

    pre_budget_group: [],
    preference_group: [],

    project_budget: "same",
    project_preference: "same",
    micro_promotion_type: "",


    // 出价
    cpa_bid: "",

    // 深度出价
    deep_cpabid: "",

    // ROI系数
    roi_goal: ""

});

// 投放内容与目标
// 头条应用
const ITunesID = ref<number>();

const handleAppTypeChange = (value: string | number | boolean) => {
    form.app_name = "";

    if (value === "Android") {
        ITunesID.value = undefined;
    } else {
        headline_application_value.value = "";
    }
};

const handleQueryIosApplication = (ITunesID: number | undefined) => {
    if (ITunesID) {
        queryIosApplicationFunc({ itunes_id: ITunesID });
    } else {
        ElMessage({
            message: "查询时，ITunesID不能为空",
            type: "warning",
        });
    }
};

const queryIosApplicationFunc = async (params: IQueryIosApplication) => {
    try {
        const res = await queryIosApplication(params);
        if (res.state === 1) {
            form.app_name = res.data.appstore_name;
            form.download_url = res.data.download_url;

            autoMonitorLinkFunc({
                bundleid: res.data.bundleid
            })
        }
    } catch (error) {
        console.error("error with queryIosApplicationFunc", error);
    }
};

const AndroidAppList = ref([]);
const headline_application_options = ref([]);

interface IQueryAndroidAppList {
    advertiser_id: string;
    page_limit: number;
}

const queryAndroidAppListFunc = async (params: IQueryAndroidAppList) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const res: any = await queryAndroidAppList(params);
    AndroidAppList.value = res.data.list;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    headline_application_options.value = res.data.list.map((item: any) => ({
        value: `${item.package_id}`,
        label: `${item.app_name}(${item.package_name})`,
    }));
};

onMounted(() => {
    queryAndroidAppListFunc({
        advertiser_id: drawerOptions.advertiser_id_array[0] ?? "1787695788195915",
        page_limit: 1000,
    });
});

const headline_application_value = ref();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleHeadlineApplicationChange = (val: any) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const filterAndroidApp: any = AndroidAppList.value.filter(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (app: any) => app.package_id === val,
    );
    form.app_name = filterAndroidApp[0].app_name;
    form.download_url = filterAndroidApp[0].download_url;

    autoMonitorLinkFunc({
        package_name: filterAndroidApp[0].package_name
    })
};


// 同步
const handleAndroidApplicationListRefresh = () => {
    console.log('同步')
    syncAndroidAppFunc({
        advertiser_id: drawerOptions.advertiser_id_array.join(',')
    })
}

const syncAndroidAppFunc = async (params: ISyncAndroidApp) => {
    try {
        const res = await syncAndroidApp(params);
        console.log(res);

        if (res.state === 1) {

            ElMessage({
                type: "success",
                message: res.msg
            })

            queryAndroidAppListFunc({
                advertiser_id: drawerOptions.advertiser_id_array[0] ?? "1787695788195915",
                page_limit: 1000,
            });
        }
    } catch (error) {
        console.error("error with syncAndroidAppFunc", error);
    }
}




// 自动生成监测链接
const autoMonitorLinkFunc = async (params: IAutoMonitorLink) => {
    const res = await autoMonitorLink(params);
    if (res.state === 1) {
        form.track_url_setting = res.data.track_url_setting;
    }
}



// 项目排期与预算
// 投放时间
const schedule_date = ref();
const handleScheduleDateChange = () => {
    if (schedule_date.value) {
        [form.start_time, form.end_time] = schedule_date.value;
    } else {
        [form.start_time, form.end_time] = ["", ""];
    }
};

// 优化目标
// 事件回传方式
// const eventReturnMethod = ref(1);

// 查询优化目标
const optimizeGoal = ref<IGetOptimizeGoalResultData[]>([]);
const deepOptimizeGoal = ref([
    {
        deep_external_action: "NONE",
        optimization_name: "无",
    },
]);

const getOptimizeGoalFunc = async () => {
    try {
        const res = await getOptimizeGoal();
        if (res.state === 1) {
            optimizeGoal.value = res.data;
        } else {
            ElMessage({
                message: "查询优化目标失败",
                type: "warning",
            });
        }
    } catch (error) {
        console.error("error with getOptimizeGoalFunc", error);
    }
};

onMounted(() => {
    getOptimizeGoalFunc();
});

const selectOptimizeGoal = (val: string) => {
    const deep_goals_map = optimizeGoal.value.filter(
        (item) => item.external_action === val,
    )[0];

    if (deep_goals_map.deep_goals) {
        deepOptimizeGoal.value = [
            {
                deep_external_action: "NONE",
                optimization_name: "无",
            },
        ];

        if (deep_goals_map.deep_goals.length > 0) {
            deepOptimizeGoal.value.push(...deep_goals_map.deep_goals);
        }
    } else {
        form.deep_external_action = "NONE";
        deepOptimizeGoal.value = [
            {
                deep_external_action: "NONE",
                optimization_name: "无",
            },
        ];
    }
};

const selectDeepOptimizeGoal = () => {
    getDeepOptimizeTypeFunc({
        advertiser_id: drawerOptions.advertiser_id_array[0] ?? "1787695788195915",
        external_action: form.external_action,
        delivery_mode: form.delivery_mode,
        landing_type: form.landing_type,
        deep_external_action: form.deep_external_action,
    });
};

// 查询可用深度优化方式
const deep_bid_type_radio_filtered = ref<{ value: string; label: string }[]>(
    [],
);

const getDeepOptimizeTypeFunc = async (params: IGetDeepOptimizeType) => {
    const res = await getDeepOptimizeType(params);
    if (res.state === 1) {
        if (res.data.length > 0) {
            deep_bid_type_radio_filtered.value = deep_bid_type_radio.filter((radio) =>
                res.data.includes(radio.value),
            );
        } else {
            deep_bid_type_radio_filtered.value = [];
            form.deep_bid_type = "";
        }
    }
};

const schedule_time_type = ref(1);
const search_bid_ratio_type = ref(1);

const budget = ref();

watchEffect(() => {
    if (budget.value) {
        form.pre_budget_group.push({
            budget: budget.value,
        });
    }
});

const handleBudgetChange = (val: number) => {
    budget.value = val;
};

// 卡片切换
const boxCardItem = ref([
    {
        id: 0,
        title: "应用推广",
        content: "推广您的线上APP",
        active: true,
        value: "APP",
    },
    {
        id: 1,
        title: "小程序",
        content: "吸引更多用户进入小程序",
        active: false,
        value: "MICRO_GAME",
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
                form.landing_type = item.value;
            }
            return {
                id: item.id,
                title: item.title,
                content: item.content,
                active: item.active,
                value: item.value,
            };
        });
    });
};

// 应用推广类型切换方法
const handleAppPromotionTypeChange = (value: string) => {
    console.log(value);
    // ElMessageBox.confirm(
    //     "切换子目标将会清空您已填写的所有内容，是否继续切换？",
    //     "提示",
    //     {
    //         confirmButtonText: "确认",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //         icon: markRaw(WarningFilled),
    //     },
    // )
    //     .then(() => {
    //         // form.app_promotion_type = value;
    //         console.log(123213213);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
};

const AudiencePackageState = reactive({
    visible: false,
    size: 1016,
});

// 选择定向包
const selectAudiencePackage = () => {
    AudiencePackageState.visible = true;
};

const selectedTargetingPackage = ref([]);

const handleAudiencePackageDrawerClose = (options: {
    type: number;
    selectedTargetingPackage: any;
}) => {
    if (options.type === 1) {
        AudiencePackageState.visible = false;
        selectedTargetingPackage.value = options.selectedTargetingPackage;
        form.preference_group = selectedTargetingPackage.value.map((item: any) => {
            return {
                audience_package_id: item.audience_package_id
            }
        });
    } else {
        AudiencePackageState.visible = false;
    }
};

// 首选媒体
const checkAll = ref(false);
const indeterminate = ref(false);

// watch(form.inventory_type, (val) => {
//     if (val.length === 0) {
//         checkAll.value = false;
//         indeterminate.value = false;
//     } else if (val.length === inventory_type_radio.length) {
//         checkAll.value = true;
//         indeterminate.value = false;
//     } else {
//         indeterminate.value = true;
//     }
// });
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleCheckAll = (val: any) => {
    indeterminate.value = false;
    if (val) {
        form.inventory_type = inventory_type_radio.map((_) => _.value);
    } else {
        form.inventory_type = [];
    }
};



// 选择自动投放
const handleDeliveryModeChange = (value: string) => {
    console.log(value);

    if (value === 'PROCEDURAL') {
        form.budget_mode = 'BUDGET_MODE_DAY'
    }
}




</script>
