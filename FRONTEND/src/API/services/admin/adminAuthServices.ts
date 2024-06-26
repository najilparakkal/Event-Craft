import axios, { AxiosInstance } from "axios";
import { authAxiosInstance } from "../AxiosInstance";




export const adminLogin = async (values: any): Promise<boolean> => {
    try {
        const response = await authAxiosInstance.post("admin/login", values);
        if (response.status === 200) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false; 
    }
}

