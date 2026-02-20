const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    location:     { type: String, required: true },
    image:        { type: String, default: "" },           // URL or path
    rating:       { type: Number, default: 4.0, min: 0, max: 5 },
    deliveryTime: { type: String, default: "30-45 min" },
    minOrder:     { type: Number, default: 100 },
    cuisine:      [{ type: String }],
    popular:      { type: Boolean, default: false },
    approved:     { type: Boolean, default: false },
    ownerId:      { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // restaurant owner
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
