const express = require("express");

const router = express.Router();

const {createCategory, getAllCategories, updateCategory, deleteCategory} = require("../controllers/categoryController");

const {createCategoryValidation, updateCategoryValidation, categoryIdValidation} = require("../validators/categoryValidator");

router.post("/",createCategoryValidation, createCategory);

router.get("/",getAllCategories);

router.put("/:id",updateCategoryValidation,updateCategory);

router.delete("/:id",categoryIdValidation,deleteCategory);

module.exports = router;