import S3FileUpload from "react-s3";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
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
