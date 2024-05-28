<template>
  <el-row class="pl-16px pt-12px pb-12px pr-16px justify-between">
    <el-col :span="1.5">
      <el-button size="small" type="primary" @click="handleClickHeader({ type: 'upload' })">上传素材</el-button>
      <template v-if="!treeClickNode.ID">
        <el-button size="small" @click="handleClickHeader({ type: 'album' })">新建专辑</el-button>
      </template>
      <template v-else>
        <el-button size="small" @click="handleClickHeader({ type: 'folder' })">新建文件夹</el-button>
      </template>
    </el-col>
    <el-col :span="1.5" v-if="false">
      <el-button size="small">刷新</el-button>
      <el-select size="small" class="pl-16px" style="width: 160px"> </el-select>
    </el-col>
  </el-row>

  <!--新建 -->
  <Dialog :title="newState.title" :visable="newState.visable" @handleClose="handleClose">
    <el-form :model="newState.form" :label-position="labelPosition">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="newState.form.name" autocomplete="off" class="!w-320px" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="备注（非必填）" :label-width="formLabelWidth">
        <el-input v-model="newState.form.textarea" class="!w-320px" :rows="2" type="textarea" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="排序（非必填）" :label-width="formLabelWidth">
        <el-input-number v-model="newState.form.sort" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </Dialog>

  <!-- 上传素材 -->
  <Dialog :title="uploadState.title" :visable="uploadState.visable" @handle-close="uploadMaterialFunc">
    <el-scrollbar height="500px">
      <el-form :label-position="labelPosition">
        <div class="normal-area">
          <div class="p-15px font-size-16px font-700 color-dark"
            style="background-color: #f8f9fc; border-radius: 3px 3px 0 0">
            上传目录
          </div>
          <div class="area-content mt-18px">
            <el-form-item label="将素材上传至" prop="region" :label-width="formLabelWidth">
              <!-- <Directory :treeData="treeData"></Directory> -->
              <el-cascader placeholder="请选择目录" v-model="uploadState.form.cascaderValue" :options="treeState.treeData"
                clearable filterable :props="{
                  value: 'ID',
                  label: 'ANAME',
                  children: 'CHILD',
                  checkStrictly: true
                }" style="width: 220px">
              </el-cascader>
              <!-- <el-text>新建文件夹</el-text> -->
            </el-form-item>
          </div>
          <div class="p-15px font-size-16px font-700 color-dark"
            style="background-color: #f8f9fc; border-radius: 3px 3px 0 0">
            素材信息
          </div>
          <div class="area-content mt-18px">
            <el-form-item label="创意人(编导)" :label-width="formLabelWidth">
              <el-select v-model="uploadState.form.creativePerson" placeholder="请选择创意人" style="width: 220px" clearable>
                <el-option v-for="item in DesignerAndCreativePersonList" :key="item.value" :label="item.text"
                  :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="设计师(剪辑)" :label-width="formLabelWidth">
              <el-select v-model="uploadState.form.designer" placeholder="请选择设计师" style="width: 220px" clearable>
                <el-option v-for="item in DesignerAndCreativePersonList" :key="item.value" :label="item.text"
                  :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="素材标签(选填)" :label-width="formLabelWidth">
              <el-cascader placeholder="最多添加10个标签" v-model="uploadState.form.tag_id" :options="labelStateOptionsRef"
                clearable :props="{
                  value: 'ID',
                  label: 'NAME',
                  children: 'CHILD',
                  // checkStrictly: true,
                  multiple: true
                }" style="width: 220px">
              </el-cascader>
              <el-text class="cursor-pointer !pl-10px" type="primary" @click="showTagsVue">
                <el-icon>
                  <Plus />
                </el-icon>
                添加标签
              </el-text>
            </el-form-item>
            <el-form-item label="素材备注(选填)" :label-width="formLabelWidth">
              <el-input v-model="uploadState.form.note" class="!w-320px" :rows="2" type="textarea" clearable
                placeholder="请输入备注" />
            </el-form-item>
          </div>

          <div class="p-15px font-size-16px font-700 color-dark"
            style="background-color: #f8f9fc; border-radius: 3px 3px 0 0">
            上传区域
          </div>
          <div class="area-content">
            <el-upload class="upload-demo" drag multiple :http-request="upload">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件或文件夹拖到此处，或点击上传文件</div>
              <template #tip>
                <div class="el-upload__tip">
                  <p data-v-2ce87de0="" class="upload-tips">
                    1.仅支持图片和视频文件，上传添加不超过500个
                  </p>
                  <p data-v-2ce87de0="" class="upload-tips">
                    2.支持图片格式：png、jpg、jpeg、gif，不超过8MB；支持视频格式：mp4、mpeg、3pg、avi、mov，不超过5G
                  </p>
                  <p data-v-2ce87de0="" class="upload-tips">
                    3.素材上传后需对尺寸、码率等进行分析，约1-3分钟后方可用于投放
                  </p>
                </div>
              </template>
            </el-upload>
          </div>
        </div>
      </el-form>
    </el-scrollbar>
  </Dialog>

  <Tags :visable="tagsState" @handleClose="handleUpdateTagsList"></Tags>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type UploadRequestOptions } from 'element-plus'

import {
  createAlbum,
  createFolder,
  getMaterialDesignList,
  uploadMaterial,
  getTagsList
} from '@/api/modules/material'

import Dialog from '@/components/Dialog.vue'
import Tags from './Tags.vue'

interface Props {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  treeClickNode: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  treeState: any
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['handleClick'])

const formLabelWidth = ref('140px')
const labelPosition = ref('right')

const newState = reactive({
  title: '',
  visable: false,
  form: {
    name: '',
    textarea: '',
    sort: 0
  }
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let handleClose: ((...args: any[]) => any) | undefined
const handleClickHeader = (options: { type: 'album' | 'folder' | 'upload' }) => {
  if (options.type === 'album') {
    newState.visable = true
    newState.title = '新建专辑'
    newState.form.name = ''
    newState.form.textarea = ''
    newState.form.sort = 0
    handleClose = createNewAlbum
  } else if (options.type === 'folder') {
    newState.visable = true
    newState.title = '新建文件夹'

    newState.form.name = ''
    newState.form.textarea = ''
    newState.form.sort = 0
    handleClose = createNewFolder
  } else if (options.type === 'upload') {
    // emit('handleClick', { type: 'header', action: 'uploadMaterial' })
    uploadState.visable = true

    getMaterialDesignListFunc()
  } else {
    console.log('点击头部什么也没有干')
    emit('handleClick', { type: 'header', action: '' })
  }
}

const createNewAlbum = async (type: string) => {
  newState.visable = false

  if (type === 'confirm') {
    if (newState.form.name === '') {
      ElMessage.warning('请填写专辑名称')
    } else {
      const res = await createAlbum({
        album_name: newState.form.name,
        note: newState.form.textarea,
        sort: newState.form.sort
      })

      if (Number(res.state) === 1) {
        emit('handleClick', { type: 'header', action: 'createNewAlbum' })
      } else {
        console.log('创建专辑接口调用失败', res.msg)
      }
    }
  } else {
    console.log('取消或者关闭')
  }
}

const createNewFolder = async (type: string) => {
  newState.visable = false
  if (type === 'confirm') {
    if (Number(props.treeClickNode.AL_ID) === 0) {
      await createFolder({
        album_id: props.treeClickNode.ID,
        note: newState.form.textarea,
        sort: newState.form.sort,
        dir_name: newState.form.name,
        // pid
        parent_id: props.treeClickNode.ID,
        // 父文件夹的level
        level: props.treeClickNode.LEVEL
      })
    } else {
      await createFolder({
        album_id: props.treeClickNode.AL_ID,
        note: newState.form.textarea,
        sort: newState.form.sort,
        dir_name: newState.form.name,
        // pid
        parent_id: props.treeClickNode.ID,
        // 父文件夹的level
        level: props.treeClickNode.LEVEL
      })
    }
    emit('handleClick', { type: 'header', action: 'createNewFolder', item: props.treeClickNode })
  }
}

// 上传素材
const uploadState = reactive({
  title: '上传素材',
  visable: false,
  form: {
    cascaderValue: [],
    tag_id: [],
    creativePerson: '',
    designer: '',
    note: '',
    sort: 0
  }
})

const uploadMaterialFunc = () => {
  emit('handleClick', { type: 'header', action: 'uploadMaterial' })
  uploadState.visable = false
}

const upload = async (options: UploadRequestOptions) => {
  console.log('上传')
  console.log(options)

  console.log(uploadState.form.cascaderValue)

  if (uploadState.form.cascaderValue.length > 1) {
    await uploadMaterial({
      album_id: uploadState.form.cascaderValue[0],
      dir_id: uploadState.form.cascaderValue[uploadState.form.cascaderValue.length - 1],
      creative_id: uploadState.form.creativePerson,
      editor_id: uploadState.form.designer,
      relative_dir_id: uploadState.form.cascaderValue.slice(1),
      tag_id: uploadState.form.tag_id.map((item) => item[1]),
      note: uploadState.form.note,
      sort: uploadState.form.sort,
      'files[]': [options.file]
    })
  } else {
    ElMessage('请选择文件夹，而不是专辑')
  }
}

const DesignerAndCreativePersonList = ref()

// 获取素材设计者列表
const getMaterialDesignListFunc = async () => {
  const res = await getMaterialDesignList()
  console.log(res)

  if (Number(res.state) === 1) {
    DesignerAndCreativePersonList.value = res.data
  }
}

const labelStateOptionsRef = ref()
// 获取标签列表
const getTagsListFunc = async () => {
  const res = await getTagsList({ type: 2 })
  console.log(res)

  if (Number(res.state) === 1) {
    labelStateOptionsRef.value = res.data
  } else {
    console.log(res.msg)
  }
}

onMounted(() => {
  getTagsListFunc()
})

const tagsState = ref(false)
const showTagsVue = () => {
  console.log(123123213)
  tagsState.value = true
}

const handleUpdateTagsList = () => {
  getTagsListFunc()
}
</script>
