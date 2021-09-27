const router = require("express").Router();
const listController = require("../controllers/listController");
const verify = require("../util/verifyToken");

router.get("/", listController.getLists);
router.post("/", listController.createList);
router.delete("/:id", listController.deleteList);

module.exports = router;
