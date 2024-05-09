import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  smell: { type: Array, default: ["сандал", "пралине", "ваниль"] },
  hairType: {
    type: Array,
    default: [
      "нормальные",
      "тонкие",
      "сухие",
      "поврежденные",
      "окрашенные",
      "жесткие",
      "вьющиеся",
      "непослушные",
    ],
  },
  fixationDegree: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("product", productSchema);
