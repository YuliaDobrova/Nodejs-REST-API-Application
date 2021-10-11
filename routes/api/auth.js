const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.current));

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.uploadAvatar)
);

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));

router.post("/users/verify", controllerWrapper(ctrl.reVerify));

module.exports = router;
