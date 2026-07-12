const { param } = require("express-validator");

const blogLikeValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Blog ID")

];

module.exports = {
    blogLikeValidation
};