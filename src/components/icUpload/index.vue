<template>
    <el-upload :class="show ? '' : 'custom-upload-hide'" v-bind="$attrs" list-type="picture-card"
        v-model:file-list="fileList" action="api/upload/img">
        <iconAdd></iconAdd>
        <template #file="{ file }">
            <div class="img-action">
                <el-image :src="file.url" fit="cover" :preview-src-list="[file.url]" hide-on-click-modal
                    style="height:100%;width:100%;cursor:pointer;" />
                <span class="hover-pointer delete" @click="handleRemove(file)" style="right:3px;top:3px;position:absolute;">
                    <iconDelete style="fill:#fff;background:red;border-radius:5px;"></iconDelete>
                </span>
            </div>
        </template>
    </el-upload>
</template>

<script setup>
import { ref, computed, watch, useAttrs } from 'vue'

const attrs = useAttrs()
const props = defineProps({
    modelValue: {
        require: true,
        type: [Array, String],
    }
})
const emit = defineEmits(['update:modelValue'])
const show = ref(true)     //上传按钮是否可见
const fileList = ref([])    //文件列表

watch(fileList, (val) => {
    // 文件列表长度超过限制，隐藏上传框
    if (attrs.limit && val.length >= attrs.limit) {
        show.value = false
    } else {
        show.value = true
    }
})

// 监听modelValue,转化赋值给fileList
watch(() => props.modelValue, (val) => {
    if (val instanceof Array) { // 数组格式
        fileList.value = props.modelValue.map(e => ({ url: e }))
    } else { // 字符串格式
        fileList.value = [{ url: props.modelValue }]
    }
}, { immediate: true })

// 删除回调
const handleRemove = (file) => {
    fileList.value.forEach((e, index, arr) => {
        if (e.uid === file.uid) arr.splice(index, 1)
    })
    const list = fileList.value.map(e => e.url)
    emit('update:modelValue', list)
}
</script>

<style lang="scss" scoped>
.img-action {
    width: 100%;
    height: 100%;

    .delete {
        display: none;
    }

    &:hover>.delete {
        display: block;
    }
}

.custom-upload-hide {
    :deep(.el-upload--picture-card) {
        display: none;
    }
}
</style>