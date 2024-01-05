<template>
    <el-config-provider :locale="zhCn">
        <div class="home">
            <div class="left-navbar">
                <router-link class="left-nav-item" to="/">
                    <icon-home class="hover-pointer"></icon-home>
                </router-link>
                <router-link class="left-nav-item" to="/">
                    <icon-setting class="hover-pointer"></icon-setting>
                </router-link>

                <router-link class="left-nav-item" to="/">
                    <icon-bbt class="hover-pointer"></icon-bbt>
                </router-link>
            </div>
            <div class="right-essence">
                <router-view> </router-view>
            </div>
        </div>
    </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const imgUrl = 'url(img/ic.jpg)'
</script>

<style lang="scss">
@use "@/style/index.scss" as *;
.home {
    display: flex;
    background-image: v-bind("imgUrl");
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