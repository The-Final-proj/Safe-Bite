const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    allergens: {
      type: [String],
      default: [],
    },

    freeFrom: {
      type: [String],
      default: [],
    },

    customAllergens: {
      type: [String],
      default: [],
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// optional: prevent duplicate product per supplier
productSchema.index({ name: 1, supplier: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);