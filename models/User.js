const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
