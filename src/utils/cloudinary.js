const cloudinary = require("cloudinary").v2;



const cloudinaryUploadImg = async (name, picture) => {
    console.log("api_key",process.env.CLOUD_API_KEY)
  try {
    const uploader = await cloudinary.uploader.upload(picture, {
      public_id: name,
      folder: "shopifity",
    });
    return uploader;
  } catch (error) {
    throw new Error(error);
  }
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
