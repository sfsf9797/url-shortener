import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/url',
})

export const shortenUrl = payload => api.post(`/shorten`, payload)


const apis = {
    shortenUrl
}

export default apis
