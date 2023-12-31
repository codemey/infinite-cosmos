<template>
    <div class="navbar">
        <router-link class="nav-item" to="/">主页</router-link>
        <div class="nav-item">设置</div>
    </div>
    <router-view> </router-view>
</template>

<style lang="scss">
@import '@/style/index.scss';

.container {
    display: flex;
}

.navbar {
    width: 50px;
    position: fixed;
    left: 10;
    bottom: 50vh;
    display: flex;
    flex-wrap: wrap;
    background-color: var(--bg-color-3);

    .nav-item {
        width: 100%;
        text-align: center;
    }
}
</style>