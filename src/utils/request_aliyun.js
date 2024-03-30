import axios from 'axios';
// import sysConfig from "@/config";
import { notification } from '@/utils/tool';
import { cache } from '@/utils/tool'

const axios_aliyun = axios.create({
    baseURL: '/api-aliyun'
});

axios_aliyun.defaults.timeout = 10000

// HTTP request 拦截器
axios_aliyun.interceptors.request.use(
    (config) => {
        const aliyun_token = cache.get("aliyun_token")
        if (aliyun_token) {
            config.headers['Authorization'] = aliyun_token.token_type + ' ' + aliyun_token.access_token
        }
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
axios_aliyun.interceptors.response.use(
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
            axios_aliyun({
                method: 'get',
                url: url,
                params: params,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
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
            axios_aliyun({
                method: 'post',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
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
            axios_aliyun({
                method: 'put',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
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
            axios_aliyun({
                method: 'patch',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
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
            axios_aliyun({
                method: 'delete',
                url: url,
                data: data,
                ...config
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
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
