<template>
    <el-dialog :title="title" v-model="dialogVisible" width="600px">
        <el-form style="margin:0 20px;">
            <el-form-item label="账号">
                <el-input v-model="formData.account" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.pwd" clearable></el-input>
            </el-form-item>
            <el-form-item label="网站">
                <el-input v-model="formData.website" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formData.remark" type="textarea" clearable></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button plain @click="dialogVisible = false">关闭</el-button>
            <el-button plain type="primary" :loading="loading" @click="save">保存</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import api from "@/api/pwdManagement"
import { message, messageBox } from '@/utils/tool'

const emit = defineEmits(['reload'])
const dialogVisible = ref(false)
const title = ref('')
const formData = ref({})
const open = (id) => {
    formData.value = {
        account: '',
        pwd: '',
        website: '',
        remark: '',
    }
    if (id) {
        title.value = '编辑'
        api.getById(id).then(res => {
            formData.value = res
        })
    } else {
        title.value = '添加'
    }
    dialogVisible.value = true
}

const loading = ref(false)
const save = () => {
    loading.value = true
    api.save(formData.value).then(res => {
        emit('reload')
        message.success("保存成功")
        dialogVisible.value = false
    }).finally(() => {
        loading.value = false
    })
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
