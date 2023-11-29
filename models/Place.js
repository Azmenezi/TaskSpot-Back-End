const { model, Schema } = require("mongoose");

const PlaceSchema = new Schema({
  name: { type: String, unique: true, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Place", PlaceSchema);
