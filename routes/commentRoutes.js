const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {createComment, getCommentsByBlog, updateComment, deleteComment} = require("../controllers/commentController");

const {createCommentValidation,commentIdValidation, updateCommentValidation} = require("../validators/commentValidator");

router.get("/blogs/:id/comments",commentIdValidation,getCommentsByBlog);

router.post("/blogs/:id/comments",authMiddleware,createCommentValidation,createComment);

router.put("/comments/:id", authMiddleware, updateCommentValidation, updateComment);

router.delete("/comments/:id",authMiddleware,commentIdValidation,deleteComment);

module.exports = router;