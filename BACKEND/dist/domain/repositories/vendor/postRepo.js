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
exports.uploadPost = exports.listCategory = void 0;
const awsConfig_1 = require("../../../config/awsConfig");
const services_1 = require("../../../framworks/database/models/services");
const post_1 = require("../../../framworks/database/models/post");
const vendor_1 = require("../../../framworks/database/models/vendor");
const listCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield services_1.Services.find();
        return category;
    }
    catch (error) {
        console.log(error);
    }
});
exports.listCategory = listCategory;
const uploadPost = (data, images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePaths = images["postDetails[image]"].map((file) => (0, awsConfig_1.uploadImage)(file.filepath));
        const uploadResults = yield Promise.all(filePaths);
        const newPost = yield post_1.Posts.create({
            title: data["postDetails[title]"][0],
            description: data["postDetails[description]"][0],
            category: data["postDetails[category]"][0],
            images: uploadResults,
            vendorId: data.id[0],
        });
        console.log(newPost, "🎶🎶");
        yield vendor_1.Vendors.findByIdAndUpdate(data.id[0], {
            $addToSet: { posts: newPost._id },
        });
        return { success: true };
    }
    catch (error) {
        console.log(error);
    }
});
exports.uploadPost = uploadPost;
