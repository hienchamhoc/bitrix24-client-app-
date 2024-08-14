import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios' // { InternalAxiosRequestConfig }

const intranetAxiosClient = axios.create({
  baseURL: process.env.INTRANET_DOMAIN,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})


const handleAxiosClient = axios.create({
  baseURL: process.env.HANDLE_DOMAIN,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

const currentAxiosClient = axios.create({
  // baseURL: process.env.HANDLE_DOMAIN,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

export {intranetAxiosClient, handleAxiosClient, currentAxiosClient}
