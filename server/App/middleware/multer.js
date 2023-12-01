// installing multer package to recive an image and setting destination where the all images to be stored
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    // to avoid the clashes for the same images we use as Date for unique name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

module.exports = {
  upload,
};
