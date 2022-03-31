import mongoose from 'mongoose';

const Vendors = mongoose.Schema(
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

        PhoneNumber: {
            type: String,
            required: true,
        },

        NameOfCompany: {
            type: String,
            required: true,
        },
        
        Sales: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("vendors", Vendors);