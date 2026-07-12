const express = require('express')
const router = express.Router()
const {register, login, profile} = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validators/authValidator");
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/profile", authMiddleware, profile);

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);



module.exports = router 


