import { uploadImage } from "../../../config/awsConfig";
import { Services } from "../../../framworks/database/models/services";
import { Posts } from "../../../framworks/database/models/post";
import { IPostDetails } from "../../entities/vendor/vendor";
import { Vendors } from "../../../framworks/database/models/vendor";

export const listCategory = async () => {
  try {
    const category = await Services.find();
    return category;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = async (data: IPostDetails, images: any) => {
  try {
    const filePaths = images["postDetails[image]"].map((file: any) =>
      uploadImage(file.filepath)
    );
    const uploadResults = await Promise.all(filePaths);

    const newPost = await Posts.create({
      title: data["postDetails[title]"][0],
      description: data["postDetails[description]"][0],
      category: data["postDetails[category]"][0],
      images: uploadResults,
      vendorId: data.id[0],
    });
    console.log(newPost,"🎶🎶");
    
    await Vendors.findByIdAndUpdate(data.id[0], {
      $addToSet: { posts: newPost._id },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
