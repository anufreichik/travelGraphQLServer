import mongoose from 'mongoose';
import ActivityModel from "./activityModel.js";
import FoodModel from "./foodModel.js";

const DestinationSchema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        destinationName: {
            type: String,
            required: true
        },

        destinationFood: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
            },
        ],
        destinationAccommodation: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Accommodation',
            },
        ],
        destinationActivity: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Activity',
            },
        ],
        images:[
            {type: String}
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },

    {timestamps: {}, versionKey: false},
);

export default mongoose.model('Destination', DestinationSchema);
