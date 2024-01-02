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