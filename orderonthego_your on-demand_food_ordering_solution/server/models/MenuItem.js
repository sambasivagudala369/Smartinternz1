const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name:         { type: String, required: true, trim: true },
    description:  { type: String, default: "" },
    price:        { type: Number, required: true, min: 0 },
    mrp:          { type: Number, required: true, min: 0 },
    image:        { type: String, default: "" },
    category:     { type: String, default: "General" },
    type:         { type: String, enum: ["Veg", "Non Veg", "Egg"], default: "Veg" },
    rating:       { type: Number, default: 4.0, min: 0, max: 5 },
    reviews:      { type: Number, default: 0 },
    available:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
