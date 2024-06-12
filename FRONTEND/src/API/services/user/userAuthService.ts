import axios,{AxiosInstance,AxiosResponse} from "axios";

import {CONFIG_KEY} from "../../../config"



interface userData{
    name:string;
    email:string;
    phoneNum:string;
    password:string;
}


interface authResponse {
    status:number;
    massage:string;
}
const authAxiosInstance :AxiosInstance = axios.create({
    baseURL:CONFIG_KEY.BASE_URI,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true
})

console.log(authAxiosInstance)

export const userRegister = async(endpiont:string,userData:userData) =>{
    console.log(userData,endpiont);
    
        const response = await authAxiosInstance.post(`${endpiont}`,userData,)
        console.log(response,"response");
        return response.data
}

