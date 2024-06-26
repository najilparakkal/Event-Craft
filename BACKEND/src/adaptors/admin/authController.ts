import { Request, Response, NextFunction } from "express";
import adminChecker from "../../domain/usecases/adimin/auth/authentication"

export default{
    adminChecking: async (req: Request, res: Response, next: NextFunction) => {
        try {
    
          const response = await adminChecker.login(req.body);
            
          if (response ) {
            res.status(200).json({ status: 200, message: "admin is valid", response });
          } else {
            res.status(201).json({ status: 201, message: "admin is not valid" });
          }
        } catch (error: any) {
          console.error("Login error:", error.message);
          res.status(500).json({ status: 500, message: "Internal server error" });
          next(error);
        }
      },
}