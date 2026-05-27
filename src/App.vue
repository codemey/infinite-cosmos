<template>
    <el-config-provider :locale="zhCn">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup>
import { useCssVar } from '@vueuse/core'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import colorTool from '@/utils/color'
import { cache } from '@/utils/tool'
import config from '@/config'

//设置颜色变量
const theme_color = cache.get('theme_color') || config.theme_color
const text_color = cache.get('text_color') || config.text_color
const background_image = cache.get('background_image') || ''
const bgImage = useCssVar('--bg-image', null)
bgImage.value = background_image ? `url("${background_image}")` : 'none'
if (theme_color) {
    // 渐变色
    const linearColor = useCssVar('--bg-color-linear', null)
    linearColor.value = `linear-gradient(to top left, #fff, ${theme_color})`

    // 文字颜色
    const textColor = useCssVar('--el-text-color-primary', null)
    textColor.value = text_color

    //主题色
    document.documentElement.style.setProperty('--el-color-primary', theme_color);
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(theme_color, i / 10));
    }
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, colorTool.darken(theme_color, i / 10));
    }
}
</script>

<style lang="scss">
@use "@/style/index.scss" as *;
</style>