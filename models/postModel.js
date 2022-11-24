const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: String,
  image: {
    public_id: String,
    url: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: {
        type: Object
      },
      comment: {
        type: String,
        required: [true, "Please Enter a comment."],
      },
    },
  ],
});

const postModel = new mongoose.model("post", postSchema);

module.exports = postModel;
