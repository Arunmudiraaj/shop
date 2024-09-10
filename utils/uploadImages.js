const bucket = require("../config/firebase");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { FIREBASE_BUCKET } = require("../constants/constants");

const getPublicUrl = (folderName, filename) => {
  return `https://storage.googleapis.com/${bucket.name}/${folderName}/${filename}`;
};

const uploadProductImage = async (file) => {
  return new Promise((resolve, reject) => {
    const uniqueFileName = `${uuidv4()}_${path.basename(file.originalname)}`;
    const fileUpload = bucket.file(
      `${FIREBASE_BUCKET.PRODUCT_IMAGES}/${uniqueFileName}`
    );

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => reject(err));

    stream.on("finish", async () => {
      try {
        await fileUpload.makePublic();
        const imageUrl = getPublicUrl(
          FIREBASE_BUCKET.PRODUCT_IMAGES,
          uniqueFileName
        );
        resolve(imageUrl);
      } catch (error) {
        reject(error);
      }
    });

    stream.end(file.buffer);
  });
};

module.exports = uploadProductImage;
