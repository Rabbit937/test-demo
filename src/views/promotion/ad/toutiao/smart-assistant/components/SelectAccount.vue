<template>
    <Dialog :title="selectPopover.title" :visible="true" @handleClose="handleDialogClose">
        <!-- 选择媒体账户 -->
        <section class="font-size-12px color-[#666]" v-if="selectPopover.type === 1">
            <el-row class="flex mt-16px mb-16px">
                <el-col :span="1.5" class="mr-8px">
                    <el-select v-model="mediaAccountState.project" clearable placeholder="全部" style="width: 240px">
                        <template #prefix>创量项目:</template>
                        <el-option v-for="item in projectOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
                <el-col :span="1.5" class="mr-8px">
                    <el-select v-model="mediaAccountState.mainBody" clearable placeholder="全部" style="width: 240px">
                        <template #prefix>账户主体:</template>
                        <el-option v-for="item in mainBodyOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
                <el-col :span="1.5" class="mr-8px">
                    <el-input v-model="mediaAccountState.searchValue" style="max-width: 600px" placeholder="搜索媒体账户">
                        <template #append>
                            <el-button :icon="Search" size="small" />
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="1.5" class="flex mr-8px">
                    <el-button link size="small" type="primary">清空</el-button>
                </el-col>
            </el-row>
            <el-row class="mb-8px">
                <el-col>
                    <el-text size="small">
                        <el-icon color="#ff9b48">
                            <InfoFilled />
                        </el-icon>
                        仅支持同个主体账户
                    </el-text>
                </el-col>
            </el-row>
            <el-row class="mb-8px">
                <el-col>
                    <el-text size="small">
                        已选<el-text size="small" type="primary" class="!mr-4px !ml-4px">0</el-text>个账户
                    </el-text>
                    <el-text size="small" type="primary" class="!ml-8px"> 清空已选 </el-text>
                </el-col>
            </el-row>
            <el-row class="mb-8px">
                <el-col>
                    <el-table v-loading="loading" :data="tableData" :border="true" style="width: 100%; height: 300px"
                        fixed>
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="date" label="账户名称" width="180" />
                        <el-table-column prop="name" label="账户主体" width="180" sortable />
                        <el-table-column prop="address" label="账户备注" />
                        <el-table-column prop="address" label="创量项目" />
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <Pagination :currentPage="paginationState.currentPage" :pageSize="paginationState.pageSize"
                        :total="paginationState.total"></Pagination>
                </el-col>
            </el-row>
        </section>
        <!-- 规则配置 -->
        <section class="font-size-12px color-[#666]" v-if="selectPopover.type === 2">
            <el-form label-width="144" label-position="left">
                <el-form-item label="广告生成规则">
                    <el-radio-group v-model="ruleConfiguration.generateRuleValue">
                        <el-radio-button :value="1">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>自动生成</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>先选素材和标题，基于素材数量自动生成广告</span>
                                </p>
                            </div>
                        </el-radio-button>
                        <el-radio-button :value="2">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>指定数量</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>先指定广告数，再选素材和标题自动填充</span>
                                </p>
                            </div>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="每个项目下广告数" v-if="Number(ruleConfiguration.generateRuleValue) === 2">
                    <el-input-number v-model="ruleConfiguration.NumberOfAdvertisements" :min="1" :max="10000" />
                </el-form-item>
                <el-form-item label="标题分配规则">
                    <el-radio-group v-model="ruleConfiguration.allocationRuleValue">
                        <el-radio-button :value="1">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>程序化测试</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>参与动态叉乘，即每个创意组*标题包都将生成一条广告，标题包数量影响广告最终生成数量</span>
                                </p>
                            </div>
                        </el-radio-button>
                        <el-radio-button :value="2">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>自动匹配</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>不参与动态叉乘，根据创意组生成的广告数，自动匹配文案，所选文案数量不足时循环使用</span>
                                </p>
                            </div>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </section>
    </Dialog>
</template>