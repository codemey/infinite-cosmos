<template>
    <icPage>
        <template #header>
            <icFilter v-model="form.keyword" @onEnter="doSearch"></icFilter>
            <div class="ic-button" @click="add">
                分类维护
            </div>
            <div class="ic-button" @click="add">
                导出月报
            </div>
            <div class="ic-button" @click="add">
                <icon-add></icon-add>
            </div>
        </template>
        <template #main>
            <div class="ic-card" v-for="item in list" :key="item.reportDate">
                <div class="ic-header">
                    <div class="ic-header-left">
                        <span class="title2">
                            {{ item.reportDate }}
                        </span>
                    </div>
                    <div class="ic-header-right">
                        <span title="编辑" v-if="!item.editable">
                            <icon-edit class="hover-pointer" @click="item.editable = !item.editable"></icon-edit>
                        </span>
                        <span title="保存" v-else>
                            <icon-save class="hover-pointer" @click="save(item)"></icon-save>
                        </span>
                        <span title="导出">
                            <icon-export class="hover-pointer" @click="save(item)"></icon-export>
                        </span>
                        <span title="删除" style="fill: red;">
                            <icon-delete class="hover-pointer" @click="del(item)"></icon-delete>
                        </span>
                    </div>
                </div>
                <div class="ic-content" :class="item.collapse ? 'more-mask' : ''">
                    <div class="item" v-for="i in item.data" :key="i.category">
                        <div class="category">
                            {{ i.category }}
                        </div>
                        <div class="content">
                            <el-input v-if="item.editable" type="textarea" v-model="i.content"></el-input>
                            <div v-else style="padding: 5px;"> {{ i.content }} </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <el-pagination v-model:page-size="form.pageSize" v-model:current-page="form.pageNo" background
                layout="total, prev, pager, next" :total="total" @current-change="doSearch" />
        </template>
    </icPage>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "@/api/reportManagement"
import { dateFormat, copyToClipboard, message, messageBox, useSearch } from '@/utils/tool'
//表单
const form = reactive({
    dateFrom: '',
    dateTo: '',
    keyword: "",
    pageNo: 1,
    pageSize: 10,
});
const { list, loading, total, doSearch } = useSearch(api, form)
onMounted(() => {
    doSearch()
})
const add = () => {
    list.value.unshift({
        reportDate: dateFormat(new Date(), 'yyyy-MM-dd'),
        data: [
            { category: 'pc端', content: '今天干了什么1' },
            { category: '用户端', content: '今天干了什么2' },
            { category: '机器端', content: '今天干了什么3' },
            { category: '企业微信', content: '今天干了什么4' },
            { category: '看板', content: '今天干了什么5' },
        ],
        editable: true
    })
}
const save = (item) => {
    api.save(item).then(res => {
        doSearch()
    })
}
const del = (item) => {
    messageBox.confirm('确认删除?').then(() => {
        api.delete(item.id).then(res => {
            message.success('删除成功')
            doSearch()
        })
    })
}
</script>

<style lang="scss" scoped>
.ic-card {
    white-space: pre-wrap;
    margin-bottom: 10px;

    .ic-header {
        height: 25px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        svg {
            margin: 0 5px;
        }
    }

    .ic-content {
        border-radius: var(--border-radius-2);
        margin: 10px 0;
        display: grid;
        // grid-auto-flow: column;
        grid-template-columns: repeat(auto-fit, minmax(calc(20% - 10px), 1fr));
        gap: 10px;

        .item {
            padding: 40px 0 0 0;
            position: relative;

            .category {
                position: absolute;
                top: 0;
                left: 0;
                height: 40px;
                width: 100%;
                border-radius: var(--border-radius-3) var(--border-radius-3) 0 0;
                color: var(--text-color);
                background-color: var(--theme-color-1);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-weight: 700;
            }

            .content {
                height: 100%;
                min-height: 100px;
                max-height: 300px;
                background-color: var(--bg-color-3);
                overflow: auto;

                .el-textarea {
                    font-size: 16px;
                    height: 300px;

                    :deep(.el-textarea__inner:focus) {
                        box-shadow: 0 0 2px 4px var(--el-input-focus-border-color) inset;
                    }

                    :deep(textarea) {
                        border-radius: 0;
                    }
                }
            }
        }
    }
}
</style>