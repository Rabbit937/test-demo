<template>
  <div class="flex grid-items-center font-size-12px b-1px b-[#e8eaec] border-style-solid">
    <label
      class="w-75px color-[#333] line-height-30px text-center b-r-1px b-[#e8eaec] border-style-solid"
      >{{ props.prefixTitle }}</label
    >
    <div
      class="flex flex-nowrap grid-items-center min-w-200px max-w-280px h-100% pr-8px pl-8px cursor-pointer"
    >
      <slot></slot>
    </div>
    <el-button type="primary" link class="ml-8px mr-8px" size="small" @click="handleChange">
      更改
    </el-button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  prefixTitle: string
}

const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits(['handleChange'])

const handleChange = () => emits('handleChange')
</script>
