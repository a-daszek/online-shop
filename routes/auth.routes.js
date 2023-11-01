const express = require("express");

const authController = require("../controllers/auth.controller");// with../ we are going up one level and are in the main files in this project (we can omit the .js extension here)

const router = express.Router();

router.get("/signup", authController.getSignup); //route for serving the signup page, not for getting and storing the user data, after the path which is the first parameter comes the middleware as argument. The function for signup is stored in auth.controller.js

router.post("/signup", authController.signup); //whenever you are manipulating data on the server, you should use the post request

router.get("/login", authController.getLogin);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;