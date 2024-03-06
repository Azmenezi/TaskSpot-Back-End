const Category = require("../../models/Category");
const Place = require("../../models/Place");
const User = require("../../models/User");

exports.fetchPlace = async (placeId, next) => {
  try {
    const foundPlace = await User.findById(placeId);
    return foundPlace;
  } catch (error) {
    return next(error);
  }
};

exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find().select("-__v");
    return res.status(200).json(places);
  } catch (error) {
    return next(error);
  }
};

exports.createPlace = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "category not found!" });
    const newPlace = await Place.create({
      ...req.body,
      category: category._id,
    });
    res.status(201).json({ newPlace });
  } catch (error) {
    return next(error);
  }
};

exports.updatePlace = async (req, res, next) => {
  try {
    await req.user.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deletePlace = async (req, res, next) => {
  try {
    await Place.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.getNearbyPlaces = async (req, res, next) => {
  try {
    const radius = 500;
    const nearbyPlaces = await Place.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: req.user.location.coordinates, // Longitude first, Latitude second
          },
          $maxDistance: radius,
          $minDistance: 0,
        },
      },
    }).populate("category");

    return res.status(200).json({ nearbyPlaces, radius });
  } catch (error) {
    next(error);
  }
};
