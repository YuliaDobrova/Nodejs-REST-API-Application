const { Contact } = require("../../models");
const { sendResponse } = require("../../helpers");

const getAll = async (req, res, next) => {
  // console.log(req.user._id);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: req.user._id }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "email");
  // console.log(result);
  sendResponse({
    res,
    data: result,
  });
};

module.exports = getAll;
