const { NotFound } = require("http-errors");

const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  // findOne используют для поиска не по contactId
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);

    // const createError = require("http-errors");
    // throw new createError(404, `Contact with id=${contactId} not found`);

    // const error = new Error(`Contact with id=${contactId} not found`);
    // error.status = 404;
    // throw error;

    // res.status(404).json({
    //   status: "error",
    //   code: 404,
    //   message: `Contact with id=${contactId} not found`,
    // });
    // return;
  }
  sendSuccessReq(res, { result });
  // статус не указываем, так как по умолчанию идет 200
  // res.status(200).json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     result: contacts,
  //   },
  // });
};

module.exports = getById;
