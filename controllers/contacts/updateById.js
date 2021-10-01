const { NotFound } = require("http-errors");

const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessReq(res, { result });
};

module.exports = updateById;
