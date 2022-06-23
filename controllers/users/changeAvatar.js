const { User } = require('../../models/users');
const { Unauthorized } = require('http-errors');
const { optimiseImage } = require('../../service');
const {
  TEMP_IMAGE_PATH,
  AVATAR_PATH,
  PUBLIC_IMAGE_PATH,
} = require('../../service/path');
const fs = require('fs/promises');

const updateUserAvatar = async ({ user, avatar: avatarURL }) =>
  await User.findByIdAndUpdate(user, { avatarURL }, { new: true }).select(
    'avatarURL -_id',
  );

const changeAvatar = async ({ file, user }, res, next) => {
  const newImageName = `${user.id}-${file.originalname}`;

  await optimiseImage({
    from: TEMP_IMAGE_PATH(file),
    saveTo: PUBLIC_IMAGE_PATH(AVATAR_PATH(newImageName)),
    options: { resize: [250, 250] },
  });

  const result = await updateUserAvatar({
    user: user._id,
    avatar: AVATAR_PATH(newImageName),
  });

  if (!result) {
    next(new Unauthorized('Not authorized'));
    await fs.unlink(TEMP_IMAGE_PATH(file));
  }

  res.json(result);
};

module.exports = changeAvatar;
