const router = require("express").Router();
const {
  getusers,
  getSingleuser,
  createuser,
  deleteuser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getusers).post(createuser);

// /api/users/:userId
router.route("/:userId").get(getSingleuser).delete(deleteuser);

// /api/users/:userId/assignments/:assignmentId
router
  .route("/api/users/:userId/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
