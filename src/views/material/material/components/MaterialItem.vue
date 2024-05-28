<template>
  <li class="list-item" v-for="item in itemList" @click="handleClick(item)">
    <!-- 专辑 -->
    <template v-if="Number(item.type) === 1">
      <div class="pic-box pointer" style="
          background-image: url(https://tos.mobgi.com/tos_beijing/video_cover/material_4/12000013178/12000018728/b4f5048f9fa775a6b8e257aa028ddda3937959.jpg);
          background-size: cover;
        "></div>
      <div class="name-box">
        <p :title="item.album.album_name" class="nowrap">{{ item.album.album_name }}</p>
      </div>
      <div class="tool-box">
        <div class="tool-box-left">
          素材<span class="num">{{ item.album.material_num }}</span>
        </div>

        <div class="tool-box-right">
          <el-popover>
            <template #reference>
              <el-icon size="16" color="#bfc4d0" style="transform: rotate(90deg); cursor: pointer">
                <More />
              </el-icon>
            </template>

            <template #default>
              <el-row>
                <el-col>
                  <el-button @click="handleClick(item, 'edit')" style="width: 100%">编辑</el-button>
                </el-col>
                <!-- <el-col> -->
                <!-- <el-button @click="handleClick(item, 'move')" style="width: 100%">移动</el-button> -->
                <!-- </el-col> -->
                <el-col>
                  <el-button @click="handleClick(item, 'delete')" style="width: 100%">删除</el-button>
                </el-col>
              </el-row>
            </template>
          </el-popover>
        </div>
      </div>
    </template>
    <!-- 文件夹 -->
    <template v-else-if="Number(item.type) === 2">
      <div class="pic-box pointer" style="
          background-image: url(https://tos.mobgi.com/tos_beijing/video_cover/material_4/12000013178/12000018728/b4f5048f9fa775a6b8e257aa028ddda3937959.jpg);
          background-size: cover;
        ">
        <!---->
      </div>
      <div class="name-box">
        <p :title="item.dir.dir_name" class="nowrap">{{ item.dir.dir_name }}</p>
      </div>
      <div class="tool-box">
        <div class="tool-box-left">
          素材<span class="num">{{ item.dir.material_num }}</span>
        </div>

        <div class="tool-box-right">
          <el-popover>
            <template #reference>
              <el-icon size="16" color="#bfc4d0" style="transform: rotate(90deg); cursor: pointer">
                <More />
              </el-icon>
            </template>

            <template #default>
              <el-row>
                <el-col>
                  <el-button @click="handleClick(item, 'edit')" style="width: 100%">编辑</el-button>
                </el-col>
                <el-col>
                  <el-button @click="handleClick(item, 'move')" style="width: 100%">移动</el-button>
                </el-col>
                <el-col>
                  <el-button @click="handleClick(item, 'delete')" style="width: 100%">删除</el-button>
                </el-col>
              </el-row>
            </template>
          </el-popover>
        </div>
      </div>
    </template>
    <!-- 素材 -->
    <template v-else-if="Number(item.type) === 3">
      <div class="pic-box pointer" :style="{
        'background-image': `url(${item.material.upload_dir})`,
        'background-size': 'cover'
      }" @click="jumpToDetails(item)" v-if="Number(item.material.mime) === 2">
        <img v-if="Number(item.material.disable) !== 0"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkxNzM1MDk2NTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xNDYuMjg1NzE0IDBsNzMxLjQyODU3MiAwcTE0Ni4yODU3MTQgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRsMCA3MzEuNDI4NTcycTAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0IDE0Ni4yODU3MTRsLTczMS40Mjg1NzIgMHEtMTQ2LjI4NTcxNCAwLTE0Ni4yODU3MTQtMTQ2LjI4NTcxNGwwLTczMS40Mjg1NzJxMC0xNDYuMjg1NzE0IDE0Ni4yODU3MTQtMTQ2LjI4NTcxNFoiIGZpbGw9IiNFQTY0NTciIHAtaWQ9IjE1MDkiPjwvcGF0aD48cGF0aCBkPSJNMjk0Ljc2NTcxNCAzMTUuMDk5NDI5YTI5My4yMjk3MTQgMjkzLjIyOTcxNCAwIDAgMCAzNTcuMjI5NzE1IDQ1NC42NTZ6IG01NC45MzAyODYtNDcuMzk2NTcybDM2MS4yNTI1NzEgNDU5Ljc3NmEyOTMuMjI5NzE0IDI5My4yMjk3MTQgMCAwIDAtMzYxLjI1MjU3MS00NTkuNzc2ek01MTIgODc3LjcxNDI4NmEzNjUuNzE0Mjg2IDM2NS43MTQyODYgMCAxIDEgMzY1LjcxNDI4Ni0zNjUuNzE0Mjg2IDM2NS43MTQyODYgMzY1LjcxNDI4NiAwIDAgMS0zNjUuNzE0Mjg2IDM2NS43MTQyODZ6IG0wIDAiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE1MTAiPjwvcGF0aD48L3N2Zz4="
          alt="禁用" style="width: 20px; position: absolute; top: 20px; left: 20px" />
      </div>

      <div v-else class="pic-box pointer" style="position: relative" @click="jumpToDetails(item)">
        <video :src="item.material.upload_dir" style="width: 100%"></video>
        <el-icon size="40" color="white"
          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
          <VideoPlay />
        </el-icon>

        <img v-if="Number(item.material.disable) !== 0"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjkxNzM1MDk2NTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xNDYuMjg1NzE0IDBsNzMxLjQyODU3MiAwcTE0Ni4yODU3MTQgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRsMCA3MzEuNDI4NTcycTAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0IDE0Ni4yODU3MTRsLTczMS40Mjg1NzIgMHEtMTQ2LjI4NTcxNCAwLTE0Ni4yODU3MTQtMTQ2LjI4NTcxNGwwLTczMS40Mjg1NzJxMC0xNDYuMjg1NzE0IDE0Ni4yODU3MTQtMTQ2LjI4NTcxNFoiIGZpbGw9IiNFQTY0NTciIHAtaWQ9IjE1MDkiPjwvcGF0aD48cGF0aCBkPSJNMjk0Ljc2NTcxNCAzMTUuMDk5NDI5YTI5My4yMjk3MTQgMjkzLjIyOTcxNCAwIDAgMCAzNTcuMjI5NzE1IDQ1NC42NTZ6IG01NC45MzAyODYtNDcuMzk2NTcybDM2MS4yNTI1NzEgNDU5Ljc3NmEyOTMuMjI5NzE0IDI5My4yMjk3MTQgMCAwIDAtMzYxLjI1MjU3MS00NTkuNzc2ek01MTIgODc3LjcxNDI4NmEzNjUuNzE0Mjg2IDM2NS43MTQyODYgMCAxIDEgMzY1LjcxNDI4Ni0zNjUuNzE0Mjg2IDM2NS43MTQyODYgMzY1LjcxNDI4NiAwIDAgMS0zNjUuNzE0Mjg2IDM2NS43MTQyODZ6IG0wIDAiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE1MTAiPjwvcGF0aD48L3N2Zz4="
          alt="禁用" style="width: 20px; position: absolute; top: 8px; left: 13px" />
      </div>

      <div class="name-box">
        <p :title="item.material.material_name" class="nowrap">{{ item.material.material_name }}</p>
      </div>
      <div class="tool-box">
        <div class="tool-box-left">
          <div data-v-3b60a29e="" class="tips-box"></div>
        </div>

        <div class="tool-box-right">
          <el-popover>
            <template #reference>
              <el-icon size="16" color="#bfc4d0" style="transform: rotate(90deg); cursor: pointer">
                <More />
              </el-icon>
            </template>

            <template #default>
              <el-row>
                <!-- <el-col> -->
                <!-- <el-button @click="handleClick(item, 'edit')" style="width: 100%">编辑</el-button> -->
                <!-- </el-col> -->
                <el-col>
                  <el-button @click="handleClick(item, 'move')" style="width: 100%">移动</el-button>
                </el-col>
                <el-col>
                  <el-button @click="handleClick(item, 'delete')" style="width: 100%">删除</el-button>
                </el-col>
              </el-row>
            </template>
          </el-popover>
        </div>
      </div>
    </template>
  </li>

  <!-- 编辑专辑 -->
  <Dialog :title="editAlbumOrFolderState.title" :visable="editAlbumOrFolderState.visble"
    @handle-close="editAlbumOrFolderFunc">
    <el-form :model="editAlbumOrFolderState.form" :label-position="labelPosition">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="editAlbumOrFolderState.form.al_dir_name" autocomplete="off" class="!w-320px"
          placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="备注（非必填）" :label-width="formLabelWidth">
        <el-input v-model="editAlbumOrFolderState.form.note" class="!w-320px" :rows="2" type="textarea"
          placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="排序（非必填）" :label-width="formLabelWidth">
        <el-input-number v-model="editAlbumOrFolderState.form.sort" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </Dialog>

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
            <video :src="drawerState.upload_dir" :poster="drawerState.info.preview" controls preload="none"
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
            <el-button v-if="Number(drawerState.disable) === 0" style="border: none"
              @click="deactivateTheMaterial(drawerState, '1')">
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
            <span class="con">{{ drawerState.info.size }}</span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">尺寸</span>
            <span class="con">{{ drawerState.info.dimension }}</span>
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
            <span class="title">创意人</span><span class="con">
              {{ drawerState.creative_info?.creative_info?.name }}
            </span>
          </li>
          <li class="text flex flex-justify-between mb-8px">
            <span class="title">设计师</span><span class="con">
              {{ drawerState.creative_info?.editor_info?.name }}
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

  <!-- 移动 -->
  <Drawer :visible="moveState.visble" :size="632" @update:visible="moveVisible">
    <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 12px 16px 24px;
        background-color: #fff;
        border-bottom: 1px solid #e8eaec;
      ">
      <div class="header">
        <span>{{ moveState.title }}</span>
      </div>
    </div>

    <div class="tree-box" style="padding-top: 80px">
      <div class="tree-wrapper w-500px m-a m-t-0 m-b-0 b-1 b-style-solid b-radiud-4px"
        style="border-color: rgb(131 157 183)">
        <div class="tree-wrapper-head h-40px flex items-center pr-16px pl-16px font-size-12px b-b"
          style="background-color: #fafafa">
          专辑列表
        </div>
        <Tree :treeData="treeState.treeData" @handle-node-click="handleTreeClick"></Tree>
      </div>
    </div>
    <div style="
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        padding: 12px 16px 24px;
        background-color: #fff;
        border-top: 1px solid #e8eaec;
      ">
      <el-button style="width: 120px" @click="handleMoveCancel">取消</el-button>
      <el-button style="width: 120px" type="primary" @click="handleMoveConfirm">确认</el-button>
    </div>
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
import { reactive, ref } from "vue";
import Drawer from "@/components/Drawer.vue";
import Dialog from "@/components/DialogGG.vue";
import EditTags from "./EditTags.vue";

import {
	moveFolder,
	moveMaterial,
	updateAlbumOrFolder,
	disableMaterial,
	updateMaterial,
} from "@/api/modules/material";
import { ElMessage, ElMessageBox } from "element-plus";

import Tree from "@/components/Tree.vue";

interface Props {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	itemList: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	treeState: any;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["handleClick"]);

type clickType = "click" | "edit" | "delete" | "move";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleClick = (item: any, action: clickType = "click") => {
	// console.log(item)
	if (action === "click") {
		emit("handleClick", { item, type: "materialItem", action: action });
	} else if (action === "edit") {
		handleItemEdit(item);
	} else if (action === "delete") {
		handleItemDelete(item);
	} else if (action === "move") {
		handleItemMove(item);
	}
};

// 编辑专辑
const labelPosition = ref("left");
const formLabelWidth = ref("140px");
const itemRef = ref();

const editAlbumOrFolderState = reactive({
	title: "",
	visble: false,
	form: {
		al_dir_name: "",
		note: "",
		sort: 0,
		al_dir_id: "",
		type: "",
	},
});

// item编辑
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleItemEdit = (item: any) => {
	itemRef.value = item;
	if (Number(item.type) === 1) {
		editAlbumOrFolderState.title = "编辑专辑";
		editAlbumOrFolderState.visble = true;
		editAlbumOrFolderState.form.type = item.type;
		editAlbumOrFolderState.form.al_dir_id = item.album.album_id;
		editAlbumOrFolderState.form.al_dir_name = item.album.album_name;
		editAlbumOrFolderState.form.note = item.album.note;
		editAlbumOrFolderState.form.sort = Number(item.album.sort) ?? 0;
	} else if (Number(item.type) === 2) {
		editAlbumOrFolderState.title = "编辑文件夹";
		editAlbumOrFolderState.visble = true;
		editAlbumOrFolderState.form.type = item.type;
		editAlbumOrFolderState.form.al_dir_id = item.dir.dir_id;
		editAlbumOrFolderState.form.al_dir_name = item.dir.dir_name;
		editAlbumOrFolderState.form.note = item.dir.note;
		editAlbumOrFolderState.form.sort = Number(item.dir.sort) ?? 0;
	}
};

const editAlbumOrFolderFunc = async (type: string) => {
	console.log(itemRef.value);

	if (type === "confirm") {
		editAlbumOrFolderState.visble = false;
		await updateAlbumOrFolder({
			al_dir_id: editAlbumOrFolderState.form.al_dir_id,
			al_dir_name: editAlbumOrFolderState.form.al_dir_name,
			note: editAlbumOrFolderState.form.note,
			type: editAlbumOrFolderState.form.type,
			sort: editAlbumOrFolderState.form.sort,
		});
		emit("handleClick", {
			item: itemRef.value,
			type: "materialItem",
			action: "edit",
		});
	} else {
		editAlbumOrFolderState.visble = false;
		editAlbumOrFolderState.title = "";
		editAlbumOrFolderState.visble = false;
		editAlbumOrFolderState.form.al_dir_name = "";
		editAlbumOrFolderState.form.note = "";
		editAlbumOrFolderState.form.sort = 0;
	}
};

// 素材详情
const drawerVisible = ref(false);
const drawerState = ref();
const tagsState = ref();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const jumpToDetails = (item: any) => {
	console.log(item);
	drawerVisible.value = true;

	if (Number(item.type) === 3) {
		drawerState.value = item.material;
		tagsState.value = item.material.tagid;
	}
};

const updateVisible = () => {
	drawerVisible.value = false;
};

// 删除
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleItemDelete = (item: any) => {
	const tips =
		Number(item.type) === 1
			? "专辑"
			: Number(item.type) === 2
				? "文件夹"
				: "素材";

	ElMessageBox.confirm(`您确认删除此${tips}吗?`, "提示", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(() => {
			emit("handleClick", {
				item: item,
				type: "materialItem",
				action: "delete",
			});
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "删除取消",
			});
		});
};

const moveState = reactive({
	title: "",
	visble: false,
});

const moveItemRef = ref();

// 移动
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleItemMove = (item: any) => {
	moveState.visble = true;
	moveItemRef.value = item;
	if (Number(item.type) === 2) {
		moveState.title = "移动文件夹";
	} else {
		moveState.title = "移动素材";
	}
};

const treeDataRef = ref();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleTreeClick = (treeNode: any) => {
	console.log(treeNode);
	treeDataRef.value = treeNode.data;
};

const moveVisible = () => {
	moveState.visble = false;
};

const handleMoveCancel = () => {
	moveState.visble = false;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const findParentNodes = (tree: any, ID: string, parents: any[] = []): any => {
	for (const node of tree) {
		if (node.ID === ID) {
			// 找到匹配的节点，将其父级节点推入数组
			return [...parents, ID];
		}
		if (node.CHILD) {
			// 递归查找子节点
			const result = findParentNodes(node.CHILD, ID, [...parents, node.ID]);
			if (result) {
				return result;
			}
		}
	}
	return null; // 未找到匹配的节点
};

const handleMoveConfirm = () => {
	console.log(moveItemRef.value);
	console.log(treeDataRef.value);

	if (Number(moveItemRef.value.type) === 3) {
		if (treeDataRef.value) {
			if (Number(treeDataRef.value.AL_ID) === 0) {
				ElMessage.warning("请选择非专辑的文件夹，作为移动目标");
			} else {
				moveMaterialFunc({
					mat_id: moveItemRef.value.material.material_id,
					dir_id: treeDataRef.value.ID,
					album_id: treeDataRef.value.AL_ID,
					relative_dir_id: findParentNodes(
						props.treeState.treeData,
						treeDataRef.value.ID,
					).slice(1),
				});

				moveVisible();

				emit("handleClick", {
					item: moveItemRef.value,
					type: "materialItem",
					action: "move",
				});
			}
		} else {
			ElMessage.warning("请选择目标移动的目录");
		}
	} else {
		if (treeDataRef.value) {
			if (Number(treeDataRef.value.AL_ID) === 0) {
				moveFolderFunc({
					dir_id: moveItemRef.value.dir.dir_id,
					des_al_id: treeDataRef.value.ID,
					dir_pid: "",
					des_al_name: "",
				});
			} else {
				moveFolderFunc({
					dir_id: moveItemRef.value.dir.dir_id,
					des_al_id: treeDataRef.value.AL_ID,
					dir_pid: treeDataRef.value.ID,
					des_al_name: "",
				});
			}

			moveVisible();

			emit("handleClick", {
				item: moveItemRef.value,
				type: "materialItem",
				action: "move",
			});
		} else {
			ElMessage.warning("请选择目标移动的目录");
		}
	}
};
interface IMoveFolder {
	dir_id: number;
	dir_pid?: string;
	des_al_name?: string;
	des_al_id: number;
}

const moveFolderFunc = async (params: IMoveFolder) => {
	const res = await moveFolder(params);
	console.log(res);
};

interface IMoveMaterial {
	mat_id: number;
	dir_id: number;
	album_id: number;
	relative_dir_id: string[];
}

const moveMaterialFunc = async (params: IMoveMaterial) => {
	await moveMaterial(params);
};

const stateRef = ref();
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

// 编辑素材名称
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditMaterialName = (state: any) => {
	console.log("state", state);
	stateRef.value = state;
	dialogState.name.visable = true;
	dialogState.name.title = "编辑文件名";
	dialogState.name.form.name = state.material_name;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const deactivateTheMaterial = (state: any, disable: string) => {
	console.log(state);

	drawerState.value.disable = Number(disable);

	disableMaterial({
		mat_id: Number(state.material_id),
		type: Number(disable),
	});

	// getMaterialListFunc()
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const updateMaterialNote = (state: any) => {
	console.log("state", state);
	stateRef.value = state;
	dialogState.note.visable = true;
	dialogState.note.title = "修改素材备注";
	dialogState.note.form.note = state.note;
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
		// getMaterialListFunc()
	} else {
		dialogState.name.visable = false;
		ElMessage.info("取消编辑文件名");
	}
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
		// getMaterialListFunc()
	} else {
		dialogState.note.visable = false;
		ElMessage.info("取消编辑文件名");
	}
};

const EditTagsState = reactive({
	visable: false,
	materialItem: null,
});

// 编辑标签页
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditTags = (material: any) => {
	itemRef.value = material;
	EditTagsState.visable = true;
	EditTagsState.materialItem = material;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditTagsClose = (tagsParams: any) => {
	console.log(tagsParams);
	EditTagsState.visable = false;
	tagsState.value = tagsParams.tagsList;
	emit("handleClick", {
		item: itemRef.value,
		type: "materialItem",
		action: "editTags",
	});
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
