const express = require("express");
const {
  getReminders,
  createReminder,
  fetchReminder,
  updateReminder,
  deleteReminder,
  createBulkReminders,
  getRecentReminders,
  getReminderByCategory,
  markRemindersAsDone,
  bulkDeleteReminders,
  markUnDoneReminders,
} = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.param("reminderId", async (req, res, next, reminderId) => {
  try {
    const foundReminder = await fetchReminder(reminderId);
    if (!foundReminder)
      return next({ status: 404, message: "Reminder not found" });
    req.reminder = foundReminder;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", passport.authenticate("jwt", { session: false }), getReminders);
router.get(
  "/by-category/:category",
  passport.authenticate("jwt", { session: false }),
  getReminderByCategory
);
router.get(
  "/recent",
  passport.authenticate("jwt", { session: false }),
  getRecentReminders
);
router.patch(
  "/done",
  passport.authenticate("jwt", { session: false }),
  markRemindersAsDone
);
router.patch(
  "/undone",
  passport.authenticate("jwt", { session: false }),
  markUnDoneReminders
);
router.post(
  "/create/:categoryId",
  passport.authenticate("jwt", { session: false }),
  createReminder
);
router.post(
  "/bulk-create/",
  passport.authenticate("jwt", { session: false }),
  createBulkReminders
);
router.put(
  "/update/:reminderId",
  passport.authenticate("jwt", { session: false }),
  updateReminder
);
router.delete(
  "/delete/:reminderId",
  passport.authenticate("jwt", { session: false }),
  deleteReminder
);
router.put(
  "/bulkDelete",
  passport.authenticate("jwt", { session: false }),
  bulkDeleteReminders
);
module.exports = router;
