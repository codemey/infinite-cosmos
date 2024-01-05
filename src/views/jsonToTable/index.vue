<template>
    <div class="jsonToTable-container ic-card">
        <div class="jsonToTable-left">
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
                <icCodeEditor v-model="textarea" />
            </div>

            <div class="item">
                <el-button plain type="primary" @click="generate">生成</el-button>
                <el-button plain :disabled="!result" type="primary" @click="copy">复制</el-button>
                <el-button plain type="info" @click="resetValue">重置</el-button>
            </div>
        </div>
        <div class="jsonToTable-right">
            <icCodeHighlight :code="result" height="calc(100vh - 200px)"></icCodeHighlight>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { copyToClipboard, message } from '@/utils/tool'

const codeNum = ref('json_to_columns')
const describe = ref('xxxx => xxxx => xxxx')
const textarea = ref(`{
    "index": "#",
    "name": "姓名",
    "age": "年龄",
    "gender": "性别"
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
    result.value = JSON.stringify(obj, null, 4)
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
    "index": "#",
    "name": "姓名",
    "age": "年龄",
    "gender": "性别"
}` }
</script>

<style lang="scss" scoped>
.jsonToTable-container {
    margin: 40px 150px 10px 10px;
    height: calc(100vh - 100px);
    display: flex;
    .jsonToTable-left {
        height: 100%;
        overflow: auto;
        .item {
            width: 500px;
            display: flex;
            flex-wrap: wrap;
            margin: 10px 50px 20px 20px;
            overflow: auto;
        }
    }
    .jsonToTable-right {
        width: calc(100% - 600px);
    }
}
</style>