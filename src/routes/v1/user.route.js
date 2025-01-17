const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const authMiddleware = require("../../middlewares/auth.js");

const router = express.Router();
const validateUser = validate(userValidation.getUser); 
const validateSetAdress = validate(userValidation.setAddress);
// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`
router.get("/:userId", authMiddleware, validateUser, userController.getUser);

// Need to add a validation for the update address part
router.put("/:userId", authMiddleware, validateSetAdress, userController.setAddress);
module.exports = router;