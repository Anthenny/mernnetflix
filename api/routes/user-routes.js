const router = require("express").Router();
const userController = require("../controllers/userController");
const verify = require("../util/verifyToken");

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getUsers);
module.exports = router;
