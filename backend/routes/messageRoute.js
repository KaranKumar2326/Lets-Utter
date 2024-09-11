const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const isAuthenticated = require("../middleware/isAuthenticated");
// const { isAuthenticated } = require("../middleware/isAuthenticated");


router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/receive/:id").get(isAuthenticated,getMessages);

module.exports = router;