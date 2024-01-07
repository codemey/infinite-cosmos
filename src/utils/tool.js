import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-button.css';

// 日期格式化 
export const dateFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date)
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

// 复制到剪切板
export const copyToClipboard = (text) => {
    const el = document.createElement('textarea'); // 创建一个临时的 textarea 元素
    el.value = text; // 设置文本内容
    el.setAttribute('readonly', ''); // 设置为只读以确保在移动设备上呈现虚拟键盘
    el.style.position = 'absolute';
    el.style.left = '-9999px'; // 移出屏幕可视区域
    document.body.appendChild(el); // 将元素添加到 DOM 中
    el.select(); // 选择文本内容
    document.execCommand('copy'); // 执行复制操作
    document.body.removeChild(el); // 复制完成后移除元素
}

// 提示
export const message = ElMessage

// 确认
export const messageBox = ElMessageBox

// 通用查询方法
export const useSearch = (api, form = {}) => {
    const list = ref([])        // 列表数据
    const loading = ref(false)  // 是否加载中
    const total = ref(0)        // 数据总条数

    // 查询
    const doSearch = () => {
        loading.value = true
        api.query(form).then(res => {
            list.value = res.data
            total.value = res.total
        }).finally(() => {
            loading.value = false
        })
    }

    return {
        list,
        loading,
        total,
        doSearch,
    }
}