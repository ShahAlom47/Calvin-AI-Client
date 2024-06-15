

import axios from "axios";
import { useNavigate } from "react-router-dom";

import {  useEffect } from "react";
import useUser from "./useUser";








const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
//   baseURL: 'https://assignment-12-server-rho-eight.vercel.app',
  withCredentials: true,
});

const useAxios = () => {
  const {logOutUser} =useUser()
 
  const navigate = useNavigate()


  useEffect(() => {

    axiosSecure.interceptors.request.use(function (config) {
      const token= localStorage.getItem('token')
      config.headers.authorization=`bearer ${token}`
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      const status= error.response?.status
      if(status===401|| status===403){
        logOutUser()
        .then(()=>{
          navigate('/login')
        })
        
      }
      return Promise.reject(error);
    });
  
  }, [navigate,logOutUser])
  return axiosSecure
};

export default useAxios;