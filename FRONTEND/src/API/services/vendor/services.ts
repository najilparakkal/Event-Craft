import { LicenseFormValues } from "../../../utils/validations/initialValue";
import { authAxiosInstance } from "../AxiosInstance";





export const uploadRequest = async (values: LicenseFormValues,id:string) => {
    try {
        const data ={
            values,
            id
        }
     const response =  await authAxiosInstance.put("admin/addRequest", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.status
    } catch (error) {
      console.log(error);
    }
  };