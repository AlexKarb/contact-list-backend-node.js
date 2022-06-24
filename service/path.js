const path = require('path');

const TEMP_DIR = path.join(__dirname, '../', 'tmp');

const PUBLIC_DIR = path.join(__dirname, '../', 'public');

const TEMP_IMAGE_PATH = ({ originalname }) => path.join(TEMP_DIR, originalname);

const AVATAR_PATH = avatarName => path.join('avatars', avatarName);

const PUBLIC_IMAGE_PATH = imagePath => {
  return path.join(PUBLIC_DIR, imagePath);
};

module.exports = {
  TEMP_DIR,
  PUBLIC_DIR,
  TEMP_IMAGE_PATH,
  AVATAR_PATH,
  PUBLIC_IMAGE_PATH,
};
