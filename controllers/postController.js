const catchAsyncErrors = require("../errorMiddleware/catchAsyncErrors");
const ErrorHandler = require("../errorMiddleware/errorHandler");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const { caption, image } = req.body;

  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const newPost = await postModel.create({
    caption,
    image,
    owner: user.id,
  });

  user.posts.push(newPost._id);
  await user.save();

  res.status(200).json({
    success: true,
    newPost,
  });
});

exports.likePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const post = await postModel.findById(id);

  if (!post) {
    return next(new ErrorHandler("Post Not found", 404));
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);
    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Unliked Successfully",
    });
  } else {
    post.likes.push(req.user._id);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Liked Successfully",
    });
  }
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  let post = await postModel.findById(id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You cannot delete other person's post", 401));
  }

  const index = user.posts.indexOf(post._id);

  user.posts.splice(index, 1);
  await user.save();
  post = await postModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    post,
  });
});

exports.getPosts = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  // $in operator selects the documents where the value of a field equals any value in the specified array(in this case - user.following)
  // user .following is an array of id of user that a person follows
  // Mhanje jya jya posts madhe owner chi value (user.following chya values) chya equal aahe ti values return zali
  // imp - $in operator

  const posts = await postModel.find({
    owner: {
      $in: user.following,
    },
  }).populate("owner");

  return res.status(200).json({
    success: true,
    posts,
  });
});

exports.updateCaption = catchAsyncErrors(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Cannot change caption of this post", 401));
  }

  const { newCaption } = req.body;
  post.caption = newCaption;
  await post.save();
  res.status(200).json({
    success: true,
    message: "Caption changed successfully",
  });
});

exports.addComment = catchAsyncErrors(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  const { comment } = req.body;

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (!comment) {
    return next(new ErrorHandler("Please Enter a comment.", 404));
  }

  const postOwner = await userModel.findById(post.owner);

  // Checkimg if owner is commenting
  let isOwner = false;
  if (postOwner._id.toString() === req.user._id.toString()) {
    isOwner = true;
  }

  // User cannot comment if he doesn't follow the user
  if (!postOwner.followers.includes(req.user._id) && !isOwner) {
    return next(
      new ErrorHandler(
        "You cannot comment on this as you do not follow the user.",
        401
      )
    );
  }

  let commentIndex = -1;
  // Check if user has already commented
  post.comments.forEach((item, index) => {
    if (item.user._id.toString() === req.user._id.toString()) {
      commentIndex = index;
    }
  });

  // If Not commented push the new Comment
  if (commentIndex !== -1) {
    post.comments[commentIndex].comment = comment;
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment Successful",
    });

    // If commented edit the comment
  } else {
    let commentObject = {
      user: req.user,
      comment: comment,
    };
    post.comments.push(commentObject);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment Successful",
    });
  }
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  // I am the owner of the post and I can delete any comment on the post
  if (post.owner.toString() === req.user._id.toString()) {
    const { userId } = req.body;
    if (!userId) {
      return next(
        new ErrorHandler("Please mention id of the user to delete his comment.")
      );
    }

    let currentIndex = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() === userId) {
        currentIndex = index;
      }
    });

    if (currentIndex === -1) {
      return next(new ErrorHandler("Comment Not Found", 404));
    } else {
      post.comments.splice(currentIndex, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment Deleted",
      });
    }
  }

  commentIndex = -1;
  // Iterating over post.comments and getting the index of the logged in user (if present)
  post.comments.forEach((item, index) => {
    if (item.user.toString() === req.user._id.toString()) {
      commentIndex = index;
    }
  });

  if (commentIndex === -1) {
    return next(new ErrorHandler("Comment Not Found", 404));
  } else {
    post.comments.splice(commentIndex, 1);
    await post.save();
  }
  return res.status(200).json({
    success: true,
    message: "Comment Deleted",
  });
});
