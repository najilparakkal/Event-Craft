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
const awsConfig_1 = require("../../../config/awsConfig");
const categorie_1 = require("../../../framworks/database/models/categorie");
const licence_1 = require("../../../framworks/database/models/licence");
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
    }),
    categoryAdding: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkCategory = yield categorie_1.Categories.findOne({ name: data.name });
            if (checkCategory) {
                return { success: false, message: "Category not found" };
            }
            else {
                const url = yield (0, awsConfig_1.uploadImage)(data.image.filepath);
                console.log(url, "❌");
                const newCategory = yield categorie_1.Categories.create({
                    name: data.name,
                    image: url,
                });
                return {
                    success: false,
                    message: "Category Created successfully",
                    newCategory,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    listCategory: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield categorie_1.Categories.find();
            return { success: true, data: categories };
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            return { success: false, message: "Failed to fetch categories", error };
        }
    }),
    updateCategory: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const update = yield categorie_1.Categories.findByIdAndDelete(_id);
            if (update) {
                return { success: true };
            }
            else {
                return { success: false };
            }
        }
        catch (error) {
            console.error("Error in dashRepositories.updateCategory:", error);
            throw error;
        }
    }),
    addRequest: (datas, images) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePaths = images['licenseOrCertificates[]'].map(file => (0, awsConfig_1.uploadImage)(file.filepath));
            const uploadResults = yield Promise.all(filePaths);
            // console.log(uploadResults,"🏫");
            const createDb = yield licence_1.Licence.create({
                applicantName: datas.applicantName[0],
                businessName: datas.businessName[0],
                certificateExpirationDate: datas.certificateExpirationDate[0],
                emailAddress: datas.emailAddress[0],
                phoneNumber: datas.phoneNumber[0],
                secondPhoneNumber: datas.phoneNumber2[0],
                upiIdOrPhoneNumber: datas.upiIdOrPhoneNumber[0],
                accountNumber: datas.accountNumber[0],
                servicesYouChose: datas.servicesYouChose[0],
                whatWillYouSell: datas.whatWillYouSell[0],
                licence: uploadResults
            });
            console.log(createDb, "🍽️🍽️🍽️");
        }
        catch (error) {
            console.log(error);
        }
    }),
};
