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
                        <div v-if="col.prop === 'website'">
                            <a :href="'http://' + row.website" target="_blank">{{ row.website }}</a>
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
            <el-pagination v-model:page-size="form.pageSize" v-model:current-page="form.pageNo" background
                layout="total, prev, pager, next" :total="total" @current-change="doSearch" />
        </template>
    </icPage>

    <formDialog ref="formDialogRef" @reload="doSearch"></formDialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "@/api/pwdManagement"
import formDialog from './formDialog.vue'
import { copyToClipboard, message, messageBox, useSearch } from '@/utils/tool'
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
</script>

<style lang="scss" scoped></style>