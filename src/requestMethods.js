
import axios from "axios";

const TOKEN = localStorage.getItem('TOKEN');
const BASE_URL = "https://e-bookstore-server-side.vercel.app/api/";


export const publicRequest = axios.create ({
    baseURL:BASE_URL,
})
export const userRequest = axios.create ({
    baseURL:BASE_URL,
 header :{ token: `Bearer ${TOKEN}`},
       
})