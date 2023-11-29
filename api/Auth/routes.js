const express = require("express");
const {
  getUsers,
  register,
  login,
  updateUser,
  deleteUser,
  fetchUser,
  checkUsername,
} = require("./controllers");
const { hashing } = require("../../middlewares/password/password");
const router = express.Router();
const passport = require("passport");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.user = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getUsers);
router.post("/register", hashing, register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.put(
  "/update/:userId",
  passport.authenticate("jwt", { session: false }),
  hashing,
  updateUser
);
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);
router.put("/username", checkUsername);
module.exports = router;
