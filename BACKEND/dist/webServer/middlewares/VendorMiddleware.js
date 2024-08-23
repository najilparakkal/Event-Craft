"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtGenarate_1 = require("../../domain/helpers/jwtGenarate");
const vendor_1 = require("../../framworks/database/models/vendor");
const vendorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }
        (0, jwtGenarate_1.VerifyToken)(token)
            .then((payload) => {
            return next();
        })
            .catch((_b) => __awaiter(void 0, [_b], void 0, function* ({ err, payload }) {
            if (err.name === "TokenExpiredError") {
                const data = yield vendor_1.Vendors.findById(payload.id);
                if (!data) {
                    return res.status(401).json({ error: "User not found" });
                }
                (0, jwtGenarate_1.VerifyRefreshToken)(data.refreshToken + "")
                    .then((refreshTokenPayload) => __awaiter(void 0, void 0, void 0, function* () {
                    const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
                    if (refreshTokenPayload.exp < sevenDaysAgo) {
                        console.log("Refresh token expired");
                        return res.status(401).json({ error: "Refresh token expired" });
                    }
                    else {
                        console.log("Refresh token not expired");
                        const { accessToken } = yield (0, jwtGenarate_1.CreateToken)({
                            email: payload.email,
                            id: payload.id,
                        });
                        return res.status(203).json({ accessToken });
                    }
                }))
                    .catch((refreshTokenErr) => {
                    console.log("Invalid refresh token", refreshTokenErr);
                    return res.status(401).json({ error: "Invalid refresh token" });
                });
            }
            else {
                return res.status(401).json({ error: "Invalid token" });
            }
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = vendorAuth;
