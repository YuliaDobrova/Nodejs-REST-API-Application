const { NotFound } = require("http-errors");

const { Contact } = require("../../models");
const { sendResponse } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendResponse({
    res,
    status: 200,
    statusMessage: "Contact deleted",
    data: result,
  });
};

module.exports = removeById;
