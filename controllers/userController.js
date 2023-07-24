const { User, Thought } = require("../models");

module.exports = {
  //get all users in the database
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single user from id in parameters
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }
      res.status(200).json({ message: "User updated!", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete({
        _id: req.params.userId,
      });
      if (!deletedUser) {
        res.status(404).json({ message: "No user with that id" });
      }
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.status(200).json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      //find the user and friend documents
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res
          .status(404)
          .json({ message: "No user or friend with that id." });
      }

      res.status(200).json({
        message: "Friend added successfully!",
        friend: friend.username,
        user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      //find the user document and remove the friendId from the friends array
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that id." });
      }
      res.status(200).json({
        message: "Friend deleted successfully!",
        user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
