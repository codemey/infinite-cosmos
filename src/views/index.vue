<template>
    <!-- 项目主页 -->
    <div class="ic-container">
        <div class="ic-card ic-border-animation" @click="go('/codeSnippet')">
            <h2>代码片段</h2>
        </div>
        <div class="ic-card ic-border-animation" @click="go('/jsonToTable')">
            <h2>表格列转换</h2>
        </div>
        <div class="ic-card ic-border-animation" @click="go('/')">
            <h2>报表管理</h2>
        </div>
        <div class="ic-card ic-border-animation" @click="go('/')">
            <h2>密码管理</h2>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const go = (url) => {
    router.push(url)
}
</script>

<style lang="scss" scoped>
.ic-container {
    width: 100vw;
    height: 100vh;

    display: flex;
    padding: 2px;

    .ic-card {
        height: 100px;
        margin: 20px;
        background: var(--bg-color-linear);
        &:hover {
            opacity: 0.9;
            cursor: pointer;
        }
    }
}
</style>