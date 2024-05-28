<template>
  <!-- 标题 -->
  <el-row class="flex grid-justify-between line-height-48px shadow-[0_2px_4px_0px_rgba(0,0,0,.08)]"
    style="background-color: #fff;">
    <el-col :span="1.5" class="ml-16px">
      <el-text class="text-black font-size-14px font-700">程序化批量/巨量广告</el-text>
    </el-col>
    <el-col :span="1.5" class="flex flex-items-center mr-16px">
      <el-button text class="font-size-12px font-600" type="primary">
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
          <el-button type="primary" class="w-160px h-32px" @click="selectStrategy">选择策略</el-button>
        </el-col>
        <el-col :span="1.5" class="flex flex-items-center font-size-12px font-400 cursor-pointer">
          <el-popover :width="528" trigger="click" @show="showPopover" @hide="hidePopover">
            <template #reference>
              <div>
                <span class="mr-8px">预估生成<span class="color-[#197afb] ml-4px mr-4px">0</span>条广告</span>
                <el-icon :style="dynamicStyles">
                  <ArrowDown />
                </el-icon>
              </div>
            </template>
            <el-table :data="gridData" max-height="500px" :header-row-style="{ fontSize: '12px', fontWeight: 700 }"
              empty-text="没有数据">
              <el-table-column width="200" property="date" label="账户" />
              <el-table-column width="64" property="name" label="项目数" />
              <el-table-column width="80" property="address" label="创意组数" />
              <el-table-column width="80" property="address" label="标题包数" />
              <el-table-column width="64" property="address" label="广告数" />
            </el-table>
          </el-popover>
        </el-col>
      </el-row>
      <el-row class="flex p-16px pb-0px">
        <el-col :span="1.5">
          <SelectAccountVue :prefix-title="'媒体账户'" @handle-change="handleChangeAccount">
            <span v-if="true" class="color-[#c6c6c6]"
              @click="showSelectPopover({ title: '选择媒体账户', type: 1 })">请选择媒体账户</span>
            <!-- 显示账户信息 -->
            <template v-else>
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
                      style="background-color: #f2f2f2; border-radius: 4px">
                      <img
                        src="data:image/png;base64,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"
                        alt="加载失败" class="w-32px h-32px mr-8px" />
                      <div class="overflow-hidden font-size-12px color-[#999]">
                        <div>
                          <el-text size="small" class="!color-[#999]">疯狂星期一-天拓-141</el-text>
                        </div>
                        <div>
                          <el-text size="small" class="!color-[#999]">1794187978880266</el-text>
                        </div>
                      </div>
                      <el-icon class="!pos-absolute right-10px cursor-pointer">
                        <CloseBold />
                      </el-icon>
                    </div>
                  </div>
                </template>
                <template #reference>
                  <div>账户名称</div>
                  <div>已选10个</div>
                </template>
              </el-popover>
            </template>
          </SelectAccountVue>
        </el-col>
        <el-col :span="1.5" class="ml-16px">
          <SelectAccountVue :prefix-title="'规则配置'" @handle-change="handleChangeRuleConfiguration">
            <span class="inline-block w-110px">
              <label class="color-[#c6c6c6]">项目规则:</label>
              指定数量
            </span>
            <span class="inline-block w-110px">
              <label class="color-[#c6c6c6]">项目规则:</label>
              指定数量
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
                <div class="font-size-14px color-[#333]" v-if="infoOrNew === 'new'">项目信息</div>
                <div class="font-size-14px color-[#333]" v-else>新建项目</div>
                <div class="color-[#999]">
                  <el-text size="small" v-if="infoOrNew === 'new'">从新项目创建</el-text>
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
              <div class="h-300px"></div>
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
                    <p class="p-0px m-0px">无</p>
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
                    <p class="p-0px m-0px">无</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>广告评论：</label>
                    <p class="p-0px m-0px">不启用</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>动态创意生成：</label>
                    <p class="p-0px m-0px">启用</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>所属类别：</label>
                    <p class="p-0px m-0px">无</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>品牌名称：</label>
                    <p class="p-0px m-0px">无</p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex line-height-24px">
                    <label>二级品牌名称：</label>
                    <p class="p-0px m-0px">无</p>
                  </div>
                </div>
              </div>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px"></div>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px"></div>
            </td>
            <td style="border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5" class="color-[#606266]">
              <div class="h-300px"></div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <el-popover placement="top" trigger="hover" width="170">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px"> 编辑 </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small">编辑</el-button>
                </template>
              </el-popover>
            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <el-popover placement="top" trigger="hover" width="170">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px"> 编辑 </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" disabled>编辑</el-button>
                </template>
              </el-popover>
            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <el-popover placement="top" trigger="hover" width="170">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px"> 编辑 </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" disabled>编辑</el-button>
                </template>
              </el-popover>
            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <el-popover placement="top" trigger="hover" width="170">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px"> 编辑 </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" disabled>编辑</el-button>
                </template>
              </el-popover>
            </td>
            <td style="border-right: 1px solid #ebeef5" class="text-center pt-15px pb-15px">
              <el-popover placement="top" trigger="hover" width="170">
                <template #default>
                  <div class="flex">
                    <el-text>请选择媒体账户</el-text>
                    <el-button link size="small" type="primary" class="ml-8px"> 编辑 </el-button>
                  </div>
                </template>
                <template #reference>
                  <el-button link size="small" disabled>编辑</el-button>
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
    <el-col class="flex grid-justify-center p-24px" style="border: 1px solid #e8eaec">
      <el-button type="primary" class="w-120px">保存策略组</el-button>
      <el-button type="primary" class="w-120px" disabled>生成广告预览</el-button>
    </el-col>
  </el-row>
  <!-- 预览区 -->
  <el-row class="pl-20px pr-20px mt-16px mb-24px pb-20px">
    <el-col class="h-686px flex grid-justify-center" style="border: 1px solid #e8eaec">
      <el-empty image="https://cl.mobgi.com/img/mobgi_ic_addata_nodata.28d42792.png">
        <template #description>
          <span class="font-size-48px line-height-67px color-[#e0e3e7]">预览区</span>
        </template>
        <template #default>
          <span class="font-size-14px line-height-20px color-[#808695]">请先完成相应模块配置后，再预览内容</span>
        </template>
      </el-empty>
    </el-col>
  </el-row>


  <!-- 选择策略 -->
  <SelectStrategyDialog :visible="selectStrategyState.visible" @handleClose="handleSelectStrategyDialogClose" />

  <!-- 选择媒体账户 -->
  <SelectMediaAccountDialog :visible="true" />


  <!-- 新建项目 -->
  <NewProject />
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import NewProject from "./components/NewProject.vue";
import SelectAccountVue from "./components/SelectAccount.vue";
import SelectStrategyDialog from "./components/SelectStrategyDialog.vue";
import SelectMediaAccountDialog from "./components/SelectMediaAccountDialog.vue";

const transform = ref("");
const dynamicStyles = computed(() => ({
	transform: transform.value,
	transition: "all .3s",
}));
const showPopover = () => {
	transform.value = "rotate(-180deg)";
};
const hidePopover = () => {
	transform.value = "rotate(0deg)";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const gridData: any[] = [];

const selectPopover = reactive({
	title: "",
	visable: false,
	width: 0,
	type: 1,
});

const showSelectPopover = (option: { title: string; type: number }) => {
	selectPopover.title = option.title;
	selectPopover.type = option.type;
	selectPopover.visable = true;
};

// 更改账户
const handleChangeAccount = () => {
	showSelectPopover({ title: "选择媒体账户", type: 1 });
};

// 更改规则配置
const handleChangeRuleConfiguration = () => {
	showSelectPopover({ title: "规则配置", type: 2 });
};

const infoOrNew = ref("new");

// 新建项目和项目信息切换
const handleChangeInfoOrNew = () =>
	infoOrNew.value === "new" ? "new" : "info";

const selectStrategyState = reactive({
	visible: false,
});

// 选择策略
const selectStrategy = () => {
	selectStrategyState.visible = true;
};

const handleSelectStrategyDialogClose = (state: number) => {
	if (state === 1) {
		// 做弹窗确认的处理
		console.log("收到确认");
	}
	selectStrategyState.visible = false;
};
</script>

<style scoped>
table {
  table-layout: fixed;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
}
</style>
