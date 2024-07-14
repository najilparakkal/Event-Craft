"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const userRoutes_1 = __importDefault(require("./webServer/routes/userRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const vendorRoutes_1 = __importDefault(require("./webServer/routes/vendorRoutes"));
const adminRoutes_1 = __importDefault(require("./webServer/routes/adminRoutes"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./webServer/socket"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});
const port = 3000;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
(0, express_2.configureExpress)(app);
app.use(userRoutes_1.default);
app.use(vendorRoutes_1.default);
app.use(adminRoutes_1.default);
(0, socket_1.default)(io);
server.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});
