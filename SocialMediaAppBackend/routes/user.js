const express = require('express');
const { register, login, logout, followUser, updatePassword, updateProfile, deleteMyProfile,
     myProfile, getAllUsers, getUserProfile ,forgotPassword,resetPassword} = require('../controllers/user');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");

router.route('/register').post(register);
router.route('/login').post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuthenticated, followUser);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/forgot/password").post(isAuthenticated, forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;