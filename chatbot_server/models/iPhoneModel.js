const mongoose = require("mongoose");

const iPhoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    url: {
      type: String,
      required: [true, 'Product URL is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    salePrice: {
      type: Number,
      required: [true, 'Sale price is required'],
    },
    mrp: {
      type: Number,
      required: [true, 'MRP is required'],
    },
    discountPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    upc: {
      type: String,
      required: [true, 'UPC is required'],
    },
    starRating: {
      type: Number,
      required: [true, 'Star rating is required'],
      min: 0,
      max: 5,
    },
    ram: {
      type: String,
      required: [true, 'RAM information is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("iPhoneModel", iPhoneSchema);
