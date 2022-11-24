const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please a name"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists."],
    required: [true, "Please enter a mail"],
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minLength: [8, "Password must be greater than 8 characters."],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

// Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Generates Token
userSchema.methods.generateToken = async function () {
  // Generating Token
  const resetToken = await crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// Match passwords
userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
