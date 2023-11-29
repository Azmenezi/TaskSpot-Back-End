const { model, Schema } = require("mongoose");

const ReminderSchema = new Schema(
  {
    text: { type: String, unique: true, required: true },
    done: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    from: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Reminder", ReminderSchema);
