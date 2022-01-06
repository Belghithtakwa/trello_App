const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");
const CompanySchema = new Schema(
  {
    companyName: {
      type: String,
      maxLength: 512,
      unique: true,
      required: true,
      index: true,
    },
    companySlug: {
      type: String,
      maxLength: 1024,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: { type: String },
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Manager" }],
    canDeliver: { type: Boolean, default: true },
    
  },
  { timestamps: true }
);
RestaurantSchema.plugin(uniqueValidator, { message: "Restaurant not unique" });
RestaurantSchema.pre("validate", function (next) {
  if (!this.restaurantSlug) {
    this.slugify();
  }
  next();
});
RestaurantSchema.methods.slugify = function () {
  this.restaurantSlug =
    slug(this.restaurantName) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Restaurant", RestaurantSchema);
