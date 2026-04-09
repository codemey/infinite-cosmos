<template>
    <div class="ic-page-container">
        <div class="page-header">
            <slot name="header"></slot>
        </div>
        <div class="page-main">
            <slot name="main"></slot>
        </div>
        <div class="page-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.ic-page-container {
    height: 100%;
    width: 100%;
    padding: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.page-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-main {
    flex: 1;
    overflow: auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.page-footer {
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.2);

    :deep(.el-pagination) {
        --el-pagination-bg-color: rgba(255, 255, 255, 0.9);
        --el-pagination-button-bg-color: rgba(255, 255, 255, 0.9);
        --el-pagination-hover-color: #667eea;
    }
}
</style>