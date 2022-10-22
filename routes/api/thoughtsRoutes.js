const router = require("express").Router();
const {
  getThought,
  createThought,
  updateThought,
  getSingleThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtsController.js");

// /api/thoughts
router.route("/").get(getThought).post(createThought);

// /api/thoughts/:courseId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/api/thoughts/:thoughtId/reactions").post(addReaction);

router
  .route("/api/thoughts/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;
