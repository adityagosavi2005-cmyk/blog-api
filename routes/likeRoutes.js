const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {likeBlog,unlikeBlog} = require("../controllers/likeController");

const {blogLikeValidation} = require("../validators/likeValidator");

router.post("/blogs/:id/like",authMiddleware,blogLikeValidation,likeBlog);

router.delete("/blogs/:id/like",authMiddleware,blogLikeValidation,unlikeBlog);

module.exports = router;