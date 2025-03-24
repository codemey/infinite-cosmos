<template>
    <icPage>
        <template #main>
            <div class="ic-card">
                <el-button type="primary" @click="test">导出api</el-button>
                <div style="display: flex;flex-direction: column;">
                    <span v-for="item in data.tags" :key="item.name" style="margin: 10px 0;">
                        <el-button type="primary" @click="handleExport">导出代码</el-button>
                        {{ item.name }}
                    </span>
                </div>
            </div>
        </template>
    </icPage>
</template>

<script setup>
import { ref } from "vue"
import { copyToClipboard, message } from '@/utils/tool'
// import KUtils from './utils.js'
import async from 'async'

const data = ref({})
const test = () => {
    fetch('test/api-pack/v3/api-docs', {
        method: 'GET',
    })
        .then(res => res.text()) // 解析为文本
        .then(_data => {
            data.value = JSON.parse(_data)
        })
}

const analysisApiSuccess = (menu) => {
    const list = []
    // 解析paths属性
    if (menu != null && typeof (menu) != 'undefined' && menu != undefined && menu.hasOwnProperty('paths')) {
        var paths = menu['paths'];
        // 是否需要继续追加basePath的标志位
        // true:代表框架已经append，Knife4j无需二次追加
        // false: 代表框架未处理，Knife4j需要二次追加
        var _supportMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'trace', 'head', 'connect'];
        async.forEachOf(paths, function (pathObject, path, callback) {
            // var pathObject=paths[path];
            var apiInfo = null;
            _supportMethods.forEach(function (method) {
                if (pathObject.hasOwnProperty(method)) {
                    apiInfo = pathObject[method];
                    if (apiInfo != null) {
                        list.push({ originalApiInfo: apiInfo, url: path });
                    }
                }
            })
        })
    }
    return list
}

const handleExport = () => {
    const paths = analysisApiSuccess(data.value)
    const pathsObj = {}
    paths.forEach(e => {
        pathsObj[e.url] = { query: e.originalApiInfo.parameters, body: e.originalApiInfo.requestBody }
    })
    debugger
    let json = ''
    const commonPrefixStr = this.getCommonPrefixStr(this.item.children.map(e => e.url))
    this.item.children.forEach(e => {
        const index = e.url.lastIndexOf('/')
        const query = pathsObj[e.url].query
        const body = pathsObj[e.url].body
        //方法名
        const methodsName = e.url.slice(index + 1, e.url.leghth)
        //参数
        const params = (query?.map(e => e.name).join(', ') || '') + (query && body ? ', ' : '') + (body ? 'data' : '')
        //注释
        const annotation = e.name
        //请求方式
        const method = e.method
        //url
        const url = e.url.replace(commonPrefixStr, '')
        const queryPath = query?.map((e, index) => {
            if (index === 0) {
                return '?' + e.name + '=${' + e.name + '}'
            } else {
                return e.name + '=${' + e.name + '}'
            }
        }).join('&')

        json += `  ${methodsName}(${params}) { //${annotation}\n    return http.${method.toLowerCase()}(\`\${prePath}${url}${queryPath || ''}\`${body ? ', data' : ''}).then(res => { return res.data })\n  },\n`
    })
    const path = this.item.path
    const { prefix, suffix } = htttpTemplate(
        path.slice(path.indexOf('(') + 1, path.indexOf(')')) + commonPrefixStr,
        this.item.name
    )
    return prefix + json + suffix
}
const getCommonPrefixStr = (arr) => { //返回url公共前缀字符串
    const newArr = arr.map(e => e.split('/'))
    const firstItem = newArr[0]
    const indexArr = []
    newArr.forEach(e => {
        let maxSameIndex = 0
        for (let i = 0; i < e.length; i++) {
            if (e[i] === firstItem[i]) {
                maxSameIndex += 1
            } else {
                indexArr.push(maxSameIndex)
                break
            }
        }
    })
    const minIndex = Math.min(...indexArr)
    const commonStr = firstItem.splice(0, minIndex).join('/')
    return commonStr
}

</script>

<style lang="scss" scoped>
</style>