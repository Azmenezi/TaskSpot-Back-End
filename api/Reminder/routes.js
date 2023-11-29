const express = require("express");
const {
  getReminders,
  createReminder,
  fetchReminder,
  updateReminder,
  deleteReminder,
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

router.get("/", getReminders);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createReminder
);
router.put(
  "/update/:reminderId",
  passport.authenticate("jwt", { session: false }),
  updateReminder
);
router.delete(
  "/:reminderId",
  passport.authenticate("jwt", { session: false }),
  deleteReminder
);
module.exports = router;
