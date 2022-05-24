import mongoose from "mongoose";

const Customer = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },

    Lastname: {
      type: String,
      required: true,
      trim: true,
    },

    Age: {
      type: String,
      required: true,
    },

    Phonenumber: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("customer", Customer);
