const express = require("express");
const {
  getCategories,
  createCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
} = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.param("categoryId", async (req, res, next, categoryId) => {
  try {
    const foundCategory = await fetchCategory(categoryId);
    if (!foundCategory)
      return next({ status: 404, message: "Category not found" });
    req.category = foundCategory;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getCategories);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
router.put(
  "/update/:categoryId",
  passport.authenticate("jwt", { session: false }),
  updateCategory
);
router.delete(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);
module.exports = router;
