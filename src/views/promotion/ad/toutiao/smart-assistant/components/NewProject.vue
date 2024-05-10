<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size" @Close="handleDrawerClose">
        <section>
            <header style="
            position: relative;
            padding: 0 16px;
            background-color: #fff;
            border-bottom: 1px solid #e8eaec;
          ">
                <div class="font-size-16px font-700 line-height-48px color-[#333]">新建项目</div>
            </header>
            <el-scrollbar style="height: calc(100vh - 140px)">
                <main class="m-16px pl-16px pr-16px">
                    <!-- 推广目的 -->
                    <el-row class="mb-16px"
                        style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
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
                                            <div
                                                class="w-110px line-height-18px h-30px overflow-hidden color-[#999] font-size-12px">
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
                            <el-radio-group>
                                <el-radio-button :value="1"> 应用下载 </el-radio-button>
                                <el-radio-button :value="2"> 应用调起 </el-radio-button>
                                <el-radio-button :value="2"> 预约下载 </el-radio-button>
                            </el-radio-group>
                            <div>
                                <el-text size="small" class="line-height-24px color-[#999]">吸引用户下载并安装您的应用程序</el-text>
                            </div>
                        </el-col>

                        <el-col class="pl-16px pr-16px">
                            <el-form :label-width="144" label-position="left">
                                <el-form-item label="投放模式">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 手动投放 </el-radio-button>
                                        <el-radio-button :value="2"> 自动投放(UBMax) </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="营销场景">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 短视频+图文 </el-radio-button>
                                        <el-radio-button :value="2"> 直播 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="广告类型">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 通投广告 </el-radio-button>
                                        <el-radio-button :value="2"> 搜索广告 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>

                    <!-- 关联产品投放 -->
                    <el-row class="mb-16px"
                        style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                        <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">关联产品投放</el-col>
                        <el-col class="p-16px">
                            <el-form :label-width="144" label-position="left">
                                <el-form-item label="关联产品">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 不启用 </el-radio-button>
                                        <el-radio-button :value="2"> 启用 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="每个项目配置产品数">
                                    <el-input-number :min="1" :max="10" />
                                </el-form-item>

                                <el-form-item label="产品版本">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 升级版 </el-radio-button>
                                        <el-radio-button :value="2"> 通用版 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="匹配方式">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 所有项目选择同一组产品 </el-radio-button>
                                        <el-radio-button :value="2"> 每个账户选择一组产品 </el-radio-button>
                                        <el-radio-button :value="3"> 每个项目选择一组产品 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="选择产品">
                                    <el-button type="primary">选择产品</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>

                    <!-- 投放内容与目标 -->
                    <el-row class="mb-16px"
                        style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                        <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放内容与目标</el-col>
                        <el-col class="p-16px">
                            <el-form :label-width="144" label-position="left">
                                <el-form-item label="平台类型">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> Android </el-radio-button>
                                        <el-radio-button :value="2"> IOS </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="应用名称">
                                    <el-input style="width: 240px" placeholder="请输入应用名称" />
                                </el-form-item>

                                <el-form-item label="检测链接来源">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 巨量后台检测链接组 </el-radio-button>
                                        <el-radio-button :value="2"> 创量导入检测活动 </el-radio-button>
                                        <el-radio-button :value="2"> 手动输入 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="匹配方式">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 每个账户选择一个链接组 </el-radio-button>
                                        <el-radio-button :value="2"> 每个项目选择一个链接组 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="选择链接组">
                                    <el-button type="primary" :disabled="true">选择链接组</el-button>
                                </el-form-item>

                                <el-form-item label="下载方式">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 直接下载 </el-radio-button>
                                        <el-radio-button :value="2"> 落地页下载 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="数据对接方式">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 事件管理 </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="优化目标">
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
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>

                    <!-- 投放版位 -->
                    <el-row class="mb-16px"
                        style="background-color: #fff; border: 1px solid #e8eaec; border-radius: 6px">
                        <el-col class="h-48px pl-16px font-700 line-height-48px color-[#333]" style="
                  background-color: #fbfcfd;
                  border-bottom: 1px solid #e8eaec;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                ">投放版位</el-col>
                        <el-col class="p-16px">
                            <el-form :label-width="144" label-position="left">
                                <el-form-item label="广告位置">
                                    <el-radio-group>
                                        <el-radio-button :value="1"> 通选智选 </el-radio-button>
                                        <el-radio-button :value="2"> 首选媒体 </el-radio-button>
                                    </el-radio-group>
                                    <div>
                                        <el-text>通投智选下，广告会投到信息流和搜索场景，提升单计划跑量与效果稳定性</el-text>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </main>
            </el-scrollbar>

        </section>
    </Drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Drawer from '@/components/Drawer.vue'


const drawerOptions = reactive({
    visible: false,
    size: 1016
})

const handleDrawerClose = () => {
    drawerOptions.visible = false
}



const boxCardItem = ref([
    {
        id: 0,
        title: '应用推广',
        content: '推广您的线上APP',
        active: true
    },
    {
        id: 1,
        title: '小程序',
        content: '吸引更多用户进入小程序',
        active: false
    },
    {
        id: 2,
        title: '快应用',
        content: '吸引更多用户进入快应用',
        active: false
    }
])

const handleBoxCardItem = (id: number) => {
    boxCardItem.value = boxCardItem.value.map((item) => {
        item.active = false
        if (item.id === id) {
            item.active = true
        }
        return {
            id: item.id,
            title: item.title,
            content: item.content,
            active: item.active
        }
    })
}

</script>