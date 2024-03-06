const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, ref: "Place" }],
});

module.exports = model("Category", CategorySchema);
