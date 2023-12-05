import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.API_EXTERNAL_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_EXTERNAL_TOKEN}`
  }
})
