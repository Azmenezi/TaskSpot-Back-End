const express = require("express");
const {
  getPlaces,
  createPlace,
  fetchPlace,
  updatePlace,
  deletePlace,
  getNearbyPlaces,
} = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.param("placeId", async (req, res, next, placeId) => {
  try {
    const foundPlace = await fetchPlace(placeId);
    if (!foundPlace) return next({ status: 404, message: "Place not found" });
    req.place = foundPlace;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getPlaces);

router.get(
  "/nearby",
  passport.authenticate("jwt", { session: false }),
  getNearbyPlaces
);
router.post(
  "/create/:categoryId",
  passport.authenticate("jwt", { session: false }),
  createPlace
);
router.put(
  "/update/:placeId",
  passport.authenticate("jwt", { session: false }),
  updatePlace
);
router.delete(
  "/:placeId",
  passport.authenticate("jwt", { session: false }),
  deletePlace
);
module.exports = router;
