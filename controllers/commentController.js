const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const { validationResult } = require("express-validator");

const createComment = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { id } = req.params;

        const { content } = req.body;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const comment = await Comment.create({

            content,

            blog: id,

            user: req.user.id,

            username: req.user.username

        });

        blog.commentsCount++;

        await blog.save();

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: comment
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};



const getCommentsByBlog = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const comments = await Comment.find({
            blog: id
        })
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


const updateComment = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this comment"
            });
        }

        comment.content = req.body.content;

        await comment.save();

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            data: comment
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};



const deleteComment = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this comment"
            });
        }

        const blog = await Blog.findById(comment.blog);

        await comment.deleteOne();

        blog.commentsCount--;

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createComment,
    getCommentsByBlog,
    updateComment,
    deleteComment
};