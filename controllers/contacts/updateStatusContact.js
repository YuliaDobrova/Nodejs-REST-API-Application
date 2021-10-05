const { NotFound, BadRequest } = require("http-errors");

const { Contact } = require("../../models");
const { sendResponse } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new BadRequest(`missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendResponse({ res, data: result });
};

module.exports = updateStatusContact;
