import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  JwtPayload,
} from "jsonwebtoken";
import JWT from "../../config/jwt";

interface Payload {
  id: string;
  email: string;
  exp?: number;
  isAdmin?: boolean;
}

interface RefreshTokenPayload {
  id: string;
  exp?:any;
}

export const CreateToken = async (
  payload: Payload
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = jwt.sign(payload, JWT.secret, { expiresIn: "7d" });
  const refreshTokenPayload: RefreshTokenPayload = { id: payload.id };
  const refreshToken = jwt.sign(refreshTokenPayload, JWT.refreshSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const VerifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT.secret, (err, decoded) => {
      if (err) {
        const jwtPayload = jwt.decode(token, { complete: true }) as JwtPayload;
        return reject({ err, payload: jwtPayload?.payload });
      }
      resolve(decoded as JwtPayload);
    }); 
  });
};

export const VerifyRefreshToken = (token: string): Promise<RefreshTokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT.refreshSecret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as RefreshTokenPayload);
    });
  });
};