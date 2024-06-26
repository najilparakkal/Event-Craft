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
const user_1 = require("../../../framworks/database/models/user");
const vendor_1 = require("../../../framworks/database/models/vendor");
exports.default = {
    listUsers: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let users;
            switch (data.list) {
                case "ascending":
                    users = yield user_1.Users.find().sort({ userName: 1 });
                    break;
                case "descending":
                    users = yield user_1.Users.find().sort({ userName: -1 });
                    break;
                case "notVerified":
                    users = yield user_1.Users.find({ blocked: false });
                    break;
                case "verified":
                    users = yield user_1.Users.find({ blocked: true });
                    break;
                case "date":
                    users = yield user_1.Users.find().sort({ registered: 1 });
                    break;
                default:
                    users = yield user_1.Users.find();
                    break;
            }
            return users;
        }
        catch (error) {
            console.log(error);
        }
    }),
    listVendors: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let vendors;
            switch (data.list) {
                case "ascending":
                    vendors = yield vendor_1.Vendors.find().sort({ vendorName: 1 });
                    break;
                case "descending":
                    vendors = yield vendor_1.Vendors.find().sort({ vendorName: -1 });
                    break;
                case "notVerified":
                    vendors = yield vendor_1.Vendors.find({ blocked: false });
                    break;
                case "verified":
                    vendors = yield vendor_1.Vendors.find({ blocked: true });
                    break;
                case "date":
                    vendors = yield vendor_1.Vendors.find().sort({ registered: 1 });
                    break;
                default:
                    vendors = yield vendor_1.Vendors.find();
                    break;
            }
            return vendors;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBlock: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendor = yield vendor_1.Vendors.findById(data.id);
            if (vendor) {
                return yield vendor_1.Vendors.findByIdAndUpdate(data.id, { $set: { blocked: !vendor.blocked } }, { new: true });
            }
            else {
                console.log("Vendor not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.Users.findById(data.id);
            if (user) {
                return yield user_1.Users.findByIdAndUpdate(data.id, { $set: { blocked: !user.blocked } }, { new: true });
            }
            else {
                console.log("User not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
