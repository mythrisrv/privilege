const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controller/commonController");
var multer = require("multer");
var upload = multer({ dest: "../public/data/uploads/" });

// Upload image
router.post("/upload-image", upload.single("file"), async (req, res) => {
  try {
    let item = await uploadImage(req);
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
