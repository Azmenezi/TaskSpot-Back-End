const Category = require("../../models/Category");
const Reminder = require("../../models/Reminder");
const User = require("../../models/User");

exports.fetchReminder = async (reminderId, next) => {
  try {
    const foundReminder = await User.findById(reminderId);
    return foundReminder;
  } catch (error) {
    return next(error);
  }
};

exports.getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find().select("-__v");
    return res.status(200).json(reminders);
  } catch (error) {
    return next(error);
  }
};

exports.createReminder = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "category not found!" });
    const newReminder = await Reminder.create({
      ...req.body,
      category: category._id,
    });
    res.status(201).json({ newReminder });
  } catch (error) {
    return next(error);
  }
};
exports.createBulkReminders = async (req, res, next) => {
  try {
    const newReminders = await Reminder.insertMany(req.body);
    res.status(201).json(newReminders);
  } catch (error) {
    return next(error);
  }
};

exports.updateReminder = async (req, res, next) => {
  try {
    await req.user.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteReminder = async (req, res, next) => {
  try {
    await Reminder.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
