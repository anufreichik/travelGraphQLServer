import mongoose from 'mongoose';
const FoodSchema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        foodType: {
            type: String,
            required: true
        },
        foodPlaceName: {
            type: String,
            required: true
        },
        address:{
            type:String
        },
        notes:{
            type:String
        },
        link:{
            type:String
        },
        destination:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Destination',
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },

    { timestamps: {}, versionKey: false },
);

export default mongoose.model('Food', FoodSchema);
