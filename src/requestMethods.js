import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.interceptors.request.use(function (config){
    config.headers.token = `Bearer ${localStorage.getItem("TOKEN")}`;
    return config;
})
const BASE_URL = "http://localhost:5000/api/";
//https://e-bookstore-api.vercel.app
export const publicRequest = axios.create ({
    baseURL:BASE_URL,
})
export const userRequest = axios.create ({
    baseURL:BASE_URL,
})
