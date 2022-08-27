const router = require("express").Router();

router.use(require("./taskRoute"));
router.use(require("./subtaskRoute"));

module.exports = router;
