<!-- 上中下结构标准页面 -->
<template>
    <div class="container">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="main">
            <slot name="main"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    padding: 10px;
    padding-right: 150px;
    .header {
        display: flex;
        justify-content: flex-end;
        padding: 10px 0;
    }
    .main {
        overflow: auto;
        height: calc(100vh - 150px);
        border-radius: var(--border-radius-3);
        margin: 10px 0;
    }
    .footer {
    }
}
</style>