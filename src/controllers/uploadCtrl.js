const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

const uploadPicture = asyncHandler(async (req, res) => {
  const { file } = req;
  try {
    console.log(file.filename);
    if (!file) throw new Error("Please provide a picture");
    const data = await cloudinaryUploadImg(file.filename, file.path);
    res.json({ url: data.secure_url });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { uploadPicture };
