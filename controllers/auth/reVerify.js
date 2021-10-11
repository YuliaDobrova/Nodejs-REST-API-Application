const { sendResponse, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const reVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return sendResponse({
      res,
      status: 404,
      statusMessage: "Not Found",
      data: {
        message: "User not found",
      },
    });
  }

  const { verify, verifyToken } = user;

  if (verify) {
    return sendResponse({
      res,
      status: 400,
      statusMessage: "Bad Request",
      data: {
        message: "Verification has already been passed",
      },
    });
  }

  const data = {
    to: email,
    subject: "Confirm Email",
    html: `<a href="http://localhost:3000/api/v1/auth/verify/${verifyToken}" target="_blank">Confirm your registration</a>`,
  };

  await sendEmail(data);

  sendResponse({
    res,
    status: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = reVerify;
