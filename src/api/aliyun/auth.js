import config from "@/config"
import http from "@/utils/request_aliyun"
const prePath = '/oauth'

export default {
    // 获取授权二维码
    getQrcode: () => http.post(`${prePath}/authorize/qrcode`, config.aliyun_config),
    // 获取二维码图片
    getQrcodeImg: (sid) => http.get(`${prePath}/qrcode/${sid}`),
    // 获取二维码登录状态
    getQrcodeStatus: (sid) => http.get(`${prePath}/qrcode/${sid}/status`),
    // 根据授权 code 获取 access_token
    getAccessToken: (code) => http.post(`${prePath}/access_token`, {
        client_id: config.aliyun_config.client_id,
        client_secret: config.aliyun_config.client_secret,
        grant_type: "authorization_code",//refresh_token,刷新access_token
        code
    }),
    // 获取用户信息
    getUserInfo: () => http.get(`${prePath}/users/info`),
}