<!-- 代码高亮 -->
<template>
    <hljs :code="code" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const hljs = defineAsyncComponent(async () => {
    //异步引入主题、语言配置文件
    await import('highlight.js/styles/stackoverflow-light.css')//可以引入不同的style文件切换样式
    await import('highlight.js/lib/common');

    //返回高亮组件
    return import("@highlightjs/vue-plugin").then(Module => {
        return Module.default.component
    })
})

const props = defineProps(['code'])
</script>

<style lang="scss" scoped>
:deep(code, pre) {
    border-radius: 10px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
}
</style>