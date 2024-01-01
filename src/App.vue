<template>
    <div class="container">
        <div class="left-navbar">
            <router-link class="left-nav-item" to="/">主页</router-link>
            <div class="left-nav-item">设置</div>
        </div>
        <div class="right-essence">
            <router-view> </router-view>
        </div>
    </div>
</template>


<script setup>
const imgUrl = 'url(img/ic.jpg)'
</script>


<style lang="scss">
@import "@/style/index.scss";

.container {
    display: flex;
    background-image: v-bind("imgUrl");
    background-repeat: no-repeat;
    background-size: cover;
    .left-navbar {
        position: fixed;
        width: 50px;
        left: 30px;
        bottom: 50vh;
        display: flex;
        flex-wrap: wrap;
        background-color: var(--bg-color-3);
        border-radius: var(--border-radius-3);
        .left-nav-item {
            width: 100%;
            text-align: center;
        }
    }
    .right-essence {
        margin-left: 100px;
        width: 100%;
    }
}
</style>