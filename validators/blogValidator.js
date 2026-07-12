const { body, param } = require("express-validator");

const createBlogValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 5, max: 150 })
        .withMessage("Title must be between 5 and 150 characters"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required"),

    body("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid category ID")
];

const blogIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Blog ID")
];

const updateBlogValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Blog ID"),

    body("title")
        .optional()
        .trim()
        .isLength({ min: 5, max: 150 })
        .withMessage("Title must be between 5 and 150 characters"),

    body("content")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty"),

    body("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid Category ID")
];

module.exports = {
    createBlogValidation,
    blogIdValidation,
    updateBlogValidation
};