const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));
// router.post("/register", validation(joiSchema), controllerWrapper(ctrl.register));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
// router.post("/signin", validation(joiSchema), controllerWrapper(ctrl.signin));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));
// router.post("/signout", controllerWrapper(ctrl.signout));

router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;
