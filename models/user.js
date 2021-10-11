const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: () => gravatar.url(this.email, { s: "250", r: "g", d: "404" }),
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setVerifyToken = function () {
  this.verifyToken = uuidv4();
};

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
  avatarURL: Joi.string(),
});

const User = model("user", userSchema);

module.exports = { User, joiSchema };
