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
        'Content': 'application/json'
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
}, function(error){
    return Promise.reject(error);
})

adminApi.interceptors.response.use(function (response) {
 

    return response;
  }, function (error) {

    

    if (error.response.status == 401) {
        router.push({ path: "/login" });

        // this.$swal({
        //     icon: 'error',
        //     title: 'Oops.. apareceu um poblema!!',
        //     text: `Error ${error.response.status}`,
        // });
    }

    return Promise.reject(error);
  });

