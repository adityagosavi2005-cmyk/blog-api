const Like = require("../models/Like");
const Blog = require("../models/Blog");
const { validationResult } = require("express-validator");
const likeBlog = async (req, res) => {

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

        const existingLike = await Like.findOne({
            blog: id,
            user: req.user.id
        });

        if (existingLike) {
            return res.status(200).json({
                success: true,
                message: "Blog already liked"
        });
    }

    const like = await Like.create({
        blog: id,
        user: req.user.id
    });

    blog.likesCount++;

    await blog.save();

    return res.status(201).json({
        success: true,
            message: "Blog liked successfully",
            data: like
    });
} catch (error) {

    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}

};


const unlikeBlog = async (req, res) => {

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

        const existingLike = await Like.findOne({
            blog: id,
            user: req.user.id
        });

        if (!existingLike) {
            return res.status(200).json({
                success: true,
                message: "Blog is already not liked."
            });
        }

        await existingLike.deleteOne();

        blog.likesCount--;

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog unliked successfully"
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
    likeBlog,
    unlikeBlog
};