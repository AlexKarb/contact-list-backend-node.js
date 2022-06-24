const multer = require('multer');
const { TEMP_DIR } = require('../service/path');
const { BadRequest } = require('http-errors');

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(BadRequest('File mimetype should be image only'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
