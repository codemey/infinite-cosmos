// 自动化导出
const modulesFiles = import.meta.glob('./*.js', { eager: true }); // 异步方式

const modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
    const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
    modules[moduleName] = {}
    for (const functionName in value) {
        modules[moduleName][functionName] = value[functionName]
    }
}

export default modules
// export const { tool, useSearch } = modules