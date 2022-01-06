const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = new Schema(
  {
    firstName: { type: String, maxlength: 64 },
    lastName: { type: String, maxlength: 64 },
    phoneNumber: {
      type: String,
      maxLength: 16,
      required: true,
      unique: true,
      index: true,
    },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, maxlength: 1024 },
    isManager: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isAdmin: {type: Boolean, default: false}
  },
  { timestamps: true }
);
UserSchema.plugin(uniqueValidator, { message: "User not unique" });
module.exports = mongoose.model("User", UserSchema);
