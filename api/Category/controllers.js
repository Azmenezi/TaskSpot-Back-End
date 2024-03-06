const Category = require("../../models/Category");
const User = require("../../models/User");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await User.findById(categoryId);
    return foundCategory;
  } catch (error) {
    return next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().select("-__v");
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ newCategory });
  } catch (error) {
    return next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await req.user.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
