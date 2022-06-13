import mongoose from "mongoose";

const Productos = mongoose.Schema({

    Imagen:{
      type: String,
      require: true,
      trim: true,
    },
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
