const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { sendResponse } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    sendResponse({
      res,
      status: 409,
      statusMessage: "Conflict error",
      data: { message: "Email in use" },
    });
    return;
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  sendResponse({
    res,
    status: 201,
    data: { message: "Success register" },
  });
};

module.exports = signup;
