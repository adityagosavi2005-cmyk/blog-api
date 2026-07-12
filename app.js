
const express = require('express')

const authRoutes = require("./routes/authRoutes");

const blogRoutes = require("./routes/blogRoutes");

const commentRoutes = require("./routes/commentRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

const likeRoutes = require("./routes/likeRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api", commentRoutes);

app.use("/api", likeRoutes);

module.exports = app