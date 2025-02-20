const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  qty: { type: Number, default: 1 },
});
const Cart = mongoose.model("cart", shoppingSchema);
module.exports = Cart;
