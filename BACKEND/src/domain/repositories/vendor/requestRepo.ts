import { uploadImage } from "../../../config/awsConfig";
import { Licence } from "../../../framworks/database/models/licence";
import { Vendors } from "../../../framworks/database/models/vendor";

export default {
  addRequest: async (datas: any, images: any) => {
    try {
      const filePaths = images["values[licenseOrCertificates][0]"].map(
        (file: any) => uploadImage(file.filepath)
      );

      const uploadResults = await Promise.all(filePaths);
      const profilePicture = await uploadImage(
        images["values[profileImage]"][0].filepath
      );

      const createDb = await Licence.create({
        applicantName: datas["values[applicantName]"][0],
        businessName: datas["values[businessName]"][0],
        certificateExpirationDate:
          datas["values[certificateExpirationDate]"][0],
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
      await Vendors.findByIdAndUpdate(
        { _id: datas.id[0] },
        {
          $set: {
            vendor: true,
            profilePicture: profilePicture,
            services: datas["values[servicesYouChose]"][0],
          },
        }
      );
      if (createDb) {
        return { success: true, message: "Request created successfully" };
      } else {
        return { success: false, message: "something went wrong" };
      }
    } catch (error) {
      console.log(error);
    }
  },
};
