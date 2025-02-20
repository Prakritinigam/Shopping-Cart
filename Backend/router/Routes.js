const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const Cart = require("../models/shoppingSchema");
const order = require("../models/OrderSchema");

router.get("/test", (req, res) => {
  console.log("Test Route Hit!");
  res.send("Test Route Working!");
});

router.get("/fetch_products", async (req, res) => {
  console.log("Route /fetch_products hit!");

  try {
    console.log("🔄 Fetching data from FakeStoreAPI...");
    const response = await axios.get("https://fakestoreapi.com/products");

    console.log("📩 Response Status:", response.status);

    if (response.status !== 200) {
      throw new Error(` Failed to fetch products. Status: ${response.status}`);
    }

    const data = response.data;
    N;
    console.log("Data received:", data.length, "items");

    if (data.length > 0) {
      await Cart.insertMany(data);
      console.log(" Data inserted into MongoDB");
    }

    res.status(200).json({ message: "Data fetched and stored" });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Cart.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products from DB:", error.message);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

router.post("/orderPlaced", async (req, res) => {
  try {
    const { cartItems, totalPrice } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "cart is empty" });
    }

    const newOrder = new order({ cartItems, totalPrice });
    await newOrder.save();
    return res.status(200).json({ msg: "Order placed" });
  } catch (error) {
    console.error("failed !!", error);
    return res.Status(500).json({ error: "failed " });
  }
});

module.exports = router;
