import jwt, { JsonWebTokenError } from "jsonwebtoken";
import JWT from "../../config/jwt";
interface payload {
  id: string;
  email: string;
  rememberMe: boolean;
}
export const CreateToken: Function = async (
  payload: payload,
  remember: boolean
): Promise<string> => {
  return jwt.sign(payload, JWT.secret, {
    expiresIn: remember ? JWT.remember : JWT.exp,
  });
};

export const VerifyToken: Function = async (token:string): Promise<payload | string> => {
    jwt.verify(token, JWT.secret,(err:JsonWebTokenError | null,payload)=>{
        if(err){
            if(err.message === "TokenExpirationError") {
                return "Session Expired"
            } else {
                return "Invalid Credentials"
            }
        }
        return payload
    });
    return ""
}
