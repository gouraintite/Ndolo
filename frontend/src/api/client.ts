import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('ndolo_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ndolo_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default client
