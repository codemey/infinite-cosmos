<template>
    <div class="codeSnippet-container">
        <div class="search">
            <icon-search></icon-search>
            <input type="text" placeholder="filter">
        </div>
        <div class="ic-card" v-for="item in 10" :key="item">
            <div class="snippet-header">
                <span title="复制代码">
                    <icon-copy class="hover-pointer"></icon-copy>
                </span>
                <span title="展开">
                    <icon-expand class="hover-pointer"></icon-expand>
                </span>
            </div>
            <div class="snippet-content" v-html="a">

            </div>
        </div>
    </div>
</template>

<script setup>
const a = `const getCount = async () => {
    const res = await getCountApi().catch(() => {})
    if (res) {
        totalSate = Object.assign(totalSate, res.data)
    }
}`
</script>

<style lang="scss" scoped>
.codeSnippet-container {
    height: 100%;
    padding: 10px;
    padding-right: 150px;
    overflow: auto;
}

.search {
    background-color: var(--bg-color-2);
    height: 30px;
    width: 150px;
    padding: 5px;
    border-radius: 10px;
    transition: width 0.3s ease;
    overflow: hidden;
    display: flex;
    align-items: center;

    &:hover {
        width: 250px;
    }

    input {
        border: none;
        background: none;
        height: 100%;
        width: 100%;
        color: var(--text-color);
        font-size: 16px;
        font-weight: 700;
        outline: none !important;
    }
}

.ic-card {
    white-space: pre-wrap;
    margin: 10px 0;

    .snippet-header {
        height: 25px;
        width: 100%;
        text-align: right;

        svg {
            margin: 0 5px;
        }
    }
}
</style>