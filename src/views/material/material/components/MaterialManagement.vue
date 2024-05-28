<template>
  <MaterialManagementSearch @handleClick="handleClick" />

  <el-row class="ml-16px mr-16px mt-32px">
    <el-col :span="24">
      <el-scrollbar style="min-height: 300px; max-height: 500px" v-loading="materialState.loading">
        <ul class="flex flex-wrap flex-items-stretch overflow-auto" v-if="materialState.materialItemList.length > 0">
          <li class="list-item" v-for="item in materialState.materialItemList" @click="handleItemClick(item)">
            <div class="pic-box pointer" :style="{
              'background-image': `url(${item.upload_dir})`,
              'background-size': 'cover'
            }" v-if="Number(item.mime) === 2">
              <img v-if="Number(item.disable) !== 0"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkxNzM1MDk2NTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xNDYuMjg1NzE0IDBsNzMxLjQyODU3MiAwcTE0Ni4yODU3MTQgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRsMCA3MzEuNDI4NTcycTAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0IDE0Ni4yODU3MTRsLTczMS40Mjg1NzIgMHEtMTQ2LjI4NTcxNCAwLTE0Ni4yODU3MTQtMTQ2LjI4NTcxNGwwLTczMS40Mjg1NzJxMC0xNDYuMjg1NzE0IDE0Ni4yODU3MTQtMTQ2LjI4NTcxNFoiIGZpbGw9IiNFQTY0NTciIHAtaWQ9IjE1MDkiPjwvcGF0aD48cGF0aCBkPSJNMjk0Ljc2NTcxNCAzMTUuMDk5NDI5YTI5My4yMjk3MTQgMjkzLjIyOTcxNCAwIDAgMCAzNTcuMjI5NzE1IDQ1NC42NTZ6IG01NC45MzAyODYtNDcuMzk2NTcybDM2MS4yNTI1NzEgNDU5Ljc3NmEyOTMuMjI5NzE0IDI5My4yMjk3MTQgMCAwIDAtMzYxLjI1MjU3MS00NTkuNzc2ek01MTIgODc3LjcxNDI4NmEzNjUuNzE0Mjg2IDM2NS43MTQyODYgMCAxIDEgMzY1LjcxNDI4Ni0zNjUuNzE0Mjg2IDM2NS43MTQyODYgMzY1LjcxNDI4NiAwIDAgMS0zNjUuNzE0Mjg2IDM2NS43MTQyODZ6IG0wIDAiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE1MTAiPjwvcGF0aD48L3N2Zz4="
                alt="禁用" style="width: 20px; position: absolute; top: 20px; left: 20px" />
            </div>

            <div v-else class="pic-box pointer" style="position: relative">
              <video :src="item.upload_dir" style="width: 100%"></video>
              <el-icon size="40" color="white"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                <VideoPlay />
              </el-icon>

              <img v-if="Number(item.disable) !== 0"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkxNzM1MDk2NTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xNDYuMjg1NzE0IDBsNzMxLjQyODU3MiAwcTE0Ni4yODU3MTQgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRsMCA3MzEuNDI4NTcycTAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0IDE0Ni4yODU3MTRsLTczMS40Mjg1NzIgMHEtMTQ2LjI4NTcxNCAwLTE0Ni4yODU3MTQtMTQ2LjI4NTcxNGwwLTczMS40Mjg1NzJxMC0xNDYuMjg1NzE0IDE0Ni4yODU3MTQtMTQ2LjI4NTcxNFoiIGZpbGw9IiNFQTY0NTciIHAtaWQ9IjE1MDkiPjwvcGF0aD48cGF0aCBkPSJNMjk0Ljc2NTcxNCAzMTUuMDk5NDI5YTI5My4yMjk3MTQgMjkzLjIyOTcxNCAwIDAgMCAzNTcuMjI5NzE1IDQ1NC42NTZ6IG01NC45MzAyODYtNDcuMzk2NTcybDM2MS4yNTI1NzEgNDU5Ljc3NmEyOTMuMjI5NzE0IDI5My4yMjk3MTQgMCAwIDAtMzYxLjI1MjU3MS00NTkuNzc2ek01MTIgODc3LjcxNDI4NmEzNjUuNzE0Mjg2IDM2NS43MTQyODYgMCAxIDEgMzY1LjcxNDI4Ni0zNjUuNzE0Mjg2IDM2NS43MTQyODYgMzY1LjcxNDI4NiAwIDAgMS0zNjUuNzE0Mjg2IDM2NS43MTQyODZ6IG0wIDAiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE1MTAiPjwvcGF0aD48L3N2Zz4="
                alt="禁用" style="width: 20px; position: absolute; top: 8px; left: 13px" />
            </div>

            <div class="name-box">
              <p class="nowrap">
                {{ item.material_name }}
              </p>
            </div>
            <div class="tool-box">
              <div class="tool-box-left"></div>

              <!--    <div class="tool-box-right">
                <el-popover trigger="hover">
                  <template #reference>
                    <el-icon
                      size="16"
                      color="#bfc4d0"
                      style="transform: rotate(90deg); cursor: pointer"
                    >
                      <More />
                    </el-icon>
                  </template>

<template #default>
                    <el-row>
                      <el-col>
                        <el-button style="width: 100%">编辑</el-button>
                      </el-col>
                      <el-col>
                        <el-button style="width: 100%">移动</el-button>
                      </el-col>
                      <el-col>
                        <el-button style="width: 100%">删除</el-button>
                      </el-col>
                    </el-row>
                  </template>
</el-popover>
</div> -->
            </div>
          </li>
        </ul>
        <el-empty v-else description="没有数据" />
      </el-scrollbar>
    </el-col>
  </el-row>

  <el-row style="background-color: #fff" class="ml-16px mr-16px mt-32px">
    <el-col :span="24">
      <Pagination :currentPage="materialState.currentPage" :pageSize="materialState.pageSize"
        :total="materialState.total" @handleClick="handleClick" />
    </el-col>
  </el-row>

  <!-- 编辑素材 -->
  <Drawer :visible="drawerVisible" :size="1160" @update:visible="updateVisible">
    <!-- <el-tabs class="drawer-header">
      <el-tab-pane label="详情" name="First"></el-tab-pane>
      <el-tab-pane label="媒体拒审(0)" name="Second"></el-tab-pane>
      <el-tab-pane label=" 内审信息" name="Third"></el-tab-pane>
    </el-tabs> -->

    <el-row style="background-color: #f0f2f5">
      <el-col :span="7" class="p-16px b-rd-8px overflow-y-auto overflow-x-hidden" style="background-color: #fff">
        <el-row>
          <span class="font-size-16px font-bold">基本信息</span>
        </el-row>

        <el-row class="mt-12px">
          <template v-if="Number(drawerState.mime) === 1">
            <video :src="drawerState.upload_dir" :poster="drawerState.info?.preview" controls preload="none"
              style="width: 100%; height: auto"></video>
            <img v-if="Number(drawerState.disable) !== 0"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkxNzM1MDk2NTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xNDYuMjg1NzE0IDBsNzMxLjQyODU3MiAwcTE0Ni4yODU3MTQgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRsMCA3MzEuNDI4NTcycTAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0IDE0Ni4yODU3MTRsLTczMS40Mjg1NzIgMHEtMTQ2LjI4NTcxNCAwLTE0Ni4yODU3MTQtMTQ2LjI4NTcxNGwwLTczMS40Mjg1NzJxMC0xNDYuMjg1NzE0IDE0Ni4yODU3MTQtMTQ2LjI4NTcxNFoiIGZpbGw9IiNFQTY0NTciIHAtaWQ9IjE1MDkiPjwvcGF0aD48cGF0aCBkPSJNMjk0Ljc2NTcxNCAzMTUuMDk5NDI5YTI5My4yMjk3MTQgMjkzLjIyOTcxNCAwIDAgMCAzNTcuMjI5NzE1IDQ1NC42NTZ6IG01NC45MzAyODYtNDcuMzk2NTcybDM2MS4yNTI1NzEgNDU5Ljc3NmEyOTMuMjI5NzE0IDI5My4yMjk3MTQgMCAwIDAtMzYxLjI1MjU3MS00NTkuNzc2ek01MTIgODc3LjcxNDI4NmEzNjUuNzE0Mjg2IDM2NS43MTQyODYgMCAxIDEgMzY1LjcxNDI4Ni0zNjUuNzE0Mjg2IDM2NS43MTQyODYgMzY1LjcxNDI4NiAwIDAgMS0zNjUuNzE0Mjg2IDM2NS43MTQyODZ6IG0wIDAiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE1MTAiPjwvcGF0aD48L3N2Zz4="
              alt="禁用" style="width: 30px; position: absolute; top: 8px; left: 13px" />
          </template>
          <template v-else>
            <img :src="drawerState.upload_dir" alt="" style="width: 100%; height: auto" />
            <img v-if="Number(drawerState.disable) !== 0"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkxNzM1MDk2NTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xNDYuMjg1NzE0IDBsNzMxLjQyODU3MiAwcTE0Ni4yODU3MTQgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRsMCA3MzEuNDI4NTcycTAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0IDE0Ni4yODU3MTRsLTczMS40Mjg1NzIgMHEtMTQ2LjI4NTcxNCAwLTE0Ni4yODU3MTQtMTQ2LjI4NTcxNGwwLTczMS40Mjg1NzJxMC0xNDYuMjg1NzE0IDE0Ni4yODU3MTQtMTQ2LjI4NTcxNFoiIGZpbGw9IiNFQTY0NTciIHAtaWQ9IjE1MDkiPjwvcGF0aD48cGF0aCBkPSJNMjk0Ljc2NTcxNCAzMTUuMDk5NDI5YTI5My4yMjk3MTQgMjkzLjIyOTcxNCAwIDAgMCAzNTcuMjI5NzE1IDQ1NC42NTZ6IG01NC45MzAyODYtNDcuMzk2NTcybDM2MS4yNTI1NzEgNDU5Ljc3NmEyOTMuMjI5NzE0IDI5My4yMjk3MTQgMCAwIDAtMzYxLjI1MjU3MS00NTkuNzc2ek01MTIgODc3LjcxNDI4NmEzNjUuNzE0Mjg2IDM2NS43MTQyODYgMCAxIDEgMzY1LjcxNDI4Ni0zNjUuNzE0Mjg2IDM2NS43MTQyODYgMzY1LjcxNDI4NiAwIDAgMS0zNjUuNzE0Mjg2IDM2NS43MTQyODZ6IG0wIDAiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE1MTAiPjwvcGF0aD48L3N2Zz4="
              alt="禁用" style="width: 30px; position: absolute; top: 8px; left: 13px" />
          </template>
        </el-row>

        <el-row class="mb-16px text-ellipsis font-size-14px color-dark-200"
          style="border: 1px solid #d7d1d1; border-radius: 4px">
          <el-col class="flex pl-10px pr-10px" style="align-items: center; justify-content: space-between">
            <span> {{ drawerState.material_name }} </span>
            <el-icon color="#409EFF" size="12" class="cursor-pointer" @click="handleEditMaterialName(drawerState)">
              <Edit />
            </el-icon>
          </el-col>
          <el-col class="pl-10px pr-10px">
            <el-text> ID: {{ drawerState.material_id }} </el-text>
          </el-col>
          <el-col style="border-top: 1px solid #d7d1d1">
            <el-button @click="deactivateTheMaterial(drawerState, '1')" v-if="Number(drawerState.disable) === 0"
              style="border: none">
              <el-icon>
                <Close />
              </el-icon>
              <span class="pl-4px"> 停用 </span>
            </el-button>
            <el-button v-else style="border: none" @click="deactivateTheMaterial(drawerState, '0')">
              <el-icon>
                <Open />
              </el-icon>
              <span class="pl-4px"> 启用 </span>
            </el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="text mb-8px flex flex-justify-between">
            <span>素材标签</span>
            <el-icon color="#409EFF" size="12" class="cursor-pointer" @click="handleEditTags(drawerState)">
              <Edit />
            </el-icon>
          </el-col>
          <el-col>
            <span class="" v-for="tag in tagsState" :key="tag.id" style="
                display: inline-block;
                padding: 5px 8px;
                margin-right: 8px;
                margin-bottom: 8px;
                color: #2a55e5;
                background: #e5f5ff;
                border-radius: 6px;
                font-size: 12px;
              ">{{ tag.name }}</span>
          </el-col>
        </el-row>

        <ul class="mt-16px pb-12px" style="border-bottom: 1px solid #d0d0d0">
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">创建时间</span>
            <span class="con">{{ drawerState.create_time }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">大小</span>
            <span class="con">{{ drawerState.info?.size }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">尺寸</span>
            <span class="con">{{ drawerState.info?.dimension }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px" v-if="Number(drawerState.mime) === 1">
            <span class="title">时长</span>
            <span class="con">{{ drawerState.info?.duration }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px" v-if="Number(drawerState.mime) === 1">
            <span class="title">音频码率</span>
            <span class="con">{{ drawerState.info?.bit_rate }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">专 辑</span>
            <span class="con">{{ drawerState.album_name }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">文件夹</span>
            <span class="con">{{ drawerState.dir_name }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">备注</span>
            <div class="flex" style="align-items: center">
              <span class="con pr-8px">{{ drawerState.note }}</span>
              <el-icon color="#409EFF" size="12" class="cursor-pointer" @click="updateMaterialNote(drawerState)">
                <Edit />
              </el-icon>
            </div>
          </li>
        </ul>
        <ul class="mt-16px">
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">创意人</span><span class="con" :data-id="drawerState.creative_info.creative_info?.id">
              {{ drawerState.creative_info.creative_info?.name }}
            </span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">设计师</span><span class="con" :data-id="drawerState.creative_info.editor_info?.id">
              {{ drawerState.creative_info.editor_info?.name }}
            </span>
          </li>
        </ul>
      </el-col>
      <!-- <el-col
        :span="16"
        :offset="1"
        class="p-16px b-rd-8px overflow-y-auto overflow-x-hidden"
        style="background-color: #fff"
      >
        <component :is=""></component>
      </el-col> -->
    </el-row>
  </Drawer>

  <!-- 编辑素材名称 -->
  <Dialog :title="dialogState.name.title" :visable="dialogState.name.visable" :width="560"
    @handleClose="handleEditClose">
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item label="名称">
        <el-input v-model="dialogState.name.form.name" type="textarea" />
      </el-form-item>
    </el-form>
  </Dialog>

  <!-- 编辑素材备注 -->
  <Dialog :title="dialogState.note.title" :visable="dialogState.note.visable" :width="560"
    @handleClose="handleEditNoteClose">
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item label="名称">
        <el-input v-model="dialogState.note.form.note" type="textarea" />
      </el-form-item>
    </el-form>
  </Dialog>

  <EditTags :visable="EditTagsState.visable" :materialItem="EditTagsState.materialItem"
    @handleClose="handleEditTagsClose">
  </EditTags>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";

import MaterialManagementSearch from "./MaterialManagementSearch.vue";
import Pagination from "@/components/Pagination.vue";
import Drawer from "@/components/Drawer.vue";
import Dialog from "@/components/DialogGG.vue";
import EditTags from "./EditTags.vue";

import {
	disableMaterial,
	getMaterialList,
	updateMaterial,
} from "@/api/modules/material";
import { ElMessage } from "element-plus";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const materialState: any = reactive({
	loading: false,
	materialItemList: [],
	currentPage: 1,
	pageSize: 0,
	total: 0,
});

interface IMaterialListParams {
	search_type?: string;
	keyword?: string;
	create_date?: string;
	dir_id?: string;
	album_id?: string;
	status?: number; // 是否停用
	category?: number; // 1. 视频 2. 图片
	page_no?: string;
	page_limit?: string;
}

const getMaterialListFunc = async (params?: IMaterialListParams) => {
	materialState.loading = true;

	const { data } = (await getMaterialList({
		search_type: params?.search_type,
		keyword: params?.keyword,
		create_date: params?.create_date,
		dir_id: params?.dir_id,
		album_id: params?.album_id,
		status: params?.status,
		category: params?.category,
		page_no: params?.page_no,
		page_limit: params?.page_limit,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	})) as any;

	materialState.materialItemList = data.list;
	materialState.currentPage = Number(data.page_info.cur_page);
	materialState.pageSize = Number(data.page_info.page_limit);
	materialState.total = Number(data.page_info.total);

	materialState.loading = false;
};

onMounted(() => {
	getMaterialListFunc();
});

const searchParamsRef = ref();
// 点击事件
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleClick = (params: { type: string; action: string; item: any }) => {
	const { type, item } = params;
	// 分页
	if (type === "pagination") {
		handlePaginationFunc(item);
	} else if (type === "search") {
		searchParamsRef.value = item;
		handleSearchFunc(item);
	}
};

// 分页
const handlePaginationFunc = (options: {
	currentPage: number;
	limit: number;
}) => {
	getMaterialListFunc({
		page_limit: String(options.limit),
		page_no: String(options.currentPage),
	});
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleSearchFunc = (item: any) => {
	console.log(item);

	let dir_id = "";
	let album_id = "";
	if (item?.cascaderValue) {
		if (item.cascaderValue.length > 1) {
			dir_id = item.cascaderValue[item.cascaderValue.length - 1];
		}

		album_id = item.cascaderValue[0];
	}

	getMaterialListFunc({
		search_type: String(item?.search_type),
		keyword: item?.keyword,
		create_date: item?.dateValue
			? formatCreateDate(item?.dateValue).join(" - ")
			: "",
		dir_id: dir_id,
		album_id: album_id,
		status: item?.materialStatus,
		category: item?.materialType,
	});
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function formatCreateDate(date: any) {
	const [start, end] = date;
	return [formatDate(start), formatDate(end)];
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function formatDate(date: any) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

// 素材详情
const drawerVisible = ref(false);
const drawerState = ref();
const tagsState = ref();

const updateVisible = () => {
	drawerVisible.value = false;
};

// 点击item
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleItemClick = (item: any) => {
	console.log(item);
	drawerVisible.value = true;
	drawerState.value = item;
	tagsState.value = item.tagid;
};

const dialogState = reactive({
	name: {
		title: "",
		visable: false,
		form: {
			name: "",
		},
	},
	note: {
		title: "",
		visable: false,
		form: {
			note: "",
		},
	},
});

const stateRef = ref();

// 编辑素材名称
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditMaterialName = (state: any) => {
	console.log("state", state);
	stateRef.value = state;
	dialogState.name.visable = true;
	dialogState.name.title = "编辑文件名";
	dialogState.name.form.name = state.material_name;
};

// 编辑素材名称，确认按钮处理函数
const handleEditClose = (type: string) => {
	// dialogState.visable = false

	console.log(type);

	if (type === "confirm") {
		updateMaterial({
			mat_id: stateRef.value.material_id,
			mat_name: dialogState.name.form.name,
		});

		dialogState.name.visable = false;
		drawerState.value.material_name = dialogState.name.form.name;
		getMaterialListFunc();
	} else {
		dialogState.name.visable = false;
		ElMessage.info("取消编辑文件名");
	}
};

// interface IUpdateMaterial {
//   mat_id: number
//   mat_name?: string
//   tag_id?: string[]
//   sort?: number
//   note?: string
// }

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const updateMaterialNote = (state: any) => {
	console.log("state", state);
	stateRef.value = state;
	dialogState.note.visable = true;
	dialogState.note.title = "修改素材备注";
	dialogState.note.form.note = state.note;
};

const handleEditNoteClose = (type: string) => {
	console.log(type);

	if (type === "confirm") {
		updateMaterial({
			mat_id: stateRef.value.material_id,
			note: dialogState.note.form.note,
		});

		dialogState.note.visable = false;
		drawerState.value.note = dialogState.note.form.note;
		getMaterialListFunc();
	} else {
		dialogState.note.visable = false;
		ElMessage.info("取消编辑文件名");
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const deactivateTheMaterial = (state: any, disable: string) => {
	console.log(state);

	drawerState.value.disable = Number(disable);

	disableMaterial({
		mat_id: Number(state.material_id),
		type: Number(disable),
	});

	getMaterialListFunc();
};

const EditTagsState = reactive({
	visable: false,
	materialItem: null,
});

const materialRef = ref();

// 编辑标签页
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditTags = (material: any) => {
	EditTagsState.visable = true;
	EditTagsState.materialItem = material;
	materialRef.value = material;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditTagsClose = (tagsParams: any) => {
	console.log(tagsParams);
	EditTagsState.visable = false;
	tagsState.value = tagsParams.tagsList;

	handleSearchFunc(searchParamsRef.value);
};
</script>

<style lang="scss" scoped>
.list-item {
  position: relative;
  box-sizing: border-box;
  width: 230px;
  min-height: 202px;
  padding: 12px 8px 6px;
  margin: 0 12px 12px 0;
  background-color: #fff;
  border: 1px solid #e8eaec;
  border-radius: 2px;

  .pic-box {
    width: 212px;
    height: 118px;
    margin-bottom: 16px;
    background-color: #f2f2f2;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAbCAYAAAAdx42aAAADb0lEQVRIS72WTWhcVRTHz7mXdCYEkjRN/EA3UicJpO8zo0nc1Q9oNRtBAoJZiEJdWFCEiouCG1FURCiCuhAFEYyIiOlSQ0GqURPvnUcGpxiD0ApiKnUChvm47y839IXndCy+yaRv+T7u73fOueedy6VSaRLAe0R0BICg/bvAzBeY+YTruucSDGutNYDbhRDPAfim2WyabjtIKYWUMjDGvGHX9n3/trSAieP4iSAI3u82uHW9KIoeMsYs1mq14ampqcv2OSulbGrGPc+r7LfA8vLyoVwut9nb2zsyNja2uStgjClMTk7+3C0BpZQNZiSO44fDMNyt9/r6+sDW1taVGyHwOxHdxMz3e573ZRLYjRQ4SkQHenp6vp+YmPiz6wKA3TaMrCXrSga01q8S0Uwul3twfHx8K4vEngUsHMCjzFwB0JvP549lkdiTQAI3xhytVqsXh4aGPgPQn0WiY4E0PGnXpaWlfFaJjgTawZO6Z5XILHA9+PUkoig6bIzp933/x/QmzSTwf+DtJJj5JIDPiagfwPEgCM6n3xscHDxtjHmpWCz+/Z+/4izwFolFAPcS0WtEtEFErwB4gJn/klIONxqNS2EY/prOys4wSs+CTuB2wZWVlTullEtE9JHv+8/be1rrdwHMEtEAEdnpd7NtYSHEC47jnL0mA0qpk0R0yrZaluHUDq6UepuZjwN4ttlsflEsFhta6z4A8zYzzPyi53lv/isDpVLpIBEddF33lyx/OKXUGQDbQRCcst8ppR6zkDiO7w7D8Lf0WqurqyPMfI6ZRwHMXFOCLODk3YWFBTk3N7d7klJKRcz8uud5H7TChRBfAYiklJvGmFu6IpCGrK2tDTUajct9fX0DhUKhmjyzkVs4M0eVSmV+dHR0hog+3RGQUt7lOM4PnUTf+o3W+g4AFd/3D7SDu647z8ymXC4X6vV6ZAWs5See5z3ZyYhtFdjY2MhXq9UrQogJx3HW05En8Kv7ZNaWyQqcIaKnieg7Zv4WwJ5Pxcx8D4DzcRy/nKQ9Db/aomcBlNgeLpRSj0gpj8RxzN0ogxDipziO3yGiP2xQrXCl1GkieqpWq7ldAbaT1lofA/AxM39NRB8S0UUisvvjcWY+LISYdRyntG8CVqpcLt9ar9efYeb7AAwT0SVmXtze3n5renp6p0P+Af6EyGQdl5ztAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 32px auto;
  }

  .pointer {
    cursor: pointer;
  }

  .name-box {
    // display: flex;
    // justify-content: space-between;
    height: 32px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 16px;
    color: #333;
  }

  .tool-box {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;

    .tool-box-left {
      .num {
        margin-left: 10px;
        color: #197afb;
      }
    }
  }
}

.nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drawer-content {
  height: calc(100vh - 50px);
  padding: 0 0 16px 0;
  margin: 0;
  background-color: #f0f2f5;
  border: 0;

  .detail-box {
    position: relative;
    min-width: 100%;
    height: 300px;
    max-height: 100%;
    background-color: #d9d4d4;
    align-items: center;

    img {
      display: block;
      min-width: 100%;
      max-height: 100%;
    }
  }
}

.text {
  font-size: 12px;
  color: #666;
}
</style>
