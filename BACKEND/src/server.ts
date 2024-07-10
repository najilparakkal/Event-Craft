import express, { Application } from 'express';
import { configureExpress } from './config/express';
import userRouter from './webServer/routes/userRoutes';
import session from 'express-session';
import morgan from "morgan";
import vendorRouter from './webServer/routes/vendorRoutes';
import adminRouter from './webServer/routes/adminRoutes';
import { Server } from 'socket.io';
import http from 'http';
import socketHandler from './webServer/socket';

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

const port = 3000;

app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(morgan("dev"));

configureExpress(app);

app.use(userRouter);
app.use(vendorRouter);
app.use(adminRouter);

socketHandler(io);

server.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});
