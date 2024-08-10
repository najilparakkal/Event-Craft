import { Login } from "../../../entities/admin/admin";
import { logingadmin } from "../../../repositories/admin/repositories";


export default{
    login: async (data: Login) => {
        try {
          const email = data.email;
          const password = data.password;
          return await logingadmin(email, password);
        } catch (error) {
          console.log(error);
        }
      }}