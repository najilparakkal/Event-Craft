import { Login } from "../../../entities/admin/admin";
import { logingadmin } from "../../../repositories/admin/repositories";


export default{
    login: async (data: Login) => {
        try {
          const email = data.email;
          const password = data.password;
          const response = await logingadmin(email, password);
          return response;
        } catch (error) {
          console.log(error);
        }
      }}