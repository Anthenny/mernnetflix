const router = require("express").Router();
const movieController = require("../controllers/movieController");
const verify = require("../util/verifyToken");

router.post("/", movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);
router.get("/find/:id", movieController.getMovie);
router.get("/random", movieController.getRandomMovie);

module.exports = router;
