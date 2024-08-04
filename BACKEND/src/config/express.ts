import { Application, ErrorRequestHandler } from "express";
import bodyParser from "express";
import session from "express-session";
const cors = require("cors");
import { connectDb } from "./database";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, 
};

declare module "express-session" {
  interface SessionData {
    otp?: string;
    email: string;
  }
}

export function configureExpress(app: Application): void {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors(corsOptions)); 
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ err: err.message });
  };
  app.use(errorHandler);
  connectDb();    
}
