const { body, param } = require("express-validator");

const createCommentValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Blog ID"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ min: 1, max: 1000 })
        .withMessage("Comment must be between 1 and 1000 characters")

];

const commentIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Blog ID")

];


const updateCommentValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Comment ID"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ min: 1, max: 1000 })
        .withMessage("Comment must be between 1 and 1000 characters")

];

module.exports = {
    createCommentValidation,
    commentIdValidation,
    updateCommentValidation
};