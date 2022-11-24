const catchAsyncErrors = require("../errorMiddleware/catchAsyncErrors");
const ErrorHandler = require("../errorMiddleware/errorHandler");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const sendMail = require("../utils/sentMail");
const crypto = require("crypto");

exports.signUpUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
  });
  sendToken(res, user, 200);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  // const isPasswordMatch = await bcrypt.compare(password, user.password);
  const isPasswordMatch = await user.matchPasswords(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Wrong Password or Email entered.", 401));
  }
  sendToken(res, user, 201);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("authToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select("+password");

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new ErrorHandler("Please Enter oldPassword or new Password", 404)
    );
  }

  const isMatch = await user.matchPasswords(oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Old Password Not correct", 404));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const { name, email } = req.body;
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  // Avatar todo
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

exports.myProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate("posts");
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id).populate("posts");
  if (!user) {
    return next(new (ErrorHandler("User Not Found", 404))());
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

exports.deleteMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const posts = user.posts;
  const followers = user.followers;
  const following = user.following;

  // Iterate over followers list and remove this profile from their following's list
  for (let i = 0; i < followers.length; i++) {
    const follower = await userModel.findById(followers[i]);
    const index = follower.following.indexOf(user._id);
    follower.following.splice(index, 1);
    await follower.save();
  }

  // Iterate over followings list and remove this profile from their follower's list
  for (let i = 0; i < following.length; i++) {
    const follows = await userModel.findById(following[i]);
    const index = follows.followers.indexOf(user._id);
    follows.followers.splice(index, 1);
    await follows.save();
  }
  await user.remove();

  // Delete all posts of user
  for (let i = 0; i < posts.length; i++) {
    const post = await postModel.findById(posts[i]);
    await post.remove();
  }
  // Logout after deleting profile
  res.status(200).cookie("authToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile deleted successfully",
  });
});

// Follow And unFollow user
exports.followUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findById(id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  if (!user.followers.includes(req.user._id)) {
    user.followers.push(req.user._id);
    await user.save();

    const loggedInUser = await userModel.findById(req.user._id);
    loggedInUser.following.push(user._id);
    await loggedInUser.save();
    return res.status(200).json({
      success: true,
      message: "Followed successfully",
      user,
    });
  } else {
    let index = user.followers.indexOf(req.user._id);
    user.followers.splice(index, 1);
    await user.save();

    const loggedInUser = await userModel.findById(req.user._id);
    index = loggedInUser.following.indexOf(user._id);

    loggedInUser.following.splice(index, 1);
    await loggedInUser.save();

    return res.status(200).json({
      success: true,
      message: "Unfollowed successfully",
      user,
    });
  }
});

// Send token through email
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const {email} = req.body;
    const user = await userModel.findOne({email});
    if(!user) {
        return(next(new ErrorHandler("User Not Found", 404)));
    }
    const resetToken = await user.generateToken()
    await user.save();
    let message = `Please click here to change your password ${process.env.FRONTENDURL}/${resetToken}`
    let subject = `Your Reset Token is here`
    try {
        await sendMail(message, subject, email);
        console.log(user.resetPasswordToken)
        res.status(200).json({
            success: true,
            message: `Email sent successfully`
            // message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
    
});

// Check token and change password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const {resetToken} = req.params;

  // Creating token hash of the provided token
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if(!user) {
    return (next(new ErrorHandler("Invalid Token or Expired Token.", 404)));
  }
  if(req.body.password !== req.body.confirmPassword) {
    return (next(new ErrorHandler("Passwords are not matching", 401)));
  }
  user.password = req.body.password;
  user.save();
  
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully"
  })
});
