import { RequestHandler } from "express";
import {
  CreateToken,
  VerifyRefreshToken,
  VerifyToken,
} from "../../domain/helpers/jwtGenarate";
import { Vendors } from "../../framworks/database/models/vendor";

const vendorAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    
    VerifyToken(token)
      .then((payload) => {
        return next();
      })
      .catch(async ({ err, payload }) => {
        if (err.name === "TokenExpiredError") {
          const data = await Vendors.findById(payload.id);
          if (!data) {
            return res.status(401).json({ error: "User not found" });
          }

          VerifyRefreshToken(data.refreshToken+"")
            .then(async (refreshTokenPayload) => {
                const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60)
              if (refreshTokenPayload.exp < sevenDaysAgo) {
                console.log("Refresh token expired");
                return res.status(401).json({ error: "Refresh token expired" });
              } else {
                console.log("Refresh token not expired");
                const { accessToken } = await CreateToken({
                  email: payload.email,
                  id: payload.id,
                });

                return res.status(203).json({ accessToken });
              }
            })
            .catch((refreshTokenErr) => {
              console.log("Invalid refresh token", refreshTokenErr);
              return res.status(401).json({ error: "Invalid refresh token" });
            });
        } else {
          return res.status(401).json({ error: "Invalid token" });
        }
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default vendorAuth;