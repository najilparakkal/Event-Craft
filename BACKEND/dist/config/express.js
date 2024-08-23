"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureExpress = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors = require("cors");
const database_1 = require("./database");
const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};
function configureExpress(app) {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(cors(corsOptions));
    app.use((0, express_session_1.default)({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }));
    const errorHandler = (err, req, res, next) => {
        console.log(err.stack);
        res.status(500).json({ err: err.message });
    };
    app.use(errorHandler);
    (0, database_1.connectDb)();
}
exports.configureExpress = configureExpress;
