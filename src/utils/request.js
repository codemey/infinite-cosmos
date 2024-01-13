import axios from 'axios';
// import sysConfig from "@/config";
import { notification } from '@/utils/tool';

axios.defaults.baseURL = '/api'

axios.defaults.timeout = 10000

// HTTP request 拦截器
axios.interceptors.request.use(
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
axios.interceptors.response.use(
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
            axios({
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
            axios({
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
            axios({
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
            axios({
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
            axios({
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
     * @param  {string} name JSONP回调函数名称
     */
    jsonp: function (url, name = 'jsonp') {
        return new Promise((resolve) => {
            var script = document.createElement('script')
            var _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
            script.id = _id
            script.type = 'text/javascript'
            script.src = url
            window[name] = (response) => {
                resolve(response)
                document.getElementsByTagName('head')[0].removeChild(script)
                try {
                    delete window[name];
                } catch (e) {
                    window[name] = undefined;
                }
            }
            document.getElementsByTagName('head')[0].appendChild(script)
        })
    }
}

export default http;
