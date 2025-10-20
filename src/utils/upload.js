const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const randomtext = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileextantion = file.originalname.split(".");
    let extansionn = fileextantion[fileextantion.length - 1];
    cb(null, file.fieldname + "-" + randomtext + "." + extansionn);
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, png, gif)");
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
