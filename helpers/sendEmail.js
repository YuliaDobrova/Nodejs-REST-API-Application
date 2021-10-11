const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, MY_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: MY_EMAIL };
    const result = await sgMail.send(email);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
