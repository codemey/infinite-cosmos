<template>
    <icPage>
        <template #header>
            <icFilter v-model="form.keyword" @onEnter="doSearch"></icFilter>
            <div class="ic-button" @click="add">
                <icon-add></icon-add>
            </div>
        </template>
        <template #main>
            <el-table :data="list" border style="height: 100%;" v-loading="loading">
                <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label">
                    <template #default="{ row }">
                        <div v-if="col.prop === 'account'">
                            <el-tag round class="tag" @click="copyToClipboard(row.account)">
                                {{ row.account }}
                            </el-tag>
                        </div>
                        <div v-if="col.prop === 'pwd'">
                            <el-tag type="info" round class="tag" @click="copyToClipboard(row.pwd)">
                                {{ row.pwd }}
                            </el-tag>
                        </div>
                        <div v-if="col.prop === 'website'">
                            <el-link :href="'http://' + row.website" target="_blank">{{ row.website }}</el-link>
                        </div>
                    </template>
                    <template #header="{ column }">
                        <div style="display:flex;">
                            <span>{{ column.label }}</span>
                            <icon-filter class="hover-pointer" @click="customDialog('cd'+column.property)" :class="'cd'+column.property"></icon-filter>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="handleEdit(row.id)">编辑</el-button>
                        <el-button link type="danger" size="small" @click="handleDel(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #footer>
            <el-pagination v-model:page-size="form.pageSize" v-model:current-page="form.pageNo" background layout="total, prev, pager, next" :total="total" @current-change="doSearch" />
        </template>
    </icPage>

    <formDialog ref="formDialogRef" @reload="doSearch"></formDialog>

    <customPopover ref="customPopoverRef"></customPopover>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "@/api/pwdManagement"
import formDialog from './formDialog.vue'
import { copyToClipboard, message, messageBox, useSearch } from '@/utils/tool'
import customPopover from './customPopover'

//表单
const form = reactive({
    keyword: "",
    pageNo: 1,
    pageSize: 10,
});
const { list, loading, total, doSearch } = useSearch(api, form)
onMounted(() => {
    doSearch()
})
const columns = [
    { prop: 'account', label: '账号' },
    { prop: 'pwd', label: '密码' },
    { prop: 'website', label: '网站' },
    { prop: 'remark', label: '备注' },
]
// 添加行
const formDialogRef = ref(null)
const add = () => {
    formDialogRef.value.open()
}
// 编辑行
const handleEdit = (id) => {
    formDialogRef.value.open(id)
}
// 删除行
const handleDel = (id) => {
    messageBox.confirm('确认删除?').then(() => {
        api.delete(id).then(res => {
            message.success('删除成功')
            doSearch()
        })
    })
}
// 表头过滤
const customPopoverRef = ref(null)
const customDialog = (className) => {
    customPopoverRef.value.open(className)
}
</script>

<style lang="scss" scoped>
.tag {
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
}

:deep(.el-table) {
    border-radius: 12px;
    overflow: hidden;

    th.el-table__cell {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #ffffff;
        font-weight: 600;
    }

    td.el-table__cell {
        transition: background 0.2s ease;
    }

    .el-table__row:hover td.el-table__cell {
        background: rgba(102, 126, 234, 0.05);
    }
}
</style>