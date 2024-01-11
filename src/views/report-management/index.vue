<template>
    <icPage>
        <template #header>
            <icFilter v-model="form.keyword" @onEnter="doSearch"></icFilter>

            <div class="ic-button">
                <span>仅看月报</span>
                <el-switch v-model="onlyViewMonth" @change="switchChange" />
            </div>

            <!-- 分类维护 -->
            <categoryMaintenance>
                <div class="ic-button">
                    分类维护
                </div>
            </categoryMaintenance>

            <exportReport>
                <div class="ic-button"> 导出月报 </div>
            </exportReport>

            <div class="ic-button" @click="add">
                <icon-add></icon-add>
            </div>
        </template>
        <template #main>
            <div class="ic-card" v-for="(item, index) in list" :key="item.reportDate">
                <div class="ic-header">
                    <div class="ic-header-left">

                        <!-- 汇报类型(日报|月报) -->
                        <el-select v-if="item.editable" v-model="item.type" style="width: 120px;margin-right: 10px;">
                            <el-option v-for="item in reportTypeOptions" :key="item.key" :label="item.value" :value="item.key" />
                        </el-select>
                        <template v-else>
                            <el-tag style="margin-right: 10px;" effect="dark" v-if="item.type==='day'">日报</el-tag>
                            <el-tag style="margin-right: 10px;" type="info" effect="dark" v-else>月报</el-tag>
                        </template>

                        <!-- 汇报日期 -->
                        <el-date-picker v-if="item.editable" v-model="item.reportDate" type="date" value-format="YYYY-MM-DD" />
                        <span v-else class="title2">
                            {{ item.reportDate.slice(0, 10) }}
                        </span>

                    </div>
                    <div class="ic-header-right">
                        <span title="编辑" v-if="!item.editable">
                            <icon-edit class="hover-pointer" @click="item.editable = !item.editable"></icon-edit>
                        </span>
                        <span title="保存" v-else>
                            <icon-save class="hover-pointer" @click="save(item)"></icon-save>
                        </span>
                        <span title="复制">
                            <icon-copy class="hover-pointer" @click="copy(item)"></icon-copy>
                        </span>
                        <span title="删除" style="fill: red;">
                            <icon-delete class="hover-pointer" @click="del(item, index)"></icon-delete>
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
            <el-pagination v-model:page-size="form.pageSize" v-model:current-page="form.pageNo" background layout="total, prev, pager, next" :total="total" @current-change="doSearch" />
        </template>
    </icPage>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "@/api/reportManagement"
import categoryMaintenance from './categoryMaintenance'
import exportReport from './exportReport'
import { cache, dateFormat, copyToClipboard, message, messageBox, useSearch } from '@/utils/tool'

const reportTypeOptions = ref([
    { key: 'day', value: '日报' },
    { key: 'month', value: '月报' },
])
const onlyViewMonth = ref(false)
const switchChange = () => {
    form.type = onlyViewMonth.value ? 'month' : ''
    doSearch()
}
//表单
const form = reactive({
    dateFrom: '',
    dateTo: '',
    keyword: '',
    pageNo: 1,
    pageSize: 10,
    type: ''   //day:'按天查看',month:'按月查看'
})
const { list, loading, total, doSearch } = useSearch(api, form)
onMounted(() => {
    doSearch()
})
const add = () => {
    const data = []
    // 获取汇报分类缓存
    const reportCategory = cache.get('report_category') || []
    if (reportCategory.length === 0) {
        message.error('请先维护汇报分类')
    } else {
        reportCategory.forEach(e => {
            data.push({
                category: e,
                content: ''
            })
        })

        list.value.unshift({
            type: 'day',
            reportDate: dateFormat(new Date(), 'yyyy-MM-dd'),
            data,
            editable: true
        })
    }
}
const save = (item) => {
    api.save(item).then(res => {
        doSearch()
    })
}
const copy = (item) => {
    const map = {}
    item.data.forEach(e => {
        if (e.content) {
            map[e.category] = []
            map[e.category].push(e.content)
        }
    })
    const data = JSON.stringify(map, null, 2).replace(/["[\]{},]/g, '').replace(/\n  /g, '\n')
    copyToClipboard(data)
    message.success('复制成功')
}
const del = (item, index) => {
    messageBox.confirm('确认删除?').then(() => {
        if (item.id) {
            api.delete(item.id).then(res => {
                message.success('删除成功')
                doSearch()
            })
        } else {
            list.value.splice(index, 1)
        }
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
        .ic-header-left {
            display: flex;
            align-items: center;
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
                color: var(--el-text-color-primary);
                background-color: var(--el-color-primary);
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
                background-color: var(--el-color-primary-light-9);
                overflow: auto;

                .el-textarea {
                    font-size: 16px;
                    height: 300px;

                    :deep(.el-textarea__inner:focus) {
                        box-shadow: 0 0 2px 4px
                            var(--el-input-focus-border-color) inset;
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