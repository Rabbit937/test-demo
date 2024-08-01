<template>
  <!-- 标题 -->
  <el-row class="flex grid-justify-between line-height-48px shadow-[0_2px_4px_0px_rgba(0,0,0,.08)]"
    style="background-color: #fff;">
    <el-col :span="1.5" class="ml-16px">
      <el-text class="text-black font-size-14px font-700">程序化批量/巨量广告</el-text>
    </el-col>
    <el-col :span="1.5" class="flex flex-items-center mr-16px">
      <el-button text class="font-size-12px font-600" type="primary" @click="OpenTaskView">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+PHBhdGggZmlsbD0iIzE5N2FmYiIgZD0iTTgzMS44MjUgNjMuOTRIMTkxLjk0Yy03MC42OTIgMC0xMjggNTcuMzA4LTEyOCAxMjh2NjM5Ljg4NWMwIDcwLjY5MiA1Ny4zMDggMTI4IDEyOCAxMjhoNjM5Ljg4NWM3MC42OTIgMCAxMjgtNTcuMzA4IDEyOC0xMjhWMTkxLjk0YzAtNzAuNjkyLTU3LjMwOC0xMjgtMTI4LTEyOHpNODk1Ljg4NSA4MzJhNjMuODM1IDYzLjgzNSAwIDAgMS02My45NzMgNjMuODg2SDE5Mi4wODhjLTE3LjExMiAwLTMzLjI3LTYuNTc1LTQ1LjM3Mi0xOC42NzZzLTE4LjgzNi0yOC4wOTgtMTguODM2LTQ1LjIxVjE5MmE2NC4yMzYgNjQuMjM2IDAgMCAxIDY0LjIwOC02NC4xMmg2MzkuODI0QTY0LjAzOCA2NC4wMzggMCAwIDEgODk1Ljg4NSAxOTJWODMyeiIvPjxwYXRoIGZpbGw9IiMxOTdhZmIiIGQ9Ik03OTEuOTk4IDM1MS44NTJINTM2YTMxLjk3IDMxLjk3IDAgMCAwIDAgNjMuOTRoMjU2YTMxLjk3IDMxLjk3IDAgMCAwIDAtNjMuOTR6bTAgMjU2LjEyMUg1MzZhMzEuOTcgMzEuOTcgMCAwIDAgMCA2My45NGgyNTZhMzEuOTcgMzEuOTcgMCAwIDAgMC02My45NHptLTQ0Ny45OTYtNzkuOTc1Yy02MS44NTYgMC0xMTEuOTg2IDUwLjE0NC0xMTEuOTg2IDExMS45ODVTMjgyLjE2IDc1MS45NyAzNDQuMDAyIDc1MS45N3MxMTEuOTg1LTUwLjE0NCAxMTEuOTg1LTExMS45ODYtNTAuMTMtMTExLjk4NS0xMTEuOTg1LTExMS45ODV6bTMzLjk4MiAxNDUuOTgyYTQ4LjA0NSA0OC4wNDUgMCAxIDEgMTQuMDg4LTMzLjk4MiA0Ny43NDYgNDcuNzQ2IDAgMCAxLTE0LjA4OCAzMy45ODZ6bTM5LjQxMi0zNzYuNTg2TDMxMS45OTkgNDAyLjc4N2wtNDEuMzkxLTQxLjM5NWEzMS45NyAzMS45NyAwIDEgMC00NS4yMTMgNDUuMjEzbDYzLjk5NyA2NC4wMDJhMzEuOTcgMzEuOTcgMCAwIDAgNDUuMjE0IDBsMTI4LTEyOGEzMS45NyAzMS45NyAwIDAgMC00NS4yMS00NS4yMTN6Ii8+PC9zdmc+"
          class="w-18px h-18px mr-8px" />
        查看任务管理
      </el-button>
    </el-col>
  </el-row>

  <!-- 功能区 -->
  <el-row class="pl-20px pr-20px mt-16px mb-24px">
    <el-col class="pb-16px bg-#fbfcfd"
      style="border: solid #e8eaec;border-width: 1px 1px 0;border-radius: 4px 4px 0 0;">
      <el-row class="flex grid-justify-between line-height-48px pl-16px pr-16px">
        <el-col :span="1.5">
          <!-- <el-button type="primary" class="w-160px h-32px" @click="selectStrategy">选择策略</el-button> -->
        </el-col>
        <el-col :span="1.5" class="flex flex-items-center font-size-12px font-400 cursor-pointer">
          <EstimatedAdCount />
        </el-col>
      </el-row>
      <el-row class="flex p-16px pb-0px">
        <el-col :span="1.5">
          <SelectAccountVue :prefix-title="'媒体账户'" @handleChange="handleMediaAccount">
            <span v-if="SelectMediaAccountListLength === 0" class="color-[#c6c6c6]"
              @click="handleMediaAccount">请选择媒体账户</span>
            <div v-else>{{ SelectMediaAccountList[0].ALIAS }}</div>
            <!-- 显示账户信息 -->
            <!-- <template v-else>
              <el-popover placement="bottom" trigger="click" width="502">
                <template #default>
                  <el-row class="flex grid-justify-between flex-items-center w-100% pt-8px pb-8px">
                    <el-col :span="1.5">
                      <el-text size="small">已选账户</el-text>
                    </el-col>
                    <el-col :span="1.5">
                      <el-text type="primary" size="small" class="cursor-pointer">
                        上传头像
                      </el-text>
                    </el-col>
                  </el-row>
                  <div class="w-100% overflow-x-hidden overflow-y-auto" style="max-height: 320px">
                    <div class="flex grid-justify-start p-6px m-auto mt-8px mb-8px pos-relative"
                      style="background-color: #f2f2f2; border-radius: 4px" v-for="(item) in SelectMediaAccountList">
                      <img
                        src="data:image/png;base64,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"
                        alt="加载失败" class="w-32px h-32px mr-8px" />
                      <div class="overflow-hidden font-size-12px color-[#999]">
                        <div>
                          <el-text size="small" class="!color-[#999]">{{ item.ALIAS }}</el-text>
                        </div>
                        <div>
                          <el-text size="small" class="!color-[#999]">{{ item.ADVERTISER_ID }}</el-text>
                        </div>
                      </div>
                      <el-icon class="!pos-absolute right-10px cursor-pointer">
                        <CloseBold />
                      </el-icon>
                    </div>
                  </div>
                </template>
<template #reference>
                  <div>{{ SelectMediaAccountList[0].ALIAS }}</div>
                </template>
</el-popover>
</template> -->
          </SelectAccountVue>
        </el-col>
        <el-col :span="1.5" class="ml-16px">
          <SelectAccountVue :prefix-title="'规则配置'" @handle-change="handleChangeRuleConfiguration">
            <span class="inline-block w-110px">
              <label class="color-[#c6c6c6]">项目规则:</label>
              {{ ruleConfiguration?.project.rule === 'creative' ? '创意组' : '指定数量' }}
            </span>
            <span class="inline-block w-110px" v-if="ruleConfiguration?.project.rule !== 'creative'">
              <label class="color-[#c6c6c6]">广告规则:</label>
              {{ ruleConfiguration?.promotion.rule ? '自动生成' : '' }}
            </span>
          </SelectAccountVue>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="bg-#fff">
      <table class="font-size-12px w-100%">
        <colgroup>
          <col style="width: 25%" />
          <col style="width: 19%" />
          <col style="width: 48%" />
          <col style="width: 19%" />
          <col style="width: 19%" />
        </colgroup>
        <thead>
          <tr class="pt-8px pb-8px">
            <th style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5">
              <div class="flex grid-justify-between !font-normal p-[5px_16px]">
                <div class="font-size-14px color-[#333]" v-if="infoOrNew === 'info'">项目信息</div>
                <div class="font-size-14px color-[#333]" v-else>新建项目</div>
                <div class="color-[#999]">
                  <el-text size="small" v-if="infoOrNew === 'info'">从新项目创建</el-text>
                  <el-text size="small" v-else>从已有项目创建</el-text>
                  <el-button link size="small" type="primary" class="ml-8px" @click="handleChangeInfoOrNew">
                    切换
                  </el-button>
                </div>
              </div>
            </th>
            <th style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5">
              <div class="flex grid-justify-between !font-normal p-[5px_16px]">
                <div class="font-size-14px color-[#333]">广告信息</div>
              </div>
            </th>
            <th style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5">
              <div class="flex grid-justify-between !font-normal p-[5px_16px]">
                <div class="font-size-14px color-[#333]">
                  <span>创意素材</span>
                  <span class="font-size-12px color-[#999] ml-8px">已选创意组: 0/ 200</span>
                </div>
                <div>
                  <el-button icon="RefreshRight" size="small" link type="primary" class="ml-8px">
                    清空
                  </el-button>
                </div>
              </div>
            </th>
            <th style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5">
              <div class="flex grid-justify-between !font-normal p-[5px_16px]">
                <div class="font-size-14px color-[#333]">
                  <span>标题包</span>
                  <span class="font-size-12px color-[#999] ml-8px">0/ 50</span>
                </div>
                <div>
                  <el-button icon="RefreshRight" size="small" link type="primary" class="ml-8px">
                    清空
                  </el-button>
                </div>
              </div>
            </th>
            <th style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5">
              <div class="flex grid-justify-between !font-normal p-[5px_16px]">
                <div class="font-size-14px color-[#333]">
                  <span>落地页</span>
                </div>
                <div>
                  <el-button icon="RefreshRight" size="small" link type="primary" class="ml-8px">
                    清空
                  </el-button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <el-scrollbar height="300px" class="p-8px" v-if="NewProjectForm">
                <div class="color-[#333] font-size-14px mb-8px font-bold">
                  <span>基本信息</span>
                </div>
                <div class="line-height-24px">
                  <span>项目名称：{{ NewProjectForm.name }}</span>
                </div>
                <div class="line-height-24px">
                  <span>项目预算：{{ budget_mode_radio.filter(budget_mode => budget_mode.value
                    === NewProjectForm?.budget_mode)[0].label }}</span>
                </div>
                <div class="line-height-24px">
                  <span>推广目的：{{ landing_type_radio[NewProjectForm.landing_type] }}</span>
                </div>
                <div class="line-height-24px">
                  <span>子目标： {{ app_promotion_type_radio.filter(app_promotion_type => app_promotion_type.value
                    === NewProjectForm?.app_promotion_type)[0].label }}
                  </span>
                </div>
                <div class="line-height-24px">
                  <span>营销场景：
                    {{ marketing_goal_radio.filter(marketing_goal => marketing_goal.value
                      === NewProjectForm?.marketing_goal)[0].label }}
                  </span>
                </div>
                <div class="line-height-24px">
                  <span>投放模式：
                    {{ delivery_mode_radio.filter(delivery_mode => delivery_mode.value
                      === NewProjectForm?.delivery_mode)[0].label }}
                  </span>
                </div>
                <div class="line-height-24px">
                  <span>广告类型： {{ ad_type_radio.filter(ad_type => ad_type.value
                    === NewProjectForm?.ad_type)[0].label }}
                  </span>
                </div>
                <div class="line-height-24px">
                  <span>投放类型：

                    {{ delivery_type_radio.filter(delivery_type => delivery_type.value
                      === NewProjectForm?.delivery_type)[0].label }}
                  </span>
                </div>
                <div class="line-height-24px">
                  <span>优化目标：{{ external_action_radio[String(NewProjectForm.external_action)] }}</span>
                </div>
                <div class="line-height-24px">
                  <span>深度优化目标：{{ deep_external_action_radio[String(NewProjectForm.deep_external_action)] }}</span>
                </div>

                <!-- <div class="line-height-24px">
                  <span>深度优化方式：{{}}</span>
                </div> -->

                <div class="line-height-24px">
                  <span>广告位置：

                    {{ inventory_catalog_radio.filter(inventory_catalog => inventory_catalog.value
                      === NewProjectForm?.inventory_catalog)[0].label }}

                  </span>
                </div>

                <!-- <div class="line-height-24px">
                  <span>事件回传方式：{{}}</span>
                </div> -->


                <div class="line-height-24px">
                  <span>投放时间：
                    {{ schedule_type_radio.filter(schedule_type => schedule_type.value
                      === NewProjectForm?.schedule_type)[0].label }}
                  </span>
                </div>


                <div class="line-height-24px">
                  <span>投放时段：{{}}</span>
                </div>


                <div class="line-height-24px">
                  <span>搜索快投：{{}}</span>
                </div>


                <div class="line-height-24px">
                  <span>竞价策略：
                    {{ bid_type_radio.filter(bid_type => bid_type.value
                      === NewProjectForm?.bid_type)[0].label }}
                  </span>
                </div>
              </el-scrollbar>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px p-8px">
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label> 广告名称：</label>
                    <p class="p-0px m-0px">&lt;日期&gt;-&lt;时分秒&gt;-&lt;当日标号&gt;</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>广告预算：</label>
                    <p class="p-0px m-0px">{{ BasicInformationOfAdForm?.pre_promotion_budget_group[0].budget ?? '无' }}
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>广告出价：</label>
                    <p class="p-0px m-0px">无</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>产品名称：</label>
                    <p class="p-0px m-0px">{{ BasicInformationOfAdForm?.product_info_group[0].product_info.titles[0] ??
                      '无'
                      }}
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>广告评论：</label>
                    <p class="p-0px m-0px">不启用</p>
                  </div>
                </div>
              </div>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px p-8px">
                <div v-for="(item, index) in CreativeMaterialsData" :key="index" class="mb-8px">
                  <div v-for="(video, vidIndex) in item.videoInfo" :key="vidIndex" class="mb-8px">
                    <img class="w-88px h-50px" :src="video.post_url" alt="素材图片">
                  </div>
                </div>
              </div>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px p-8px overflow-hidden">
                <el-scrollbar height="284px">
                  <div v-if="TitlePackData.length > 0" v-for="(TitlePack) in TitlePackData"
                    class="flex align-items-center justify-between h-32px px-8px mb-4px font-400 color-[#666] cursor-pointer bg-[#fafafa] border-radius-4px">
                    <span>{{ TitlePack.tag_name }}</span>
                    <!-- <el-icon>
                      <CloseBold />
                    </el-icon> -->
                  </div>
                </el-scrollbar>
              </div>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px p-8px overflow-hidden">
                <el-scrollbar height="284px">
                  <div v-if="checkedLandingPage.length > 0" v-for="(landingPage) in checkedLandingPage"
                    class="flex align-items-center justify-between h-32px px-8px mb-4px font-400 color-[#666] cursor-pointer bg-[#fafafa] border-radius-4px">
                    <span>{{ landingPage.name }}</span>
                    <!-- <el-icon>
                      <CloseBold />
                    </el-icon> -->
                  </div>
                </el-scrollbar>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <!-- 新建项目 -->
              <el-popover placement="top" trigger="hover" width="170" :disabled="ADVERTISER_ID_ARRAY.length > 0">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px" @click="handleMediaAccount"> 编辑
                    </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" type="primary" @click="openProjectEdit"
                    :disabled="ADVERTISER_ID_ARRAY.length === 0">编辑</el-button>
                </template>
              </el-popover>




            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <!-- 广告信息 -->
              <el-popover placement="top" trigger="hover" width="170" :disabled="ADVERTISER_ID_ARRAY.length > 0">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px" @click="handleMediaAccount"> 编辑
                    </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" type="primary" @click="showBasicInformationOfAd"
                    :disabled="ADVERTISER_ID_ARRAY.length === 0">编辑</el-button>
                </template>
              </el-popover>
            </td>


            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <!-- 创意素材 -->
              <el-popover placement="top" trigger="hover" width="170" :disabled="ADVERTISER_ID_ARRAY.length > 0">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px"> 编辑</el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" type="primary" @click="showCreativeMaterialsState"
                    :disabled="ADVERTISER_ID_ARRAY.length === 0">编辑</el-button>
                </template>
              </el-popover>
            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <!-- 标题包 -->
              <el-popover placement="top" trigger="hover" width="170" :disabled="ADVERTISER_ID_ARRAY.length > 0">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px" @click="handleMediaAccount"> 编辑
                    </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" type="primary" @click="showTitlePackState"
                    :disabled="ADVERTISER_ID_ARRAY.length === 0">编辑</el-button>
                </template>
              </el-popover>
            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <!-- 落地页 -->
              <el-popover placement="top" trigger="hover" width="170" :disabled="ADVERTISER_ID_ARRAY.length > 0">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px" @click="handleMediaAccount"> 编辑
                    </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" type="primary" @click="showLandingPageState"
                    :disabled="ADVERTISER_ID_ARRAY.length === 0">编辑</el-button>
                </template>
              </el-popover>
            </td>
          </tr>
        </tfoot>
      </table>
    </el-col>
  </el-row>

  <!-- 功能按钮 -->
  <el-row class="pl-20px pr-20px mt-16px mb-24px">
    <el-col :span="24" class=" p-24px border-[#e8eaec]">
      <div class="w-100% flex justify-center">
        <el-button type="primary" class="w-120px" @click="generateAdPreview">生成广告预览</el-button>
      </div>
    </el-col>
  </el-row>
  <!-- 预览区 -->
  <el-row class="pl-20px pr-20px mt-16px mb-24px pb-20px">
    <el-col class=" flex grid-justify-center ">
      <div class="panel-header flex justify-between px-24px h-48px align-items-center border-[#e8eaec]"
        style="border-bottom: 0px;">
        <div class="font-size-16px font-700 color-[#333]">
          <span>预览区</span>
        </div>
        <div class="flex align-items-center">
          <!-- <div class="mr-16px font-size-12px color-[#515a6e]"> -->
          <!-- <span>预计生成<b>4</b>个广告</span> -->
          <!-- </div> -->
          <el-button type="primary" @click="commitTaskFunc()">
            <span>全部提交审核</span>
          </el-button>
        </div>
      </div>

      <div>
        <!-- <div class="preview-tabs">
          <div class="preview-tab preview-tab--active">
            <div class="preview-tab__inner">
              <span>
                加速星期二-天拓-4(1787695788195915)
              </span>
            </div>
          </div>
        </div> -->

        <div v-if="false" class="flex justify-between bg-[#fff] align-items-center"
          style="box-sizing:border-box;height: 56px;padding: 14px 24px 18px 32px;">
          <div>
            <el-checkbox size="small" label="全选" />
          </div>
          <div class="flex align-items-center">
            <div class="font-size-12px font-400 color-[#666]">
              <span class="mr-16px">项目数量：<span class="pr-3px font-700 color-[#333]">4</span></span>
              <span class="mr-16px">广告数量：<span class="pr-3px font-700 color-[#333]">4</span></span>
              <span class="mr-16px">已有项目：<span class="pr-3px font-700 color-[#333]">4</span></span>
              <span class="mr-16px">当日新建广告数：<span class="pr-3px font-700 color-[#333]">4</span></span>
              <span class="mr-16px">所有广告配额：<span class="pr-3px font-700 color-[#333]">4</span></span>
            </div>
            <!-- <div class="w-120px">
              <el-select placeholder="批量操作">
                <el-option>删除</el-option>
              </el-select>
            </div> -->
          </div>
        </div>

        <div>
          <el-table :data="PreviewPromotionInfoTableData" style="width: 100%" empty-text="没有数据"
            @select-all="handlePreviewPromotionInfoSelectAll"
            @selection-change="handlePreviewPromotionInfoSelectionChange" max-height="300">
            <el-table-column label="项目">
              <el-table-column label="项目信息">
                <template #default="scope">
                  <div>
                    <span>
                      {{ scope.row.project_name }}
                    </span>
                  </div>
                  <div>
                    <span>
                      {{ budget_mode_radio.filter(inventory_type => inventory_type.value ===
                        scope.row.delivery_setting.budget_mode)[0].label }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="转化目标">
                <template #default="scope">
                  <div>
                    <span>
                      {{ deep_external_action_radio[scope.row.optimize_goal.deep_external_action] ?? '无' }}
                    </span>
                  </div>
                  <div>
                    <span>
                      {{ external_action_radio[String(scope.row.optimize_goal.external_action)] }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="广告位置">
                <template #default="scope">
                  <div v-if="scope.row.delivery_range.inventory_catalog === 'MANUAL'">
                    <span v-for="item in scope.row.delivery_range.inventory_type">
                      {{ inventory_type_radio.filter(inventory_type => inventory_type.value === item)[0].label }} &nbsp;
                    </span>
                  </div>
                  <div v-else>
                    <span>
                      {{ scope.row.delivery_range.inventory_catalog }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="定向包">
                <template #default="scope">
                  <div>
                    <span>
                      名称： {{ scope.row.audience }}
                    </span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="广告">
              <el-table-column type="selection" width="55" />
              <el-table-column label="广告名称">
                <template #default="scope">
                  <div>
                    <span>
                      名称： {{ scope.row.promotion_conf.promotion_name }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="预算与出价" prop="conversionGoal">
                <template #default="scope">
                  <div>
                    <span>
                      预算：{{ scope.row.promotion_conf.budget }}
                    </span>
                  </div>
                  <div>
                    <span>
                      预算模式： {{ scope.row.promotion_conf.budget_mode }}
                    </span>
                  </div>
                  <div>
                    <span>
                      转化出价： {{ scope.row.promotion_conf.cpa_bid }}
                    </span>
                  </div>

                  <div>
                    <span>
                      深度优化出价：{{ scope.row.promotion_conf.deep_cpabid === "0.00" ? "无" :
                        scope.row.promotion_conf.deep_cpabid }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="创意素材">
                <template #default="scope">
                  <div>
                    <span>
                      创意素材数量：{{ scope.row.promotion_conf.promotion_materials.video_material_list.length }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="标题包">
                <template #default="scope">
                  <div v-for="item in scope.row.promotion_conf.promotion_materials.title_material_list">
                    <span>
                      标题名称：{{ item.title }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="广告资产">
                <template #default="scope">
                  <div>
                    <span>
                      落地页数量：{{ scope.row.promotion_conf.promotion_materials.web_url_material_list.length }}
                    </span>
                  </div>

                  <div>
                    <span>
                      抖音号：{{ scope.row?.promotion_conf?.native_setting?.aweme_id ?? "无" }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="提交状态">
                <span>待提交</span>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>


      <!-- <el-empty image="https://cl.mobgi.com/img/mobgi_ic_addata_nodata.28d42792.png">
        <template #description>
          <span class="font-size-48px line-height-67px color-[#e0e3e7]">预览区</span>
        </template>
              <template #default>
          <span class="font-size-14px line-height-20px color-[#808695]">请先完成相应模块配置后，再预览内容</span>
        </template>
              </el-empty> -->
    </el-col>
  </el-row>

  <!-- 选择策略 -->
  <!-- <SelectStrategyDialog :visible="selectStrategyState.visible" @handleClose="handleSelectStrategyDialogClose" /> -->

  <!-- 选择媒体账户 -->
  <SelectMediaAccountDialog :visible="SelectMediaAccountState.visible" @handleClose="handleMediaAccountDialogClose" />

  <!-- 选择规则配置 -->
  <RuleConfigurationDialog :visible="RuleConfigurationState.visible" :infoOrNew="RuleConfigurationState.infoOrNew"
    @handleClose="handleRuleConfigurationDialogClose" />

  <!-- 新建项目 -->
  <NewProject :visible="NewProjectState.visible" @handleNewProjectClose="handleNewProjectClose"
    :advertiser_id_array="ADVERTISER_ID_ARRAY" />

  <ExistingProject :visible="ExistingProjectState.visible" @handleExistingProjectClose="handleExistingProjectClose" />

  <!-- 广告基本信息 -->
  <BasicInformationOfAd :visible="BasicInformationOfAdState.visible"
    @handleBasicInformationOfAdClose="handleBasicInformationOfAdClose" />

  <!-- 创意素材 -->
  <CreativeMaterials :visible="CreativeMaterialsState.visible" @handleDrawerClose="handleCreativeMaterialsStateClose" />

  <!-- 标题包 -->
  <TitlePack :visible="TitlePackState.visible" @handleDrawerClose="handleTitlePackStateClose" />

  <!-- 落地页 -->
  <LandingPage :visible="LandingPageState.visible" @handleDrawerClose="handleLandingPageStateClose" />
</template>

<script setup lang="ts">
import { type Ref, ref, reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import "element-plus/es/components/message-box/style/css";
import RuleConfigurationDialog from "./components/RuleConfigurationDialog.vue";
import NewProject from "./components/NewProject.vue";
import ExistingProject from "./components/ExistingProject.vue";
import SelectAccountVue from "./components/SelectAccount.vue";
import SelectMediaAccountDialog from "./components/SelectMediaAccountDialog.vue";
import EstimatedAdCount from "./components/EstimatedAdCount.vue";
import BasicInformationOfAd from "./components/BasicInformationOfAd.vue";
import CreativeMaterials from "./components/CreativeMaterials.vue";
import TitlePack from "./components/TitlePack.vue";
import LandingPage from "./components/LandingPage.vue";
import { createPromotionByNewProject, queryPreviewPromotionInfo, commitTask } from "@/api/modules/promotion";
import type { ICreatePromotionByNewProject, ICreativeMaterials, ILandingPage, INewProject, IQueryPreviewPromotionInfo, IRuleConfiguration } from "@/api/modules/promotion";
import { bid_type_radio, schedule_type_radio, inventory_catalog_radio, delivery_type_radio, ad_type_radio, inventory_type_radio, external_action_radio, deep_external_action_radio, budget_mode_radio, landing_type_radio, app_promotion_type_radio, marketing_goal_radio, delivery_mode_radio } from '../radio-info/NewProject'
import { useRouter } from "vue-router";


// 新建项目
const NewProjectForm = ref<INewProject>();
const NewProjectState = reactive({ visible: false });

const openNewProjectDrawer = () => {
  NewProjectState.visible = true;
};

// 广告基本信息
const BasicInformationOfAdForm = ref();
const BasicInformationOfAdState = reactive({ visible: false });

const showBasicInformationOfAd = () => {
  BasicInformationOfAdState.visible = true;
};

// 提取公共逻辑函数
const handleDrawerClose = (
  drawerState: { visible: boolean },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  formRef: Ref<any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  options: { type: number; form?: any },
) => {
  if (options.type === 1) {
    formRef.value = options.form;
    drawerState.visible = false;
  } else {
    ElMessageBox.confirm(
      "您确定关闭这个弹窗吗？关闭之后，所编辑的内容将不会保存",
      "提示",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      },
    )
      .then(() => {
        drawerState.visible = false;
      })
      .catch(() => {
        console.error("drawer component: fail");
      });
  }
};

// 接收新建项目的返回
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleNewProjectClose = (options: { type: number; form?: any }) => {
  handleDrawerClose(NewProjectState, NewProjectForm, options);
};

const handleBasicInformationOfAdClose = (options: {
  type: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form?: any;
}) => {

  console.log(options);

  handleDrawerClose(
    BasicInformationOfAdState,
    BasicInformationOfAdForm,
    options,
  );
};

// 选择媒体账户
const SelectMediaAccountState = reactive({
  visible: false,
});

const handleMediaAccount = () => {
  SelectMediaAccountState.visible = true;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const SelectMediaAccountList = ref<any[]>([]);

const handleMediaAccountDialogClose = (
  type: number,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  multipleSelection: any,
) => {
  SelectMediaAccountState.visible = false;
  if (type === 1) {
    SelectMediaAccountList.value = multipleSelection;
  }
};

const SelectMediaAccountListLength = computed(() => {
  return SelectMediaAccountList.value.length;
});

// 生成ADVERTISER_ID数组
const ADVERTISER_ID_ARRAY = computed(() => {
  return (
    SelectMediaAccountList.value.map((item: any) => item.ADVERTISER_ID) ?? []
  );
});

// 更改规则配置
const RuleConfigurationState = reactive({
  visible: false,
  infoOrNew: "",
});

const handleChangeRuleConfiguration = () => {
  RuleConfigurationState.visible = true;
  RuleConfigurationState.infoOrNew = infoOrNew.value;
};

const ruleConfiguration = ref<IRuleConfiguration>();
const handleRuleConfigurationDialogClose = (options: {
  type: number;
  ruleConfiguration: IRuleConfiguration;
}) => {
  RuleConfigurationState.visible = false;
  if (options.type === 1) {
    ruleConfiguration.value = options.ruleConfiguration;
  }
};

// 切换项目
const infoOrNew = ref("new");

// 新建项目和项目信息切换
const handleChangeInfoOrNew = () => {
  infoOrNew.value = infoOrNew.value === "new" ? "info" : "new";
  NewProjectForm.value = undefined;
};

// 已有项目
const ExistingProjectState = reactive({
  visible: false,
});

// 选择已有项目
const openExistingProjectDrawer = () => {
  ExistingProjectState.visible = true;
};

const openProjectEdit = () => {
  if (infoOrNew.value === "new") {
    openNewProjectDrawer();
  } else {
    openExistingProjectDrawer();
  }
};

const handleExistingProjectClose = () => { };

// 创意素材
const CreativeMaterialsForm = ref<ICreativeMaterials>()
const CreativeMaterialsState = reactive({
  visible: false,
});
const CreativeMaterialsData = ref<any[]>([])

const showCreativeMaterialsState = () => {
  CreativeMaterialsState.visible = true;
};

const handleCreativeMaterialsStateClose = (options: { type: number, form: any, components: any }) => {
  handleDrawerClose(CreativeMaterialsState, CreativeMaterialsForm, options);

  if (options.type === 1) {
    CreativeMaterialsData.value = options.components;
    console.log("CreativeMaterialsData------>", CreativeMaterialsData.value);
  }
};

// 标题包
// 用户接口调教数据
const TitlePackForm = ref<ILandingPage>()
// 控制组件显示
const TitlePackState = reactive({
  visible: false,
});
const TitlePackData = ref<any[]>([]);

const showTitlePackState = () => {
  TitlePackState.visible = true;
};

const handleTitlePackStateClose = (options: { type: number, form: any, titlePackData: any }) => {
  handleDrawerClose(TitlePackState, TitlePackForm, options);
  if (options.type === 1) {
    TitlePackData.value = options.titlePackData;
  }
};


// 选择落地页
const LandingPageForm = ref<ILandingPage>();
const LandingPageState = reactive({
  visible: false,
});
const checkedLandingPage = ref<any[]>([]);

const showLandingPageState = () => {
  LandingPageState.visible = true;
};

const handleLandingPageStateClose = (options: { type: number, form: any, checkedLandingPage: any }) => {
  handleDrawerClose(LandingPageState, LandingPageForm, options);

  if (options.type === 1) {
    checkedLandingPage.value = options.checkedLandingPage;
  }
};


// 生成广告预览
const generateAdPreview = () => {
  // console.log(ADVERTISER_ID_ARRAY);
  // console.log(ruleConfiguration.value);
  // console.log(NewProjectForm.value)
  // console.log(BasicInformationOfAdForm.value)
  // console.log(CreativeMaterialsForm.value)
  // console.log(TitlePackForm.value)
  // console.log(LandingPageForm.value)

  createPromotionByNewProjectFunc({
    advertiser_id: ADVERTISER_ID_ARRAY.value,
    ...ruleConfiguration.value,
    ...NewProjectForm.value,
    ...BasicInformationOfAdForm.value,
    ...CreativeMaterialsForm.value,
    ...TitlePackForm.value,
    ...LandingPageForm.value
  })
}


const adv_ids = ref();
// 生成广告预览接口
const createPromotionByNewProjectFunc = async (params: ICreatePromotionByNewProject) => {
  const res = await createPromotionByNewProject(params)
  console.log(res);
  if (res.state === 1) {
    adv_ids.value = res.data.adv_ids;
    queryPreviewPromotionInfoFunc({
      adv_ids: res.data.adv_ids.toString()
    })
  }
}


const PreviewPromotionInfoTableData = ref()
// 查询广告预览接口
const queryPreviewPromotionInfoFunc = async (params: IQueryPreviewPromotionInfo) => {
  const res = await queryPreviewPromotionInfo(params);

  if (res.state === 1) {
    for (const [key, value] of Object.entries(res.data)) {
      console.log(key, value)
      for (const [k, v] of Object.entries(value)) {
        console.log(k);
        PreviewPromotionInfoTableData.value = v;
      }
    }
  }
}



const selectionRef = ref<any[]>([])

// 预览全选
const handlePreviewPromotionInfoSelectAll = (selection: any[]) => {
  selectionRef.value = selection.map(select => select.promotion_conf.adv_id);
}

const handlePreviewPromotionInfoSelectionChange = (newSelection: any[]) => {
  selectionRef.value = newSelection.map(selection => selection.promotion_conf.adv_id);
}


const commitTaskFunc = async () => {
  try {
    const res = await commitTask({
      adv_ids: selectionRef.value.join(',')
    });
    console.log(res);

    if (res.state === 1) {
      ElMessage({
        message: '提交成功，请前往任务列表查看',
        type: 'success',
      })
    }

  } catch (error) {
    console.log(error);
  }
}


const router = useRouter();
// 打开任务管理
const OpenTaskView = () => {
  const routeData = router.resolve({ path: "/task" });
  window.open(routeData.href, "_blank");
};
</script>

<style scoped>
table {
  table-layout: fixed;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
}
</style>
