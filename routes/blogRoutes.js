const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog,searchBlogs} = require("../controllers/blogController");

const {createBlogValidation, blogIdValidation, updateBlogValidation} = require("../validators/blogValidator");

router.get("/search",searchBlogs);

router.post("/", authMiddleware, createBlogValidation, createBlog);

router.get("/", getAllBlogs);

router.get("/:id", blogIdValidation, getBlogById);

router.delete("/:id", authMiddleware, blogIdValidation, deleteBlog);

router.put("/:id", authMiddleware,updateBlogValidation, updateBlog)
module.exports = router;