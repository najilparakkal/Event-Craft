import express, { Application } from "express";
import { configureExpress } from "./config/express";
import userRouter from "./webServer/routes/userRoutes";
import morgan from "morgan";
import vendorRouter from "./webServer/routes/vendorRoutes";
import adminRouter from "./webServer/routes/adminRoutes";
import { Server } from "socket.io";
import http from "http";
import socketHandler from "./webServer/socket";
import cookieParser from "cookie-parser";
const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:process.env.ORIGIN,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

configureExpress(app);

app.use(userRouter);
app.use(vendorRouter);
app.use(adminRouter);

socketHandler(io);

server.listen(process.env.PORT, () => {
  console.log(`Backend app listening at http://localhost:${process.env.PORT}`);
});
