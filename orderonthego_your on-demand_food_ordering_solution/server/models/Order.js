const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItemId:   { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  name:         { type: String, required: true },
  price:        { type: Number, required: true },
  mrp:          { type: Number, required: true },
  quantity:     { type: Number, required: true, min: 1 },
  image:        { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
  {
    userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId:   { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    restaurantName: { type: String, required: true },
    items:          [orderItemSchema],
    totalPrice:     { type: Number, required: true },
    mrpTotal:       { type: Number, required: true },
    deliveryCharge: { type: Number, default: 50 },
    finalPrice:     { type: Number, required: true },
    paymentMode:    { type: String, enum: ["cod", "upi", "card", "wallet"], default: "cod" },
    deliveryAddress:{ type: String, required: true },
    status: {
      type: String,
      enum: ["order placed", "confirmed", "preparing", "out for delivery", "delivered", "cancelled"],
      default: "order placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
