<template>
    <div class="jsonToTable-container ic-card">
        <div class="item">
            <span>表格标识</span>
            <el-input v-model="codeNum" style="width: 500px;"></el-input>
        </div>
        <div class="item">
            <span>表格描述</span>
            <el-input v-model="describe" style="width: 500px;"></el-input>
        </div>

        <div class="item">
            <span>表格列对象</span>
            <icCodeEditor v-model:value="textarea" />
        </div>

        <div class="item">
            <el-button plain type="primary" @click="generate">生成</el-button>
            <el-button plain type="primary" @click="copy">复制</el-button>
            <el-button plain type="info" @click="resetValue">重置</el-button>
        </div>

        <code class="item-code">
            {{ result }}
        </code>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { copyToClipboard, message } from '@/utils/tool'

const codeNum = ref('json_to_columns')
const describe = ref('xxxx => xxxx => xxxx')
const textarea = ref(`{
    "name": "张三",
    "age": 25,
    "city": "北京"
}`)
const result = ref('')
//生成
const generate = () => {
    const obj = {}
    obj.tableSet = {
        id: 20231122,
        codeNum: codeNum.value,
        remark: describe.value
    }
    obj.columns = []
    const columns = JSON.parse(textarea.value)
    for (const key in columns) {
        const element = columns[key];
        obj.columns.push({
            id: "20231122",
            tableCode: codeNum.value,
            prop: key,
            width: "150",
            hidden: false,
            fixed: false,
            label: element,
            sortable: false,
            type: "sys",
            filter: false
        })
    }
    result.value = JSON.stringify(obj)
}
// 复制
const copy = () => {
    copyToClipboard(result.value)
    message.success('复制成功')
}
// 重置
const resetValue = () => {
    codeNum.value = 'json_to_columns'
    describe.value = 'xxxx => xxxx => xxxx'
    textarea.value = `{
    "name": "张三",
    "age": 25,
    "city": "北京"
}` }
</script>

<style lang="scss" scoped>
.jsonToTable-container {
    margin: 80px 150px 10px 10px;
    .item {
        width: 500px;
        display: flex;
        flex-wrap: wrap;
        margin: 10px;
        overflow: auto;
    }
    .item-code {
        display: block;
        height: 200px;
        word-break: break-all;
        overflow: auto;
    }
}
</style>