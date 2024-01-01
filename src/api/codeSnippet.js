import axios from 'axios'

axios.defaults.baseURL = '/api'

export default {

    findAll: (data) => axios.get('/code-snippet', { params: data }).then(res => res.data),

    query: (data) => axios.post('/code-snippet/query', data).then(res => res.data),

    delete: (data) => axios.delete(`/code-snippet/${data.id}`).then(res => res.data),

    save: (data) => {
        if (data.id) {
            return axios.patch(`/code-snippet/${data.id}`, data).then(res => res.data)
        } else {
            return axios.post('/code-snippet', data).then(res => res.data)
        }
    },
}