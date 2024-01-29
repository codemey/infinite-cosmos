// 百度通用翻译
import http from "@/utils/request"
import MD5 from "@/utils/md5"

const appid = '20240126001951543'
const key = '20hVcP_AoJQS3AA6IMof'
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'

export default {
    // 通用翻译
    normalTranslate: (_q, from = 'en', to = 'zh') => {
        const q = encodeURIComponent(_q)
        const salt = new Date().getTime()
        const sign = MD5(appid + _q + salt + key)

        return http.jsonp('https://fanyi-api.baidu.com/api/trans/vip/translate', { q, appid, salt, from, to, sign }).then(res => {
            return res.trans_result.map(e => e.dst).join('\n')
        })
    },
    // 语种检测 
    langdetect: (_q) => {
        const q = encodeURIComponent(_q)
        const salt = new Date().getTime()
        const sign = MD5(appid + _q + salt + key)

        return http.jsonp('https://fanyi-api.baidu.com/api/trans/vip/language', { q, appid, salt, sign }).then(res => {
            return res.data.src
        })
    }
}