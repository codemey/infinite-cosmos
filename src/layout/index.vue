<template>
    <div class="home" :style="`background-image: ${imgUrl}`">
        <div class="left-navbar">
            <router-link class="left-nav-item" to="/">
                <icon-home class="hover-pointer"></icon-home>
            </router-link>
            <icon-setting class="left-nav-item hover-pointer" @click="openSetting"></icon-setting>
        </div>
        <div class="right-essence">
            <router-view> </router-view>
        </div>
    </div>

    <!-- 设置 -->
    <setting ref="settingRef"></setting>
</template>

<script setup>
import { ref } from 'vue'
import setting from './setting'

// 背景图
const imgUrl = 'url(img/ic.jpg)'
const settingRef = ref(null)
const openSetting = () => {
    settingRef.value.open()
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    // background-image: v-bind("imgUrl");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    .left-navbar {
        position: fixed;
        width: 50px;
        left: 30px;
        bottom: 50vh;
        display: flex;
        flex-wrap: wrap;
        background: var(--bg-color-linear);
        border-radius: var(--border-radius-3);
        .left-nav-item {
            width: 100%;
            text-align: center;
            margin: 5px;
        }
    }
    .right-essence {
        margin-left: 100px;
        width: calc(100% - 100px);
    }
}
</style>