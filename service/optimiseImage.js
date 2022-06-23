const Jimp = require('jimp');
const fs = require('fs/promises');
const { BadRequest } = require('http-errors');

const optimiseImage = async ({ from, saveTo, options }) => {
  try {
    const image = await Jimp.read(from);

    const imageOpt = await Object.keys(options).reduce((image, option) => {
      return image[option](...options[option]);
    }, image);

    await fs.rename(from, saveTo);
    await imageOpt.writeAsync(saveTo);
  } catch (e) {
    await fs.unlink(from);
    throw new BadRequest('bad request');
  }
};

module.exports = optimiseImage;
