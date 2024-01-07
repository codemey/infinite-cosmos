import axios from 'axios'
const prePath = '/report-management'
axios.defaults.baseURL = '/api'

export default {

    findAll: (data) => axios.get(`${prePath}`, { params: data }).then(res => res.data),

    query: (data) => axios.post(`${prePath}/query`, data).then(res => res.data),

    delete: (id) => axios.delete(`${prePath}/${id}`).then(res => res.data),

    save: (data) => {
        if (data.id) {
            return axios.patch(`${prePath}/${data.id}`, data).then(res => res.data)
        } else {
            return axios.post(`${prePath}`, data).then(res => res.data)
        }
    },

    getById: (id) => axios.get(`${prePath}/${id}`).then(res => res.data),

}