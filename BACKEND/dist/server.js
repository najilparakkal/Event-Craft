"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const userRoutes_1 = __importDefault(require("./webServer/routes/userRoutes"));
const app = (0, express_1.default)();
const port = 3000;
(0, express_2.configureExpress)(app);
app.use(userRoutes_1.default);
app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});
