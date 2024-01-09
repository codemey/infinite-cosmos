import http from "@/utils/request"
// import axios from 'axios'
const prePath = '/report-management'
// axios.defaults.baseURL = '/api'

export default {

    findAll: (data) => http.get(`${prePath}`, data).then(res => res.data),

    query: (data) => http.post(`${prePath}/query`, data).then(res => res.data),

    list: (data) => http.post(`${prePath}/list`, data).then(res => res.data),

    delete: (id) => http.delete(`${prePath}/${id}`).then(res => res.data),

    save: (data) => {
        if (data.id) {
            return http.patch(`${prePath}/${data.id}`, data).then(res => res.data)
        } else {
            return http.post(`${prePath}`, data).then(res => res.data)
        }
    },

    getById: (id) => http.get(`${prePath}/${id}`).then(res => res.data),
}