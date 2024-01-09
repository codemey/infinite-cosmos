import { ref } from 'vue'
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-notification.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-button.css';

// 本地缓存
export const cache = {
    set: (table, settings) => {
        const _set = JSON.stringify(settings)
        return localStorage.setItem(table, _set);
    },
    get: (table) => {
        let data = localStorage.getItem(table);
        try {
            data = JSON.parse(data)
        } catch (err) {
            return null
        }
        return data;
    },
    remove: (table) => {
        return localStorage.removeItem(table);
    },
    clear: () => {
        return localStorage.clear();
    }
}

// 日期格式化 
export const dateFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date)
    const o = {
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
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//某月最后一天
export const getLastDayByMonth = (monthDate) => {
    // 创建一个表示下个月第一天的Date对象
    var nextMonth = new Date(monthDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1); // 注意这里加1是因为月份从0开始计数
    nextMonth.setDate(1);

    // 将该Date对象设置为上个月的最后一天
    nextMonth.setDate(nextMonth.getDate() - 1);

    return nextMonth.toLocaleDateString().replace(/\//g, '-')
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

// 以txt格式导出
export const exportTxtFile = (textContent, fileName) => {
    // 创建一个Blob对象，将文本内容放入其中
    const blob = new Blob([textContent], { type: "text/plain" });

    // 创建一个临时的URL，指向该Blob对象
    const url = URL.createObjectURL(blob);

    // 创建一个隐藏的<a>元素，并设置下载属性
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    // 将<a>元素添加到文档中并模拟点击进行下载
    document.body.appendChild(a);
    a.click();

    // 下载完成后移除<a>元素和URL对象
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 提示
export const notification = ElNotification

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