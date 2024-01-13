<template>
    <el-drawer v-model="drawer" title="设置" direction="ltr">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="colorPrimary" :predefine="colorList" @change="themeColorChange" />
            </el-form-item>
            <el-form-item label="文字颜色">
                <el-color-picker v-model="textColorPrimary" :predefine="colorList" @change="textColorChange" />
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="背景图片">
                <icUpload></icUpload>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref } from "vue"
import { useCssVar } from '@vueuse/core'
import { cache } from '@/utils/tool'
import config from '@/config'
import colorTool from '@/utils/color'

const drawer = ref(false)
const open = () => {
    drawer.value = true
}

// 设置主题颜色变量
const colorList = ['#409EFF', '#009688', '#536dfe', '#ff5c93', '#c62f2f', '#fd726d', config.theme_color, '#000', '#fff']
const colorPrimary = ref(cache.get('theme_color') || config.theme_color)
const themeColorChange = (color) => {
    if (color) {
        // 缓存主题色
        cache.set('theme_color', color)

        // 渐变色
        const linearColor = useCssVar('--bg-color-linear', null)
        linearColor.value = `linear-gradient(to top left, #fff, ${color})`

        //主题色
        document.documentElement.style.setProperty('--el-color-primary', color);
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(color, i / 10));
        }
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, colorTool.darken(color, i / 10));
        }
    }
}

// 设置文字颜色变量
const textColorPrimary = ref(cache.get('text_color') || config.text_color)
const textColorChange = (color) => {
    if (color) {
        // 缓存文字颜色
        cache.set('text_color', color)

        const textColor = useCssVar('--el-text-color-primary', null)
        textColor.value = color
    }
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
</style>