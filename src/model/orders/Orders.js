import mongoose from 'mongoose';

const Orders = mongoose.Schema(
    {
        NumberOfClient: {
            type: String,
            required: true,
        },
        dataOfOrder: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("order", Orders);