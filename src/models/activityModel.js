import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        activityType: {
            type: String,
            enum: ['general', 'hiking', 'art', 'sport'],
            required: true
        },
        activityName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        notes: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: false
        },
        destination: {
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

    {timestamps: {}, versionKey: false},
);

export default mongoose.model('Activity', ActivitySchema);
