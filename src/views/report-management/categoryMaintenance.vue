<template>
    <el-popover placement="top-start" trigger="hover">
        <template #reference>
            <slot></slot>
        </template>
        <div class="main">
            <el-tag v-for="tag in categoryList" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
                <span>{{ tag }}</span>
            </el-tag>
            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else size="small" @click="showInput">
                + 新增
            </el-button>
        </div>
    </el-popover>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { cache, copyToClipboard, message, messageBox, useSearch } from '@/utils/tool'

const inputValue = ref('')
const categoryList = ref(cache.get('report_category') || [])
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
    categoryList.value.splice(categoryList.value.indexOf(tag), 1)
    // 缓存汇报分类
    cache.set('report_category', categoryList.value)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value?.input?.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        categoryList.value.push(inputValue.value)
        // 缓存汇报分类
        cache.set('report_category', categoryList.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .el-tag {
        margin: 5px;
    }
    .el-button {
        margin: 5px;
    }
}
</style>