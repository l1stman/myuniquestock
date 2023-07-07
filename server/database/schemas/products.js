const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unqiue: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    defualt: "none",
  },
  quantity: {
    type: Number,
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  editedAt: {
    type: Date,
    default: null,
  },
});

const Product = mongoose.model("Product", ProductSchema);

// Export the Product model
module.exports = Product;
