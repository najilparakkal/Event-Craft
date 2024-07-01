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
const licence_1 = require("../../../framworks/database/models/licence");
const vendor_1 = require("../../../framworks/database/models/vendor");
exports.default = {
    addRequest: (datas, images) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePaths = images["values[licenseOrCertificates][0]"].map((file) => (0, awsConfig_1.uploadImage)(file.filepath));
            const uploadResults = yield Promise.all(filePaths);
            const profilePicture = yield (0, awsConfig_1.uploadImage)(images["values[profileImage]"][0].filepath);
            const createDb = yield licence_1.Licence.create({
                applicantName: datas["values[applicantName]"][0],
                businessName: datas["values[businessName]"][0],
                certificateExpirationDate: datas["values[certificateExpirationDate]"][0],
                emailAddress: datas["values[emailAddress]"][0],
                phoneNumber: datas["values[phoneNumber]"][0],
                secondPhoneNumber: datas["values[phoneNumber2]"][0],
                upiIdOrPhoneNumber: datas["values[upiIdOrPhoneNumber]"][0],
                accountNumber: datas["values[accountNumber]"][0],
                services: datas["values[servicesYouChose]"][0],
                description: datas["values[whatWillYouSell]"][0],
                licence: uploadResults,
                vendorId: datas.id[0],
                profilePicture: profilePicture,
            });
            yield vendor_1.Vendors.findByIdAndUpdate({ _id: datas.id[0] }, { $set: { vendor: true, profilePicture: profilePicture } });
            if (createDb) {
                return { success: true, message: "Request created successfully" };
            }
            else {
                return { success: false, message: "something went wrong" };
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
