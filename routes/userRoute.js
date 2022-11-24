const express = require("express");
const { signUpUser, loginUser, followUser, logoutUser, updatePassword, updateProfile, deleteMyProfile, myProfile, getAllUsers, getUserProfile, forgotPassword, resetPassword } = require("../controllers/userControllers");
const {isAuthenticatedUser} = require("../middlewares/isAuthenticatedUser")
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getAllUsers", isAuthenticatedUser, getAllUsers);
router.get("/getUserProfile/:id", isAuthenticatedUser, getUserProfile);
router.post("/myProfile", isAuthenticatedUser, myProfile);
router.post("/update/password", isAuthenticatedUser, updatePassword);
router.post("/update/profile", isAuthenticatedUser, updateProfile);
router.delete("/delete/profile", isAuthenticatedUser, deleteMyProfile);
router.post("/follow/:id", isAuthenticatedUser, followUser);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:resetToken", resetPassword);

module.exports = router;