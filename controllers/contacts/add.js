const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  sendSuccessReq(res, { result }, 201);
};

module.exports = add;
