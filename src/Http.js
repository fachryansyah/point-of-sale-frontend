import Axios from 'axios'

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:1337/api/v1'
})

const token = localStorage.getItem("apiToken")
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axiosInstance
