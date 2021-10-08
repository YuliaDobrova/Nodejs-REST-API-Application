const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public/avatars");

const uploadAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file;

  try {
    const { _id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const newImgName = `avatar_main-image${_id}.${extention}`;
    const resultStorage = path.join(avatarDir, newImgName);
    console.log(`resultStorage`, resultStorage);

    Jimp.read(tempStorage)
      .then((avatar) => {
        return avatar.resize(250, 250).quality(60).write(resultStorage);
      })
      .catch((error) => {
        console.error(error);
      });

    await fs.rename(tempStorage, resultStorage);
    const avatarURL = path.join("/avatars", newImgName);
    const newUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );
    console.log(`newUser`, newUser);
    res.status(200).json({
      result: {
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempStorage);
    throw error;
  }
};
module.exports = uploadAvatar;
