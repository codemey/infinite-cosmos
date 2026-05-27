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
                <div class="ic-button">导出月报</div>
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
                            <el-tag style="margin-right: 10px;" effect="dark" v-if="item.type === 'day'">日报</el-tag>
                            <el-tag style="margin-right: 10px;" type="info" effect="dark" v-else>月报</el-tag>
                        </template>

                        <!-- 汇报日期 -->
                        <el-date-picker v-if="item.editable" v-model="item.reportDate" type="date" value-format="YYYY-MM-DD" />
                        <div v-else class="title2" style="display: flex;">
                            <div style="width: 140px;">{{ item.reportDate.slice(0, 10) }}</div>
                            <span>{{ convertToChineseWeek(item.reportDate) }}</span>
                        </div>

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
import { cache, dateFormat, copyToClipboard, message, messageBox, useSearch, elevator, convertToChineseWeek } from '@/utils/tool'

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

        elevator('.main', 'up')
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
    const data = JSON.stringify(map, null, 2).replace(/["[\]{},]/g, '').replace(/\n  /g, '\n').trim()
    copyToClipboard(data)
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
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(102, 126, 234, 0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
        border-color: rgba(102, 126, 234, 0.2);
    }

    .ic-header {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg {
            margin: 0 4px;
            padding: 6px;
            border-radius: 8px;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(102, 126, 234, 0.1);
            }
        }

        .ic-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }

    .ic-content {
        border-radius: 12px;
        margin: 16px 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(20% - 10px), 1fr));
        gap: 16px;

        .item {
            padding: 48px 0 0 0;
            position: relative;

            .category {
                position: absolute;
                top: 0;
                left: 0;
                height: 44px;
                width: 100%;
                border-radius: 12px 12px 0 0;
                color: #ffffff;
                background: var(--bg-color-linear);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-weight: 700;
            }

            .content {
                height: 100%;
                min-height: 120px;
                max-height: 300px;
                background: rgba(102, 126, 234, 0.05);
                overflow: auto;
                border-radius: 0 0 12px 12px;
                border: 1px solid rgba(102, 126, 234, 0.1);
                border-top: none;

                .el-textarea {
                    font-size: 16px;
                    height: 300px;

                    :deep(.el-textarea__inner:focus) {
                        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) inset;
                    }

                    :deep(textarea) {
                        border-radius: 0;
                        background: transparent;
                    }
                }
            }
        }
    }
}
</style>