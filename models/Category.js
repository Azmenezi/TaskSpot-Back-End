const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  type: { type: String, unique: true, required: true },
  places: [{ type: Schema.Types.ObjectId, ref: "Place" }],
});

module.exports = model("Category", CategorySchema);
