const express = require("express");
const {createPost, likePost, deletePost, getPosts, updateCaption, addComment, deleteComment} = require("../controllers/postController");
const router = express.Router();
const {isAuthenticatedUser} = require("../middlewares/isAuthenticatedUser")

router.post("/createPost", isAuthenticatedUser, createPost);
router.post("/likePost/:id", isAuthenticatedUser, likePost);
router.delete("/deletePost/:id", isAuthenticatedUser, deletePost);
router.put("/updateCaption/:id", isAuthenticatedUser, updateCaption);
router.post("/getPosts", isAuthenticatedUser, getPosts);
router.post("/comment/:id", isAuthenticatedUser, addComment);
router.delete("/deleteComment/:id", isAuthenticatedUser, deleteComment);

module.exports = router;