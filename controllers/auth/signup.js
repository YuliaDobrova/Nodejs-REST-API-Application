const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { sendResponse, sendEmail } = require("../../helpers");

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
  newUser.setVerifyToken();
  const { verifyToken } = await newUser.save();
  const data = {
    to: email,
    subject: "Confirm Email",
    html: `<a href="http://localhost:3000/api/v1/auth/verify/${verifyToken}" target="_blank">Confirm your registration</a>`,
  };
  await sendEmail(data);
  sendResponse({
    res,
    status: 201,
    data: { message: "Success register", verifyToken: verifyToken },
  });
};

module.exports = signup;
