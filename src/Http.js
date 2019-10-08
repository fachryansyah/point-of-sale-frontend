import Axios from 'axios'

const axiosInstance = Axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`
})

const token = localStorage.getItem("apiToken")
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axiosInstance
