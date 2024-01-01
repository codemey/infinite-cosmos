import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as icons from './components/icon'
import hljs from 'highlight.js';
// 引入Highlight.js的样式文件（选择你喜欢的样式）
import 'highlight.js/styles/atom-one-light.css';


const app = createApp(App);
app.use(router);
app.directive('highlight', function (el) {
    hljs.highlightBlock(el)
})

//统一注册icon图标
for (let icon in icons) {
    app.component(`Icon${icon}`, icons[icon])
}
app.mount('#app')