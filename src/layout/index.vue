<template>
    <div class="home">
        <div class="left-navbar">
            <!-- <router-link class="left-nav-item" to="/" :title="'首页'">
                <icon-home class="hover-pointer"></icon-home>
            </router-link> -->
            <icon-home class="left-nav-item hover-pointer" @click="openHome" :title="'首页'"></icon-home>
            <icon-setting class="left-nav-item hover-pointer" @click="openSetting" :title="'设置'"></icon-setting>
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
import { useRouter } from 'vue-router'
import setting from './setting'

const router = useRouter()
const openHome = () => {
    router.push('/')
}

const settingRef = ref(null)
const openSetting = () => {
    settingRef.value.open()
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    height: 100%;
    position: relative;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.left-navbar {
    position: fixed;
    width: 64px;
    left: 24px;
    bottom: 50vh;
    transform: translateY(50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 12px 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 100;

    .left-nav-item {
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 0;
        border-radius: 12px;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.25);
        }
    }
}

.right-essence {
    width: calc(100% - 90px);
    height: 100%;
    margin-left: 90px;
    overflow: hidden;
}
</style>