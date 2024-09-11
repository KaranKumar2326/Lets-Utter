const express = require('express');
const { register, login, logout, getOtherUsers } = require('../controllers/userController.js');
const isAuthenticated = require('../middleware/isAuthenticated.js');
const { get } = require('config');
const userController = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get( isAuthenticated, getOtherUsers);

module.exports = router;