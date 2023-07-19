const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);
// /api/users/:userId
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(createFriend);

module.exports = router;
