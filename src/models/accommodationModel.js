import mongoose from 'mongoose';

const AccommodationSchema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        accommodationType: {
            type: String,
            enum:['hotel', 'airbnb', 'b&b'],
            required: true
        },
        accommodationName: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        link: {
            type: String
        },
        notes: {
            type: String
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

export default mongoose.model('Accommodation', AccommodationSchema);
