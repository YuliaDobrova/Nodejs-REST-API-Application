const { Contact } = require("../../models");
const { sendResponse } = require("../../helpers");

const add = async (req, res, next) => {
  // console.log(req.user);
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  // const result = await Contact.create(req.body);
  // sendResponse(res, { result }, 201);
  sendResponse({
    res,
    status: 201,
    data: result,
  });
};

module.exports = add;
