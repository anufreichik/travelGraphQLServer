import mongoose from 'mongoose';
import Activity from './activityModel.js';
import Food from './foodModel.js';
import Accommodation from './accommodationModel.js';

const DestinationSchema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        destinationName: {
            type: String,
            required: true
        },
        destinationDescription: {
            type: String
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
//cascade delete handle
DestinationSchema.pre('remove', async function (next){
    const destination = this
    await Activity.deleteMany({destination:destination._id});
    await Food.deleteMany({destination:destination._id});
    await Accommodation.deleteMany({destination:destination._id});
    next();
})


export default mongoose.model('Destination', DestinationSchema);
