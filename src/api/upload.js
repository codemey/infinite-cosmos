import http from "@/utils/request"
const prePath = '/upload'

export default {
    query: (data) => http.post(`${prePath}/query`, data).then(res => res.data),
}