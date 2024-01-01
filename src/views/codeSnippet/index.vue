<template>
    <div class="codeSnippet-container">
        <div class="codeSnippet-header">
            <div class="add" @click="addCodeSnippet">
                <icon-add></icon-add>
            </div>
            <div class="search">
                <icon-search></icon-search>
                <input type="text" placeholder="filter">
            </div>
        </div>
        <div class="codeSnippet-essence">
            <div class="ic-card" v-for="item in data" :key="item">
                <div class="snippet-header">
                    <span title="编辑" v-if="!item.editable" @click="item.editable=!item.editable">
                        <icon-edit class="hover-pointer"></icon-edit>
                    </span>
                    <span title="保存" v-else @click="save(item)">
                        <icon-save class="hover-pointer"></icon-save>
                    </span>
                    <span title="复制代码">
                        <icon-copy class="hover-pointer" @click="copy(item)"></icon-copy>
                    </span>
                    <span title="展开">
                        <icon-expand class="hover-pointer"></icon-expand>
                    </span>
                    <span title="删除" style="fill: red;" @click="del(item)">
                        <icon-delete class="hover-pointer"></icon-delete>
                    </span>
                </div>
                <div class="snippet-content" v-if="!item.editable" v-text="item.content"> </div>
                <div class="snippet-content" v-else>
                    <v-ace-editor v-model:value="item.content" lang="html" theme="github" style="height: 300px" />
                </div>
                <div class="snippet-footer">
                    {{ item.desc }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "@/api/codeSnippet"
import { VAceEditor } from "vue3-ace-editor"
import { copyToClipboard } from '@/utils/tool'
import '@/utils/aceConfig.js'
// const vue3AceEditor = () => import('vue3-ace-editor')
// console.log(vue3AceEditor);
onMounted(() => {
    doSearch()
})
//表单
const form = reactive({
    content: "",
    page: 1,
    pageSize: 10,
});
const data = ref([])
const doSearch = () => {
    api.query(form).then(res => {
        data.value = res.data
    })
}
//添加代码段
const addCodeSnippet = () => {
    data.value.unshift({
        content: '',
        desc: '这是一段神秘代码',
        editable: true
    })
}
//保存
const save = (item) => {
    const queryData = {
        id: item.id,
        content: item.content,
        desc: '这是一段神秘代码' + new Date()
    }
    api.save(queryData).then(res => {
        console.log(res);
        item.editable = !item.editable
    })
}
//复制
const copy = (item) => {
    copyToClipboard(item.content)
}
//删除
const del = (item) => {
    api.delete(item).then(res => {
        doSearch()
    })
}
</script>

<style lang="scss" scoped>
.codeSnippet-container {
    height: 100%;
    padding: 10px;
    padding-right: 150px;
    .codeSnippet-header {
        display: flex;
        justify-content: flex-end;
        .add {
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--bg-color-2);
            border-radius: var(--border-radius-2);
            margin: 0 10px;
            cursor: pointer;
            &:hover {
                background-color: var(--bg-color-1);
            }
        }
        .search {
            height: 30px;
            width: 150px;
            padding: 5px;
            background-color: var(--bg-color-2);
            border-radius: var(--border-radius-2);
            transition: width 0.3s ease;
            overflow: hidden;
            display: flex;
            align-items: center;

            &:hover {
                width: 250px;
            }
        }
    }
    .codeSnippet-essence {
        overflow: auto;
        height: calc(100vh - 50px);
        border-radius: var(--border-radius-3);
        margin-top: 10px;
        .ic-card {
            white-space: pre-wrap;
            margin-bottom: 10px;
            .snippet-header {
                height: 25px;
                width: 100%;
                text-align: right;

                svg {
                    margin: 0 5px;
                }
                & svg:hover {
                    background-color: var(--bg-color-3);
                }
            }
            .snippet-content {
                background-color: var(--bg-color-2);
                border-radius: var(--border-radius-2);
                margin: 10px;
                padding: 10px;
            }
            .snippet-footer {
                margin: 10px;
            }
        }
    }
}
</style>