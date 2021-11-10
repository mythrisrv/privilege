const express = require("express");
const { fstat } = require("fs");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  //destination for this file
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  //add back the extension
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//upload parameters for multer
const upload = multer({ storage: storage });

//required models
const Company = require("../model/master_company");

router.get("/", (req, res) => {
  Company.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.status(200).send("ok");
    }
  });
});

router.post("/", upload.single("image"), async (req, res, next) => {
  const obj = {
    companyName: req.body.companyName,
    shortCode: req.body.shortCode,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  Company.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      const created = Company.save();
    console.log(created);
    }
  });
});

module.exports = router;
