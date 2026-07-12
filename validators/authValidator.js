const {body} = require("express-validator")


const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters"),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters")
        .isAlphanumeric()
        .withMessage("Username must contain only letters and numbers"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
    body("login")
        .trim()
        .notEmpty()
        .withMessage("Username or Email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];



module.exports = {
    registerValidation,
    loginValidation,
};