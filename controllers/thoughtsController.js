const { ObjectId } = require("mongoose").Types;
const { Thought, User, Thoughts } = require("../models");

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thoughts.find()
      .then((ThoughtData) => res.json(ThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  // getSingleThought(req, res) {
  //   Thoughts.findOne({ _id: req.params.ThoughtId })
  //     .select("-__v")
  //     .then((thoughts) =>
  //       !Thoughts
  //         ? res.status(404).json({ message: "No thought with that ID" })
  //         : res.json(thoughts)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .lean()
      .then(async (ThoughtData) => res.json(ThoughtData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => res.json(thoughtData))
      .then(() => res.json({ message: "Thought and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    console.log("You are adding an Friend");
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((ThoughtData) =>
        !ThoughtData
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(ThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    console.log("You are adding an Friend");
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((ThoughtData) =>
        !ThoughtData
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(ThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body
      // { $set: req.body },
      // { runValidators: true, new: true }
    )
      .then((ThoughtData) =>
        !ThoughtData
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(ThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
