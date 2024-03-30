import http from "@/utils/request_aliyun"
const prePath = '/adrive/v1.0/openFile'

export default {
    // 获取文件列表
    list: (data) => http.post(`${prePath}/list`, data),
    // 获取文件详情
    get: (data) => http.post(`${prePath}/get`, data),
    // 获取文件播放详情
    getVideoPreviewPlayInfo: (data) => http.post(`${prePath}/getVideoPreviewPlayInfo`, data),
    // 获取文件播放元数据
    getVideoPreviewPlayMeta: (data) => http.post(`${prePath}/getVideoPreviewPlayMeta`, data),
}