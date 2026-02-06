const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUser = require("../middleware/users");


router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", validateUser, userController.addUser);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;