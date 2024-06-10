import { Request,Response,NextFunction } from "express";
import userInterator from "../domain/usecases//auth/authentication"


export default{
    userRegistration: async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            
          const { name, email,password } = req.body;
          console.log(name, email,password,"😂😂😂😂😂");
          
          const user = await userInterator.registerUser(req.body);
          if (user) {
            res
              .status(200)
              .json({ message: "User registered successfully", user });
          } else {
            res.status(400).json({ message: "User registration failed" });
          }
        } catch (error: any) {
          console.error(error.message);
          res.status(400).json({ error: error.message });
          next(error);
        }
      }
      
}