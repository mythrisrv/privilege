let models = require("../model");
var fs = require("fs");
var { v4: uuidv1 } = require("uuid");

uploadImage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.file.filename);

      if (
        req.file.mimetype == "image/png" ||
        req.file.mimetype == "image/jpg" ||
        req.file.mimetype == "image/jpeg"
      ) {
        let originalNameWithOutSpace = req.file.filename
          .toLowerCase()
          .replace(/\s/g, "-")
          .replace(/\./g, "-");
        let fileExtension =
          req.file.mimetype == "image/png"
            ? "png"
            : req.file.mimetype == "image/jpg"
            ? "jpg"
            : req.file.mimetype == "image/jpeg"
            ? "jpeg"
            : null;
        var file = __dirname + "/";

        originalNameWithOutSpace + uuidv1() + fileExtension;

        resolve(originalNameWithOutSpace);

        fs.rename(req.file.path, file, function (err) {
          if (err) {
            reject({
              message: err.message,
            });
          } else {
            resolve(originalNameWithOutSpace);
          }
        });
      } else {
        reject({
          message: "File is not an image",
        });
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  uploadImage,
};
