const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
