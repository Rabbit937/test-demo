<template>
    <el-config-provider :locale="zhCn">
        <el-date-picker v-model="dateValue" type="daterange" :shortcuts="shortcuts" range-separator="~"
            start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;" :clearable="false" />
    </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/es/locales.mjs'

const dateValue = defineModel("dateValue");

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
</script>