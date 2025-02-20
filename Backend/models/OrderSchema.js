const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      id: String,
      title: String,
      price: Number,
      qty: { type: Number },
      image: String,
    },
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
