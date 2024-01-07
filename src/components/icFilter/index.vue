<!-- 关键词过滤 -->
<template>
    <div class="search">
        <icon-search></icon-search>
        <input type="text" v-model="value" @keyup.enter="onEnter">
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'onEnter'])
const value = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
})
watch(value, val => {
    if (!val) emit('onEnter', val)
})
const onEnter = () => {
    emit('onEnter', value)
}
</script>

<style lang="scss" scoped>
.search {
    height: 30px;
    width: 30px;
    padding: 5px;
    background-color: var(--bg-color-2);
    border-radius: var(--border-radius-2);
    transition: width 0.3s ease;
    overflow: hidden;
    display: flex;
    align-items: center;

    &:hover {
        width: 200px;
    }

    &:hover>input {
        display: block;
    }

    input {
        display: none;
        border: none;
        background: none;
        outline: none !important;
        padding: 0;
    }
}
</style>