const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController");
const authentication = require('../middlewre/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/user/:userId",authentication.mid, userController.getUserData)

router.post("/user/:userId/posts",authentication.mid, userController.userPosts)

router.put("/user/:userId",authentication.mid, userController.updateUser)

router.delete("/user/:userId",authentication.mid, userController.deleteUser)

module.exports = router;