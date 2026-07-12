const Blog = require("../models/Blog");
const { validationResult } = require("express-validator");

const createBlog = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const {
            title,
            content,
            category
        } = req.body;

        const blog = await Blog.create({

            title,

            content,

            category,

            author: req.user.id,

            authorName: req.user.username

        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


const getAllBlogs = async (req, res) => {

    try {

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 3;

        if (page < 1) page = 1;
        if (limit < 1) limit = 3;
        if (limit > 50) limit = 50;

        const skip = (page - 1) * limit;

        const totalBlogs = await Blog.countDocuments();

        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find()
            .select(
                "title authorName coverImage likesCount commentsCount createdAt"
            )
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages,
            totalBlogs,
            count: blogs.length,
            data: blogs
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getBlogById = async (req, res) => {

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

        return res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


const updateBlog = async (req, res) => {

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

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this blog"
            });
        }

        const { title, content, category } = req.body;

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (category !== undefined) updateData.category = category;


        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const deleteBlog = async (req, res) => {

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

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this blog"
            });
        }

        await blog.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


const searchBlogs = async (req, res) => {

    try {

        const { query } = req.query;

        if (!query || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const blogs = await Blog.find({

            $or: [

                {
                    title: {
                        $regex: query,
                        $options: "i"
                    }
                },

                {
                    content: {
                        $regex: query,
                        $options: "i"
                    }
                }

            ]

        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
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
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    searchBlogs
};