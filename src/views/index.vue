<template>
    <div class="ic-container">
        <div class="hero-section">
            <h1 class="hero-title">工具箱</h1>
            <p class="hero-subtitle">一站式开发工具集合</p>
        </div>
        <div class="cards-grid">
            <div class="modern-card" @click="go('code-snippet')">
                <div class="card-icon">
                    <el-icon :size="40"><Document /></el-icon>
                </div>
                <h3 class="card-title">代码片段</h3>
                <p class="card-desc">管理和搜索代码片段</p>
            </div>
            <div class="modern-card" @click="go('json-to-table')">
                <div class="card-icon">
                    <el-icon :size="40"><Grid /></el-icon>
                </div>
                <h3 class="card-title">表格列转换</h3>
                <p class="card-desc">JSON数据转表格列</p>
            </div>
            <div class="modern-card" @click="go('report-management')">
                <div class="card-icon">
                    <el-icon :size="40"><DataLine /></el-icon>
                </div>
                <h3 class="card-title">报表管理</h3>
                <p class="card-desc">生成和管理报表</p>
            </div>
            <div class="modern-card" @click="go('pwd-management')">
                <div class="card-icon">
                    <el-icon :size="40"><Lock /></el-icon>
                </div>
                <h3 class="card-title">密码管理</h3>
                <p class="card-desc">安全存储密码信息</p>
            </div>
            <div class="modern-card" @click="go('translate')">
                <div class="card-icon">
                    <el-icon :size="40"><ChatDotRound /></el-icon>
                </div>
                <h3 class="card-title">翻译神器</h3>
                <p class="card-desc">多语言翻译工具</p>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const go = (name) => {
    router.push({ name })
}
</script>

<style lang="scss" scoped>
.ic-container {
    width: 100%;
    height: 100%;
    padding: 40px;
    overflow-y: auto;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero-section {
    text-align: center;
    margin-bottom: 50px;
    animation: fadeInDown 0.8s ease-out;
}

.hero-title {
    font-size: 56px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 10px 0;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    font-weight: 400;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    max-width: 1200px;
    width: 100%;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.modern-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 32px 24px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

        &::before {
            transform: scaleX(1);
        }

        .card-icon {
            transform: scale(1.1) rotate(5deg);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .card-icon :deep(svg) {
            color: #ffffff;
        }
    }

    &:active {
        transform: translateY(-4px) scale(0.98);
    }
}

.card-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    :deep(svg) {
        color: #667eea;
        transition: color 0.4s ease;
    }
}

.card-title {
    font-size: 22px;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 8px 0;
}

.card-desc {
    font-size: 14px;
    color: #718096;
    margin: 0;
    line-height: 1.5;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>