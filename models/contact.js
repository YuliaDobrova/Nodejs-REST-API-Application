const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: 2,
      maxLength: 20,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().min(1).max(15).required(),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema };
