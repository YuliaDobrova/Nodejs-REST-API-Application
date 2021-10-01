const express = require("express");

const { controllerWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiSchema), controllerWrapper(ctrl.add));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.patch(
  "/:contactId/favorite",
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
