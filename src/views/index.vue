<template>
    <!-- 项目主页 -->
    <div class="ic-container">
        <div class="ic-card" @click="go('/codeSnippet')">
            <h2>代码片段</h2>
        </div>
        <div class="ic-card">
            <h2>其他</h2>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const imgUrl = 'url(img/ic.jpg)'
const router = useRouter()
const go = (url) => {
    router.push(url)
}
</script>

<style lang="scss" scoped>
.ic-container {
    width: 100vw;
    height: 100vh;
    background-image: v-bind('imgUrl');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    padding: 2px;

    .ic-card {
        // width: 200px;
        height: 100px;
        margin: 20px;
    }
}
</style>