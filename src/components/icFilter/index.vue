<template>
    <div class="ic-search">
        <icon-search class="search-icon"></icon-search>
        <input type="text" v-model="value" @keyup.enter="onEnter" placeholder="搜索...">
        <icon-clear v-if="value" class="clear-icon" @click="value=''"></icon-clear>
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
.ic-search {
    height: 40px;
    min-width: 40px;
    padding: 0 12px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(102, 126, 234, 0.2);

    &:hover,
    &:focus-within {
        width: 240px;
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
        border-color: rgba(102, 126, 234, 0.4);
    }

    .search-icon,
    .clear-icon {
        flex-shrink: 0;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.1);
        }
    }

    input {
        flex: 1;
        border: none;
        background: none;
        outline: none !important;
        padding: 0;
        font-size: 14px;
        color: #2d3748;
        min-width: 0;

        &::placeholder {
            color: #a0aec0;
        }
    }
}
</style>