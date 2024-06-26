import { Request, Response, NextFunction } from "express";
import dashboard from "../../domain/usecases/adimin/dashboard/dashboard";


export default{
    usersListing:async(req:Request, res:Response)=>{
        const response = await dashboard.listUsers(req.body)
        res.status(200).json(response)
        
    },
    vendorsListing:async(req:Request, res:Response)=>{
        const response = await dashboard.listVendors(req.body)
        res.status(200).json(response)
        
    },
    blockorUnblock:async(req:Request, res:Response)=>{
       try {
        const response = await dashboard.blockorUnblock(req.body)
        res.status(200).json(response)
       } catch (error) {
        console.log(error);
        
       }
    },
    blockorUnblockUser :async(req:Request, res:Response)=>{
        try {
            const response = await dashboard.blockorUnblockUser(req.body)
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            
        }
    }
}