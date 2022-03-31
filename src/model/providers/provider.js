import mongoose from "mongoose";

const Provider = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },

    Phonenumber: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    Direction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("provider", Provider);
