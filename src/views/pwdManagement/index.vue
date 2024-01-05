<template>
    <icPage>
        <template #header>
            <div class="add" @click="addCodeSnippet">
                <icon-add></icon-add>
            </div>
            <icFilter v-model="form.keyword" @onEnter="doSearch"></icFilter>
        </template>
        <template #main>
            <el-table :data="data" border style="height: 100%;">
                <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label">
                    <template #default="{row}">
                        <div v-if="col.prop==='website'">
                            <a :href="'http://'+row.website" target="_blank">{{row.website}}</a>
                        </div>
                        <div v-else>
                            {{ col.prop }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                        <el-button link type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #footer>
            <el-pagination v-model:page-size="form.pageSize" v-model:current-page="form.pageNo" background layout="total, prev, pager, next" :total="total" @current-change="doSearch" />
        </template>
    </icPage>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"

//表单
const form = reactive({
    keyword: "",
    pageNo: 1,
    pageSize: 10,
});
const data = ref([
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
    { account: 'mey', password: '123456', website: 'www.jd.com', remarks: 'JD' },
    { account: 'mey', password: '0000', website: 'www.baidu.com', remarks: '百度' },
    { account: 'mey', password: 'qqqq1234', website: 'www.qq.com', remarks: 'QQ' },
])
const columns = [
    { prop: 'account', label: '账号' },
    { prop: 'password', label: '密码' },
    { prop: 'website', label: '网站' },
    { prop: 'remark', label: '备注' },
]
const total = ref(0)
const doSearch = () => {
    api.query(form).then(res => {
        data.value = res.data
        total.value = res.total
    })
}
</script>

<style lang="scss" scoped>
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
.el-pagination {
    justify-content: flex-end;
}
</style>