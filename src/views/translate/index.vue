<template>
    <div class="translate-container">
        <div class="left-panel">
            <div class="lang-selector">
                <el-select v-model="from" class="modern-select">
                    <el-option v-for="item in language" :key="item.key" :label="item.value" :value="item.key" @click="clickLangFromItem(item.key)" />
                </el-select>

                <icon-arrows class="arrows-icon" @click="handleSwitch"></icon-arrows>

                <el-select v-model="to" class="modern-select">
                    <el-option v-for="item in language.filter(e=>e.key!=='auto')" :key="item.key" :label="item.value" :value="item.key" />
                </el-select>
            </div>

            <div class="input-area">
                <el-input class="content-input" v-model="content" @keydown.enter="translate" maxlength="5000" placeholder="输入文字按Enter翻译，Shift+Enter换行" show-word-limit clearable type="textarea" />
            </div>

        </div>
        <div class="right-panel">
            <div class="toolbar">
                <el-tooltip content="转驼峰" placement="top" effect="customized">
                    <icon-camel class="toolbar-icon" @click="toCamelCase"></icon-camel>
                </el-tooltip>
                <el-tooltip content="转下划线" placement="top" effect="customized">
                    <icon-snake class="toolbar-icon" @click="toSnakeCase"></icon-snake>
                </el-tooltip>
                <el-tooltip content="转横杠" placement="top" effect="customized">
                    <icon-kebab class="toolbar-icon" @click="toKebabCase"></icon-kebab>
                </el-tooltip>
                <el-tooltip content="复制" placement="top" effect="customized">
                    <icon-copy2 class="toolbar-icon" @click="copyToClipboard(result)"></icon-copy2>
                </el-tooltip>
            </div>
            <icCodeHighlight :code="result" height="calc(100vh - 200px)"></icCodeHighlight>
        </div>
    </div>
</template>

<script setup>
import { nextTick, ref } from "vue"
import { copyToClipboard, message } from '@/utils/tool'
import * as changeCase from "change-case"
import api from '@/api/translate'

const language = ref([
    { key: 'auto', value: '自动检测' },
    { key: 'en', value: '英语' },
    { key: 'zh', value: '中文' },
    { key: 'yue', value: '粤语' },
    { key: 'cht', value: '繁体中文' },
    { key: 'wyw', value: '文言文' },
    { key: 'jp', value: '日语' },
    { key: 'kor', value: '韩语' },
])
const from = ref('auto')
const to = ref('zh')
const content = ref('')
const result = ref('')
const originalResult = ref('')

const clickLangFromItem = (val) => {
    if (val === 'auto') {
        document.querySelector('.modern-select input').value = '自动检测'
    }
}
const handleSwitch = () => {
    if (from.value === 'auto') return

    const _from = from.value
    from.value = to.value
    to.value = _from
}
const translate = (event) => {
    if (event.isComposing) return

    if (event.shiftKey) return

    event.preventDefault()

    if (!content.value) {
        message.error('请先输入内容!')
        return
    }
    if (from.value === 'auto') {
        api.langdetect(content.value).then(res => {
            if (res) {
                to.value = res === 'zh' ? 'en' : 'zh'

                nextTick(() => {
                    const langRes = language.value.filter(e => e.key === res)
                    if (langRes.length > 0) {
                        document.querySelector('.modern-select input').value = '检测到' + langRes[0].value
                    }
                })

                startTranslate()
            }
        })
    } else {
        startTranslate()
    }
}
const startTranslate = () => {
    api.normalTranslate(content.value, from.value, to.value).then(res => {
        result.value = res
        originalResult.value = res
    })
}
const toCamelCase = () => {
    result.value = changeCase.camelCase(result.value)
}
const toSnakeCase = () => {
    result.value = changeCase.snakeCase(result.value)
}
const toKebabCase = () => {
    result.value = changeCase.kebabCase(result.value)
}
</script>

<style lang="scss" scoped>
.translate-container {
    height: 100%;
    width: 100%;
    padding: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    gap: 24px;
    box-sizing: border-box;
}

.left-panel {
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .lang-selector {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.3);

        .modern-select {
            flex: 1;

            :deep(.el-input__wrapper) {
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                border: 1px solid rgba(102, 126, 234, 0.2);
                transition: all 0.3s ease;

                &:hover,
                &:focus {
                    border-color: #667eea;
                    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
                }
            }
        }

        .arrows-icon {
            height: 24px;
            width: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            flex-shrink: 0;

            &:hover {
                transform: scale(1.2) rotate(180deg);
                fill: #667eea;
            }
        }
    }

    .input-area {
        flex: 1;
        padding: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.3);

        .content-input {
            height: 100%;

            :deep(.el-textarea) {
                height: 100%;

                .el-textarea__inner {
                    height: 100%;
                    font-size: 16px;
                    border-radius: 12px;
                    border: 1px solid rgba(102, 126, 234, 0.2);
                    transition: all 0.3s ease;

                    &:focus {
                        border-color: #667eea;
                        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                    }
                }
            }
        }
    }
}

.right-panel {
    flex: 5;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);

    .toolbar {
        display: flex;
        gap: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(102, 126, 234, 0.1);

        .toolbar-icon {
            padding: 8px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(102, 126, 234, 0.05);

            &:hover {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                fill: #ffffff;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            }
        }
    }

    :deep(.ic-code-highlight) {
        flex: 1;
        overflow: hidden;
    }
}
</style>