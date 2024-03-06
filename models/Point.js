const { model, Schema } = require("mongoose");

const PointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
    default: [0, 0],
  },
});

module.exports = model("Point", PointSchema);
