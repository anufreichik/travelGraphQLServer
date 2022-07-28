import mongoose from 'mongoose';
import {Validate} from "../utils/validation.js";

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        email: {
            type: String,
            required: [true, "Email required"],
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: Validate.email.check,
                message: Validate.email.error
            },
        },

        password: {
            type: String,
            trim: true,
            required: [true, "Password required"],
        },

        firstName: {
            type: String,
            trim: true,
            required: [true, "First Name required"],
            default: '',
            validate: {
                validator: Validate.userSingleName.check,
                message: Validate.userSingleName.error
            },
        },

        lastName: {
            type: String,
            trim: true,
            default: '',
            validate: {
                validator: Validate.userSingleName.check,
                message: Validate.userSingleName.error
            },
        },

        lastAccess: {
            type: Date,
            default: Date.now
        },

        starredDestinations:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Destination',
            },
        ],
    },

    { timestamps: {}, versionKey: false },
);

export default mongoose.model('User', userSchema);
