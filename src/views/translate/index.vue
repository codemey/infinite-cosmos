<template>
    <div class="container ic-card">
        <div class="left">
            <div class="item">
                <el-select v-model="from" style="width: 150px;" class="select-lang-from">
                    <el-option v-for="item in language" :key="item.key" :label="item.value" :value="item.key" @click="clickLangFromItem(item.key)" />
                </el-select>

                <icon-arrows class="arrows hover-pointer" @click="handleSwitch"></icon-arrows>

                <el-select v-model="to" style="width: 150px;">
                    <el-option v-for="item in language.filter(e=>e.key!=='auto')" :key="item.key" :label="item.value" :value="item.key" />
                </el-select>
            </div>

            <div class="item">
                <el-input class="content-input" v-model="content" @keydown.enter="translate" maxlength="5000" placeholder="输入文字按Enter翻译，Shift+Enter换行" show-word-limit clearable type="textarea" />
            </div>

        </div>
        <div class="right">
            <el-tooltip content="转驼峰" placement="top" effect="customized">
                <icon-camel class="hover-pointer" @click="toCamelCase"></icon-camel>
            </el-tooltip>
            <el-tooltip content="转下划线" placement="top" effect="customized">
                <icon-snake class="hover-pointer" @click="toSnakeCase"></icon-snake>
            </el-tooltip>
            <el-tooltip content="转横杠" placement="top" effect="customized">
                <icon-kebab class="hover-pointer" @click="toKebabCase"></icon-kebab>
            </el-tooltip>
            <el-tooltip content="复制" placement="top" effect="customized">
                <icon-copy2 class="hover-pointer" @click="copyToClipboard(result)"></icon-copy2>
            </el-tooltip>
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
const from = ref('auto')        //翻译语言从
const to = ref('zh')            //翻译语言到
const content = ref('')
const result = ref('')
const originalResult = ref('')  //原始翻译值

// 点击'翻译语言从'的选项
const clickLangFromItem = (val) => {
    if (val === 'auto') {
        document.querySelector('.select-lang-from input').value = '自动检测'
    }
}
// 语言互换
const handleSwitch = () => {
    if (from.value === 'auto') return

    const _from = from.value
    from.value = to.value
    to.value = _from
}
// 翻译
const translate = (event) => {
    // 排除输入法回车
    if (event.isComposing) return

    // shift+Enter时换行
    if (event.shiftKey) return

    event.preventDefault()

    if (!content.value) {
        message.error('请先输入内容!')
        return
    }
    // from选择自动时,调接口检测语种
    if (from.value === 'auto') {
        api.langdetect(content.value).then(res => {
            if (res) {
                // 自动检测语言为中文时翻译成英文,否则翻译成中文
                to.value = res === 'zh' ? 'en' : 'zh'

                nextTick(() => {
                    // 自动检测结果赋值
                    const langRes = language.value.filter(e => e.key === res)
                    if (langRes.length > 0) {
                        document.querySelector('.select-lang-from input').value = '检测到' + langRes[0].value
                    }
                })

                startTranslate()
            }
        })
    } else {
        startTranslate()
    }
}
// 开始翻译
const startTranslate = () => {
    api.normalTranslate(content.value, from.value, to.value).then(res => {
        result.value = res
        originalResult.value = res
    })
}
// 转驼峰
const toCamelCase = () => {
    result.value = changeCase.camelCase(result.value)
}
// 转下划线
const toSnakeCase = () => {
    result.value = changeCase.snakeCase(result.value)
}
// 转横杠
const toKebabCase = () => {
    result.value = changeCase.kebabCase(result.value)
}
</script>

<style lang="scss" scoped>
.container {
    margin: 40px 150px 10px 10px;
    height: calc(100vh - 100px);
    display: flex;
    .left {
        flex: 4;
        height: 100%;
        margin-right: 100px;
        .item {
            display: flex;
            flex-wrap: wrap;
            margin: 0 0px 14px 20px;
            align-items: center;
            .arrows {
                height: 20px;
                width: 20px;
                margin: 0 10px;
            }
            .el-textarea {
                font-size: 16px;
                height: calc(100vh - 172px);

                :deep(.el-textarea__inner:focus) {
                    box-shadow: 0 0 2px 4px var(--el-input-focus-border-color)
                        inset;
                }

                :deep(textarea) {
                    border-radius: 0;
                }
            }
        }
    }
    .right {
        flex: 5;
        position: relative;
        & > * {
            margin-right: 5px;
        }
    }
}
</style>