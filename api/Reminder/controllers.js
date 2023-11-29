const Reminder = require("../../models/Reminder");
const User = require("../../models/User");
const generateToken = require("../../utils/auth/generateToken");

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
    const newReminder = await Reminder.create(req.body);
    const token = generateToken(newReminder);
    res.status(201).json({ token });
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
