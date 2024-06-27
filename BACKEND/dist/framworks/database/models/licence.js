"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Licence = void 0;
const mongoose_1 = require("mongoose");
const licenceSchema = new mongoose_1.Schema({
    applicantName: {
        type: String
    },
    businessName: {
        type: String
    },
    emailAddress: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    secondPhoneNumber: {
        type: String
    },
    upiIdOrPhoneNumber: {
        type: String
    },
    servicesYouChose: {
        type: String
    },
    accountNumber: {
        type: String
    },
    whatWillYouSell: {
        type: String
    },
    certificateExpirationDate: {
        type: String
    },
    licence: {
        type: [String]
    },
    verified: {
        type: Boolean,
        default: false
    }
});
exports.Licence = (0, mongoose_1.model)("Licence", licenceSchema);
