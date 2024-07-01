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
const postRepo_1 = require("../../../repositories/vendor/postRepo");
exports.default = {
    categories: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, postRepo_1.listCategory)();
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    uploadPost: (data, image) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, postRepo_1.uploadPost)(data, image);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    })
};
