import mongoose from "mongoose";

const Admin = mongoose.Schema(
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
            type: Number,
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
    { timetamps: true },
);

export default mongoose.model("admin", Admin);