<template>
    <el-popover :width="350">
        <template #reference>
            <slot></slot>
        </template>
        <el-date-picker v-model="monthRange" value-format="YYYY-MM-DD" type="monthrange" range-separator="至" :teleported="false" />
        <div style="text-align: right;padding: 10px 5px;">
            <el-button :disabled="!monthRange" @click="txtExport">txt导出</el-button>
            <el-button :disabled="!monthRange" @click="onCopyToClipboard">复制到剪切板</el-button>
        </div>
    </el-popover>
</template>

<script setup>
import { ref } from 'vue'
import api from "@/api/reportManagement"
import { exportTxtFile, copyToClipboard, message } from '@/utils/tool'

const monthRange = ref('')
// 按月查询
const getData = async () => {
    const query = {
        dateFrom: monthRange.value[0],
        dateTo: monthRange.value[1],
    }
    const res = await api.list(query)
    // 返回结果格式转化
    const map = {}
    res.forEach(e => {
        e.data.forEach(e1 => {
            if (!map[e1.category]) {
                map[e1.category] = []
            }
            if (e1.content) {
                map[e1.category].push(e1.content)
            }
        })
    })
    return JSON.stringify(map, null, 2).replace(/["[\]{},]/g, '').replace(/\n  /g, '\n')
}
// txt导出
const txtExport = async () => {
    const reportData = await getData()

    if (!reportData) {
        message.error('暂无数据,请重新选择!')
    } else {
        const fileName = monthRange.value.join('到') + '月报.txt'

        // 调用导出txt函数
        exportTxtFile(reportData, fileName);
        message.success('导出成功')
    }
}
// 复制到剪切板
const onCopyToClipboard = async () => {
    const reportData = await getData()

    if (!reportData) {
        message.error('暂无数据,请重新选择!')
    } else {
        // 调用复制函数
        copyToClipboard(reportData)
        message.success('复制成功')
    }
}
</script>

<style lang="scss" scoped>
.main {
    height: 200px;
}
</style>