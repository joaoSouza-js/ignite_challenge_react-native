import { AppError } from "@utils/AppError";
import Axios, { isAxiosError } from "axios";

export const api = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    
})

api.interceptors.response.use(response => response, (responseError) => {  
    if (isAxiosError(responseError) &&  responseError.response && responseError.response.data ){
        return Promise.reject(new AppError(responseError.response.data.message, responseError.response.status))
    }

    return Promise.reject(responseError) 
})