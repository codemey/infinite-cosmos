<template>
    <Teleport v-if="show" to="body">
        <div class="_wrap" v-click-outside="onClickOutside">
            <div>开始过滤</div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const show = ref(false)

const open = (className) => {
    const fatherEle = document.querySelector('.' + className)
    const { left, top, height } = fatherEle.getBoundingClientRect()

    show.value = true
    nextTick(() => {
        const wrapEle = document.querySelector('._wrap')
        wrapEle.style.left = left + 'px'
        wrapEle.style.top = height + top + 'px'
    })
}

const onClickOutside = () => {
    show.value = false
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
._wrap {
    position: fixed;
    height: 100px;
    width: 100px;
    z-index: 999;
    background: pink;
}
</style>