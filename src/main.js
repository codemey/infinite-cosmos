import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as icons from './components/icon'

const app = createApp(App);
app.use(router);

//统一注册icon图标
for (let icon in icons) {
    app.component(`Icon${icon}`, icons[icon])
}

app.mount('#app')