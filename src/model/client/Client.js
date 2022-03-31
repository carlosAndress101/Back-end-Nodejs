import mongoose from "mongoose";

const Client = mongoose.Schema(
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
      type: Number,
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

    Password: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("client", Client);
