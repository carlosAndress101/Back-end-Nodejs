import mongoose from "mongoose";

const Productos = mongoose.Schema({

    Name: {
      type: String,
      require: true,
      trim: true,
    },

    Ingredients: {
      type: String,
      required: true,
      trim: true,
    },

    Price: {
      type: Number,
      required:true,
    },

    Barcode: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
  
  );

export default mongoose.model("producto", Productos);
