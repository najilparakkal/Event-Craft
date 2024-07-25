import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3ClientConfig: S3ClientConfig = {
  region: import.meta.env.VITE_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY || "your acc id",
    secretAccessKey:
      import.meta.env.VITE_APP_AWS_SECRET_KEY || "your secret okay",
  },
};

const s3Client = new S3Client(s3ClientConfig);

export const uploadToS3Bucket = async (data: File) => {
  try {

    const name = Date.now() + Math.floor(Math.random() * 10000) + "";
    const params = {
      Bucket: import.meta.env.VITE_APP_AWS_BUCKET,
      Key: name || Date.now().toString(),
      Body: data,
    };
    console.log(params.Key);
    
    const upload = new Upload({
      client: s3Client,
      params,
      queueSize: 3,
      leavePartsOnError: false,
    });
    await upload.done();

    const objectKey = params.Key;
    const region = import.meta.env.VITE_APP_AWS_REGION;
    const url = `https://${params.Bucket}.s3.${region}.amazonaws.com/${objectKey}`;
    return url;
  } catch (err) {
    console.error("Error uploading video to S3:", err);
    throw err;
  }
};
