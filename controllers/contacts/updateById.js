const { NotFound } = require("http-errors");

const { Contact } = require("../../models");
const { sendResponse } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendResponse({ res, data: result });
};

module.exports = updateById;
