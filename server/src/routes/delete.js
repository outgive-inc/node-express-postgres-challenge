const { deleteTaskById } = require("../models/queries/tasks");
const router = require("express").Router();

router.delete("/api/v1/tasks/:id", async (req, res) => {
  const deletedTask = await deleteTaskById(req.params.id);

  res.send({ title: deletedTask.title });
});
module.exports = router;
