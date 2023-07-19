const router = require("express").Router();

const { getUsers, getUser } = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers);
// /api/users/:userId
router.route("/:userId").get(getUser);

module.exports = router;
