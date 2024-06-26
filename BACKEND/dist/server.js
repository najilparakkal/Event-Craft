"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const userRoutes_1 = __importDefault(require("./webServer/routes/userRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const vendorRoutes_1 = __importDefault(require("./webServer/routes/vendorRoutes"));
const adminRoutes_1 = __importDefault(require("./webServer/routes/adminRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use((0, morgan_1.default)("dev"));
(0, express_2.configureExpress)(app);
app.use(userRoutes_1.default);
app.use(vendorRoutes_1.default);
app.use(adminRoutes_1.default);
app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});
