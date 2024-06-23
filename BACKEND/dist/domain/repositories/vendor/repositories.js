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
exports.RegisterVendor = void 0;
const vendor_1 = require("../../../framworks/database/models/vendor");
const chekingVendors_1 = require("../../helpers/chekingVendors");
const jwtGenarate_1 = require("../../helpers/jwtGenarate");
const nodmailer_1 = require("../../helpers/nodmailer");
const RegisterVendor = (data, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkVendor = yield (0, chekingVendors_1.checkingVendor)(data);
        if (checkVendor.success) {
            const otp = yield (0, nodmailer_1.sendOTP)(data.email + "");
            const newVendor = yield vendor_1.Vendors.create({
                userName: data.name,
                email: data.email,
                password: hashedPassword,
                phoneNum: data.phoneNum,
                otp: {
                    value: otp,
                }
            });
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: newVendor._id, email: newVendor.email }, true);
            const vendorDetails = {
                id: newVendor._id + "",
                name: newVendor.userName + "",
                email: newVendor.email + "",
                phoneNum: newVendor.phoneNum + ""
            };
            return { success: true, token: token, vendorDetails };
        }
        else {
            return { success: false, message: checkVendor.message };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.RegisterVendor = RegisterVendor;
