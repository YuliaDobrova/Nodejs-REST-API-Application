const { sendResponse } = require("../../helpers");

const current = async (req, res) => {
  const { email, subscription } = req.user;
  sendResponse({
    res,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = current;
