const { body, param } = require("express-validator");

const createCategoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Category name must be between 2 and 50 characters"),

    body("description")
        .optional()
        .trim()
];

const updateCategoryValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Category ID"),

    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Category name must be between 2 and 50 characters"),

    body("description")
        .optional()
        .trim()
];

const categoryIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Category ID")
];

module.exports = {
    createCategoryValidation,
    updateCategoryValidation,
    categoryIdValidation
};