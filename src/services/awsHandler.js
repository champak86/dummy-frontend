import S3FileUpload from "react-s3";

const config = {
  bucketName: "user-recording",
  region: "us-east-2",
  accessKeyId: "AKIAQPD4RK5KAC4DME6T",
  secretAccessKey: "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",
};


const upload = async (file) => {
    return new Promise((resolve, reject) => {
        S3FileUpload.uploadFile(file, config)
        .then((data) => {
          resolve(data.location);
        })
        .catch((err) => {
          reject(err);
        });
    })
};

const deleteRecoringFile = async (filePath) => {
  const fileName = filePath.split('.com/')[1];  
  await S3FileUpload.deleteFile(fileName, config)
    .then((data) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export { upload, deleteRecoringFile };
