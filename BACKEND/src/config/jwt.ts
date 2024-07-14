interface JWTInterface {
  secret: string;
  exp: string;
  refreshSecret:string
  remember: string;
  refreshExp:string
}

const JWT = <JWTInterface>{
  exp: process.env.EXPIRY || "1d",
  remember: process.env.REMEMBER || "7d",
  secret: process.env.JWT_SECRET || "",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "your_refresh_secret",
  refreshExp: process.env.REMEMBER || "7d",
};

export default JWT;   
