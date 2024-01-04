<template>
    <div class="codeSnippet-container">
        <div class="codeSnippet-header">
            <div class="add" @click="addCodeSnippet">
                <icon-add></icon-add>
            </div>
            <icFilter v-model="form.keyword" @onEnter="doSearch"></icFilter>
        </div>
        <div class="codeSnippet-essence">
            <div class="ic-card" v-for="item in data" :key="item">
                <div class="snippet-header">
                    <span title="编辑" v-if="!item.editable">
                        <icon-edit class="hover-pointer" @click="item.editable = !item.editable"></icon-edit>
                    </span>
                    <span title="保存" v-else>
                        <icon-save class="hover-pointer" @click="save(item)"></icon-save>
                    </span>
                    <span title="复制代码">
                        <icon-copy class="hover-pointer" @click="copy(item)"></icon-copy>
                    </span>
                    <span title="展开">
                        <icon-expand class="hover-pointer" @click="expand(item)"></icon-expand>
                    </span>
                    <span title="删除" style="fill: red;">
                        <icon-delete class="hover-pointer" @click="del(item)"></icon-delete>
                    </span>
                </div>
                <div class="snippet-content" :class="item.collapse?'more-mask':''" v-if="!item.editable">
                    <icCodeHighlight :code="item.content"></icCodeHighlight>
                </div>
                <div class="snippet-content" v-else>
                    <icCodeEditor v-model:value="item.content" />
                </div>
                <div class="snippet-footer">
                    <textarea v-if="item.editable" v-model="item.desc" />
                    <span v-else>{{ item.desc }}</span>
                </div>
            </div>
        </div>
        <div class="codeSnippet-footer">
            <el-pagination v-model:page-size="form.pageSize" v-model:current-page="form.pageNo" background layout="prev, pager, next" :total="total" @current-change="doSearch" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "@/api/codeSnippet"
import { copyToClipboard, message, messageBox } from '@/utils/tool'

onMounted(() => {
    doSearch()
})
//表单
const form = reactive({
    keyword: "",
    pageNo: 1,
    pageSize: 10,
});
const data = ref([])
const total = ref(0)
const doSearch = () => {
    api.query(form).then(res => {
        res.data.forEach(e => {
            const pattern = /\n/g
            // 内容超过23行进行折叠
            if (e.content.match(pattern)?.length > 23) {
                e.collapse = true
            }
        })
        data.value = res.data
        total.value = res.total
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
        desc: item.desc
    }
    api.save(queryData).then(res => {
        item.editable = !item.editable
        doSearch()
    })
}
//复制
const copy = (item) => {
    copyToClipboard(item.content)
    message.success('复制成功')
}
//展开
const expand = (item) => {
    if (item.collapse === undefined) return
    item.collapse = !item.collapse
}
//删除
const del = (item) => {
    messageBox.confirm('确认删除?').then(() => {
        api.delete(item).then(res => {
            message.success('删除成功')
            doSearch()
        })
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
        padding: 10px;

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
    }

    .codeSnippet-essence {
        overflow: auto;
        height: calc(100vh - 150px);
        border-radius: var(--border-radius-3);
        margin: 10px 0;

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
            }

            .snippet-content {
                border-radius: var(--border-radius-2);
                margin: 10px;
            }

            .snippet-footer {
                margin: 10px;
            }
        }
    }
    .codeSnippet-footer {
        .el-pagination {
            justify-content: flex-end;
        }
    }
}
</style>