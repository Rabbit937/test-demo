<template>
  <el-form class="flex flex-wrap" style="background-color: #fff">
    <el-form-item class="pl-16px pt-12px">
      <el-input v-model="state.keyword" :placeholder="placeholderText" class="input-with-select" size="small"
        style="width: 600px">
        <template #prepend>
          <el-select v-model="state.search_type" style="width: 110px">
            <el-option v-for="(item, index) in searchSelectList" :label="item.label" :value="item.value"
              :key="index"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handleSearch" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="pl-16px pt-12px pr-800px">
      <el-button @click="clearState"> 清空</el-button>
    </el-form-item>
    <el-form-item label="创建时间:" class="pl-16px">
      <el-config-provider :locale="zhCn">
        <el-date-picker v-model="state.dateValue" type="daterange" :shortcuts="shortcuts" range-separator="~"
          start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="width: 200px" />
      </el-config-provider>
    </el-form-item>

    <el-form-item label="素材目录:" class="pl-16px">
      <el-cascader size="small" v-model="state.cascaderValue" placeholder="全选" :options="cascaderOptions"
        :props="cascaderProps" clearable />
    </el-form-item>

    <el-form-item label="类型:" class="pl-16px">
      <el-select v-model="state.materialType" placeholder="请选择素材类型" size="small" style="width: 240px" clearable>
        <el-option v-for="item in materialTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <el-form-item label="素材状态:" class="pl-16px">
      <el-select v-model="state.materialStatus" placeholder="请选择素材状态" size="small" style="width: 240px" clearable>
        <el-option v-for="item in materialStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, watch, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { zhCn } from 'element-plus/es/locales.mjs'
import { getAlbumTree } from '@/api/modules/material'

const emit = defineEmits(['handleClick'])

const state = reactive({
  keyword: '',
  search_type: 2,
  materialType: '',
  materialStatus: '',
  dateValue: null,
  cascaderValue: ''
})

const searchSelectList = [
  {
    label: '素材ID',
    value: 1
  },
  {
    label: '素材名称',
    value: 2
  }
]

const shortcuts = [
  {
    text: '今天',
    value: () => {
      const end = new Date()
      const start = new Date()
      return [start, end]
    }
  },
  {
    text: '昨天',
    value: () => {
      const end = new Date()
      const start = new Date()

      end.setDate(end.getDate() - 1)
      start.setDate(start.getDate() - 1)

      return [start, end]
    }
  },
  {
    text: '近三天',
    value: () => {
      const end = new Date()
      const start = new Date()

      start.setDate(start.getDate() - 3)

      return [start, end]
    }
  },
  {
    text: '近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    }
  },
  {
    text: '近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    }
  },
  {
    text: '近60天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 2)
      return [start, end]
    }
  },
  {
    text: '近90天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    }
  },

  {
    text: '近一年',
    value: () => {
      const end = new Date()
      const start = new Date()

      start.setMonth(start.getMonth() - 12)
      return [start, end]
    }
  }
]

const materialTypeOptions = [
  { label: '视频', value: 1 },
  {
    label: '图片',
    value: 2
  }
]

const materialStatusOptions = [
  { label: '停用', value: 1 },
  {
    label: '启用',
    value: 0
  }
]

const placeholderText = ref('请输入素材名称')

const cascaderOptions = ref()
const cascaderProps = {
  checkStrictly: true,
  value: 'ID',
  label: 'ANAME',
  children: 'CHILD'
}

onMounted(async () => {
  const { data } = await getAlbumTree()
  cascaderOptions.value = data
})

const handleSearch = () => {
  emit('handleClick', { type: 'search', action: 'search', item: state })
}

// const clearSeacrhParamsFunc = () => {
//   state.keyword = ''
//   emit('handleClick', state)
// }

watchEffect(() => {
  console.log(state.search_type)

  if (Number(state.search_type) === 2) {
    placeholderText.value = '请输入素材名称'
  } else {
    placeholderText.value = '请输入素材ID，多个以英文逗号隔开'
  }
})

// 使用watch函数观察多个值的变化
watch(
  () => [state.dateValue, state.materialStatus, state.materialType, state.cascaderValue],
  () => {
    console.log(state.cascaderValue)

    handleSearch()
  }
)

const clearState = () => {
  state.keyword = ''
  state.search_type = 2
  state.materialStatus = ''
  state.dateValue = null
  state.cascaderValue = ''
  state.materialType = ''
  handleSearch()
}
</script>
