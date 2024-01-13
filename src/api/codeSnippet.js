import http from "@/utils/request"
const prePath = '/code-snippet'

export default {

    findAll: (data) => http.get(`${prePath}`, { params: data }).then(res => res.data),

    query: (data) => http.post(`${prePath}/query`, data).then(res => res.data),

    delete: (data) => http.delete(`${prePath}/${data.id}`).then(res => res.data),

    save: (data) => {
        if (data.id) {
            return http.patch(`${prePath}/${data.id}`, data).then(res => res.data)
        } else {
            return http.post(`${prePath}`, data).then(res => res.data)
        }
    },
}