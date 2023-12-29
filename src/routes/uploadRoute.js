const express = require("express");
const {uploadPicture} = require("../controllers/uploadCtrl");
const multer = require("multer");

const router = express.Router()


const upload = multer({dest: "uploads/"});

router.post("/", upload.single("image"), uploadPicture)

module.exports = router;
