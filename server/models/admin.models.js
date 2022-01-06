const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const AdminSchema = new Schema(
  {
    firstName: { type: String, maxlength: 64 },
    lastName: { type: String, maxlength: 64 },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, maxlength: 1024 },
    isManager: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: true },
  },
  { timestamps: true }
);
AdminSchema.plugin(uniqueValidator, { message: "Admin not unique" });
module.exports = mongoose.model("Admin", AdminSchema);
