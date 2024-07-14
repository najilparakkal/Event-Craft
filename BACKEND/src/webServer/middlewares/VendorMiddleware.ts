import { RequestHandler } from "express";
import { VerifyToken } from "../../domain/helpers/jwtGenarate";

const vendorAuth:RequestHandler =async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split("Bearer ")[1]
        const verifyToken = await VerifyToken(token+"")
        console.log(verifyToken);
        
        if( verifyToken ) {
            if (verifyToken.exp) {
                
            } else {
                
            }
        } else {

        }
        next()
    } catch (error) {
        console.log(error);
        
    }
}

export default vendorAuth; 