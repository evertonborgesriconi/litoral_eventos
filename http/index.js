import axios from 'axios';
import router from "@/router";
export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers:{
        'Accept' : 'application/json',
        'Content' : 'application/json'
    }
})

export const adminApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers:{
        'Accept' : 'application/json',
        'Content' : 'application/json'
    }
})

adminApi.interceptors.request.use(function (config) {
     
    const token = sessionStorage.getItem('token')

     if(token){
         config.headers.Authorization = `Bearer ${token}`;
     }else{
        router.push({ path: "/login" });
     }
   

    return config;
}, function(erro){

    return Promise.reject(erro)
})

