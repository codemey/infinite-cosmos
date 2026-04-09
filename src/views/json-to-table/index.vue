<template>
    <div class="json-to-table-container">
        <div class="left-panel">
            <div class="form-item">
                <label>表格标识</label>
                <el-input v-model="codeNum" class="modern-input"></el-input>
            </div>
            <div class="form-item">
                <label>表格描述</label>
                <el-input v-model="describe" class="modern-input"></el-input>
            </div>

            <div class="form-item">
                <label>表格列对象</label>
                <icCodeEditor v-model="textarea" />
            </div>

            <div class="form-item button-group">
                <el-button type="primary" @click="generate">生成</el-button>
                <el-button :disabled="!result" @click="copy">复制</el-button>
                <el-button @click="resetValue">重置</el-button>
            </div>
        </div>
        <div class="right-panel">
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
const copy = () => {
    copyToClipboard(result.value)
}
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
.json-to-table-container {
    height: 100%;
    width: 100%;
    padding: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    gap: 24px;
    box-sizing: border-box;
}

.left-panel {
    flex: 0 0 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    overflow: auto;

    .form-item {
        display: flex;
        flex-direction: column;
        gap: 8px;

        label {
            font-size: 14px;
            font-weight: 600;
            color: #2d3748;
        }

        .modern-input {
            :deep(.el-input__wrapper) {
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                border: 1px solid rgba(102, 126, 234, 0.2);
                transition: all 0.3s ease;

                &:hover,
                &:focus {
                    border-color: #667eea;
                    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
                }
            }
        }
    }

    .button-group {
        flex-direction: row;
        gap: 12px;
        margin-top: 8px;

        .el-button {
            border-radius: 12px;
            font-weight: 500;
            padding: 12px 24px;
            transition: all 0.3s ease;

            &.el-button--primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
                }
            }

            &:not(.el-button--primary) {
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid rgba(102, 126, 234, 0.3);
                color: #667eea;

                &:hover {
                    background: rgba(102, 126, 234, 0.1);
                    border-color: #667eea;
                }
            }
        }
    }
}

.right-panel {
    flex: 1;
    padding: 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
</style>