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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategory = exports.RegisterWithGoogle = exports.updatePassword = exports.checkingOtp = exports.checkingEmail = exports.logingVendor = exports.updateOtp = exports.checkOtp = exports.RegisterVendor = void 0;
const categorie_1 = require("../../../framworks/database/models/categorie");
const vendor_1 = require("../../../framworks/database/models/vendor");
const chekingVendors_1 = require("../../helpers/chekingVendors");
const jwtGenarate_1 = require("../../helpers/jwtGenarate");
const nodmailer_1 = require("../../helpers/nodmailer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const RegisterVendor = (data, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkVendor = yield (0, chekingVendors_1.checkingVendor)(data);
        if (checkVendor.success) {
            const otp = (0, nodmailer_1.sendOTP)(data.email + "");
            const newVendor = yield vendor_1.Vendors.create({
                vendorName: data.name,
                email: data.email,
                password: hashedPassword,
                phoneNum: data.phoneNum,
                otp: otp,
            });
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: newVendor._id, email: newVendor.email }, true);
            const vendorDetails = {
                id: newVendor._id + "",
                name: newVendor.vendorName + "",
                email: newVendor.email + "",
                phoneNum: newVendor.phoneNum + "",
            };
            return {
                success: true,
                token: token,
                vendorDetails,
                isVendor: newVendor.vendor,
            };
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
const checkOtp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findVendor = yield vendor_1.Vendors.findOneAndUpdate({
            email: data.vendorDetails.email,
        }, { $set: { verified: true } });
        if ((findVendor === null || findVendor === void 0 ? void 0 : findVendor.otp) === data.otp) {
            return { success: true, message: "vendor Found" };
        }
        else {
            return { success: false, message: "Vendor not found" };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkOtp = checkOtp;
const updateOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield vendor_1.Vendors.findOneAndUpdate({ email: email }, {
            $set: {
                otp: otp,
            },
        }, { new: true });
        if (result) {
            console.log("OTP updated successfully for email:", email);
            return true;
        }
        else {
            console.log("No Vendor found with email:", email);
            return false;
        }
    }
    catch (error) {
        console.error("Error updating OTP:", error);
        return false;
    }
});
exports.updateOtp = updateOtp;
const logingVendor = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_1.Vendors.findOne({ email: email, verified: true });
        if (!vendor) {
            console.log("vendor not found");
            return { success: false, message: "vendor not found" };
        }
        if (!password) {
            console.log("No password provided");
            return { success: false, message: "No password provided" };
        }
        if (!vendor.password) {
            console.log("Vendor has no password set");
            return { success: false, message: "Vendor has no password set" };
        }
        const isMatch = yield bcrypt_1.default.compare(password, vendor.password);
        if (isMatch) {
            const vendorDetails = {
                email: vendor.email,
                phoneNum: vendor.phoneNum,
                vendorName: vendor.vendorName,
                id: vendor._id,
                profilePicture: vendor.profilePicture,
            };
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: vendor._id, email: vendor.email }, true);
            return { success: true, token, vendorDetails, isVendor: vendor.vendor };
        }
        else {
            return { success: false, message: "password not match" };
        }
    }
    catch (error) {
        console.error("Error logging in vendor:", error);
        return { success: false, message: "An error occurred during login" };
    }
});
exports.logingVendor = logingVendor;
const checkingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findVendor = yield vendor_1.Vendors.findOne({ email: email });
        if (findVendor) {
            const otp = (0, nodmailer_1.sendOTP)(email);
            yield vendor_1.Vendors.findOneAndUpdate({ email: email }, { $set: { otp: otp } });
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkingEmail = checkingEmail;
const checkingOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email, otp);
        const findVendor = yield vendor_1.Vendors.findOne({ email: email, otp: otp });
        if (findVendor) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkingOtp = checkingOtp;
const updatePassword = (password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield vendor_1.Vendors.findOneAndUpdate({ email: email }, { $set: { password: password } });
        if (update) {
            return { seccess: true, message: " password updated successfully" };
        }
        else {
            return { seccess: false, message: "somthing failed to update" };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePassword = updatePassword;
const RegisterWithGoogle = (data, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyRegistered = yield vendor_1.Vendors.findOne({ email: data.email });
        if (alreadyRegistered) {
            return { success: false, message: "vendor already registered" };
        }
        else {
            const newvendor = yield vendor_1.Vendors.create({
                vendorName: data.name,
                email: data.email,
                password: hashedPassword,
                verified: true,
            });
            const vendorDetails = {
                id: newvendor._id + "",
                email: newvendor.email + "",
                phoneNum: newvendor.phoneNum + "",
                name: newvendor.vendorName + "",
            };
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: newvendor._id, email: newvendor.email }, true);
            return {
                success: true,
                message: "vendor registered successfully",
                token,
                vendorDetails,
                isVendor: newvendor.vendor,
            };
        }
    }
    catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred during registration" };
    }
});
exports.RegisterWithGoogle = RegisterWithGoogle;
const listCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categorie_1.Categories.find();
        return category;
    }
    catch (error) {
        console.log(error);
    }
});
exports.listCategory = listCategory;
