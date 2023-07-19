const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);
// /api/users/:userId
router.route("/:userId").get(getUser).put(updateUser);

module.exports = router;
