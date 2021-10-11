const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { sendResponse } = require("../../helpers");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password) || !user.verify) {
    sendResponse({
      res,
      status: 401,
      statusMessage: "Error",
      data: {
        message: "Email or password is wrong or email is not verificated",
      },
    });
    return;
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
