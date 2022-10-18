// ObjectId() method for converting UserId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

// TODO: Create an aggregate function to get the number of user overall
const headCount = async () =>
  User.aggregate()
    // Your code here
    .then((numberOfUser) => numberOfUser);

// Execute the aggregate method on the User model and calculate the overall grade by using the $avg operator

module.exports = {
  // Get all user
  getUser(req, res) {
    User.find()
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (UserData) => res.json(UserData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((UserData) => res.json(UserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an friend to a User
  addFriend(req, res) {
    console.log("You are adding an Friend");

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((UserData) => {
        !UserData
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(UserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Remove Friend from a User
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:  req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((UserData) =>
        !UserData
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(UserData)
      )
      .catch((err) => res.status(500).json(err));
  },


  updateUser(req, res) {
    console.log("You are adding an Friend");

    User.findOneAndUpdate(
      { _id: req.params.userId }, req.body
    )
      .then((UserData) => {
        !UserData
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(UserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}