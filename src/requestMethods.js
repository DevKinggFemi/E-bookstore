import axios from "axios";
axios.defaults.baseURL = "https://e-bookstore-api.vercel.app/api/";
axios.interceptors.request.use(function (config){
    config.headers.token = `Bearer ${localStorage.getItem("TOKEN")}`;
    return config;
})
const BASE_URL = "https://e-bookstore-api.vercel.app/api/";

export const publicRequest = axios.create ({
    baseURL:BASE_URL,
})
export const userRequest = axios.create ({
    baseURL:BASE_URL,
})
