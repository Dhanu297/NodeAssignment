// Import Express and using that create a modular router instance
const express = require("express");
const router = express.Router();

// Import the controller & middleware used for validating data related to users
const userController = require("../controllers/userController");
const validateUser = require("../middleware/users");

//Get all users
router.get("/", userController.getUsers);
//Get user by id
router.get("/:id", userController.getUserById);
//crete new user
router.post("/", validateUser, userController.addUser);// only add & update user requires validation of user data
//update user by id
router.put("/:id", validateUser, userController.updateUser);// only add & update user requires validation of user data
//delete user by id
router.delete("/:id", userController.deleteUser);

// Export the router so it can be mounted in app.js
module.exports = router;