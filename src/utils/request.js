import axios from 'axios';
// import sysConfig from "@/config";
import { notification, loading } from '@/utils/tool';
const axios_common = axios.create({
    baseURL: '/api'
});

axios_common.defaults.timeout = 10000

// HTTP request 拦截器
axios_common.interceptors.request.use(
    (config) => {
        // let token = tool.cookie.get("TOKEN");
        // if(token){
        // 	config.headers[sysConfig.TOKEN_NAME] = sysConfig.TOKEN_PREFIX + token
        // }
        // if(!sysConfig.REQUEST_CACHE && config.method == 'get'){
        // 	config.params = config.params || {};
        // 	config.params['_'] = new Date().getTime();
        // }
        // Object.assign(config.headers, sysConfig.HEADERS)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//FIX 多个API同时401时疯狂弹窗BUG
let MessageBox_401_show = false

// HTTP response 拦截器
axios_common.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        notification({
            title: '请求错误',
            message: error.response.data.message,
            type: 'error',
        })
        return Promise.reject(error.response);
    }
);

var http = {

    /** get 请求
     * @param  {string} url 接口地址
     * @param  {object} params 请求参数
     * @param  {object} config 参数
     */
    get: function (url, params = {}, config = {}) {
        return new Promise((resolve, reject) => {
            loading.value = true
            axios_common({
                method: 'get',
                url: url,
                params: params,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                loading.value = false
            })
        })
    },

    /** post 请求
     * @param  {string} url 接口地址
     * @param  {object} data 请求参数
     * @param  {object} config 参数
     */
    post: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            loading.value = true
            axios_common({
                method: 'post',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                loading.value = false
            })
        })
    },

    /** put 请求
     * @param  {string} url 接口地址
     * @param  {object} data 请求参数
     * @param  {object} config 参数
     */
    put: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            loading.value = true
            axios_common({
                method: 'put',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                loading.value = false
            })
        })
    },

    /** patch 请求
     * @param  {string} url 接口地址
     * @param  {object} data 请求参数
     * @param  {object} config 参数
     */
    patch: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            loading.value = true
            axios_common({
                method: 'patch',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                loading.value = false
            })
        })
    },

    /** delete 请求
     * @param  {string} url 接口地址
     * @param  {object} data 请求参数
     * @param  {object} config 参数
     */
    delete: function (url, data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            loading.value = true
            axios_common({
                method: 'delete',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                loading.value = false
            })
        })
    },

    /** jsonp 请求
     * @param  {string} url 接口地址
     * @param  {Object} params 参数对象
     */
    jsonp: function (url, params) {
        return new Promise((resolve, reject) => {
            window.callback = function (data) {
                resolve(data) // 将data传给promise的then
                document.body.removeChild(script)
            }
            const arrs = []
            for (let key in params) {
                arrs.push(`${key}=${params[key]}`)
            }

            let script = document.createElement('script')
            script.src = `${url}?${arrs.join('&')}&cb=callback`
            document.body.appendChild(script)
        })
    }
    // jsonp: function (url, name = 'jsonp') {
    //     return new Promise((resolve) => {
    //         var script = document.createElement('script')
    //         var _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
    //         script.id = _id
    //         script.type = 'text/javascript'
    //         script.src = url
    //         window[name] = (response) => {
    //             resolve(response)
    //             document.getElementsByTagName('head')[0].removeChild(script)
    //             try {
    //                 delete window[name];
    //             } catch (e) {
    //                 window[name] = undefined;
    //             }
    //         }
    //         document.getElementsByTagName('head')[0].appendChild(script)
    //     })
    // }
}

export default http;
