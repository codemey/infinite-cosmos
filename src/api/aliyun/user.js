import http from "@/utils/request_aliyun"
const prePath = '/adrive/v1.0/user'

export default {
    // 获取用户drive信息
    getDriveInfo: () => http.post(`${prePath}/getDriveInfo`),
}