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
    const reminders = await Reminder.find({ from: req.user._id }).select(
      "-__v"
    );
    return res.status(200).json(reminders);
  } catch (error) {
    return next(error);
  }
};
exports.getRecentReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ from: req.user._id })
      .sort("-createdAt")
      .select("-__v")
      .limit(5);
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
    await User.findByIdAndUpdate(req.user._id, {
      $push: { reminders: newReminder._id },
    });
    res.status(201).json({ newReminder });
  } catch (error) {
    return next(error);
  }
};
exports.createBulkReminders = async (req, res, next) => {
  try {
    console.log(req.body);
    const tasks = req.body.map((task) => ({
      text: task.text,
      category: task.category,
      amount: task.amount || 1,
      from: req.user._id,
    }));
    const newReminders = await Reminder.insertMany(tasks);
    await User.findByIdAndUpdate(req.user._id, {
      $push: { reminders: { $each: newReminders.map((t) => t._id) } },
    });
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
