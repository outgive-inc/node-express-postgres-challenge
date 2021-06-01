const router = require("express").Router();
const { body } = require("express-validator");
const { updateTaskById } = require("../models/queries/tasks");
const { validateRequest } = require("../middleware/validateRequest");

router.put(
  "/api/v1/tasks/:id",
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  async (req, res) => {
    const task = await updateTaskById(req.params.id, req.body);

    res.send(task);
  }
);

module.exports = router;
