<!-- 代码编辑器 -->
<template>
    <v-ace-editor v-model:value="value" lang="javascript" theme="chrome" style="height: 300px;font-size: 16px;" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
const VAceEditor = defineAsyncComponent(async () => {
    //异步引入主题、语音配置文件
    await import('./ace.config.js');

    //返回编辑器组件
    return import("vue3-ace-editor").then(Module => {
        return Module.VAceEditor
    })
})

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style lang="scss" scoped></style>