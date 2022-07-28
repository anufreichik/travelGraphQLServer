import Destination from '../../../models/destinationModel.js';
import { UserInputError } from 'apollo-server-express';
import {checkAuth} from "../../../utils/check-auth.js";
import mongoose from "mongoose";
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";
import User from "../../../models/userModel.js";

export const destinationUpdateStarred = async (root, { destinationId, userId }, context) => {
    try {

        if (!Validate.mongoId.check(destinationId)) throw ApiError.NotFound();

        let user = await User.findOne({ _id: userId });
        const isDestinationStarred = user.starredDestinations.includes(destinationId);

        let userOptions;
        if (isDestinationStarred) userOptions = { $pull: { starredDestinations: destinationId } };
        else userOptions = { $addToSet: { starredDestinations: destinationId } };

        user = await User.findOneAndUpdate({ _id: userId }, userOptions);

        let destination = await Destination.findOne({_id:destinationId});
        const isUserStarredDestination = destination.starredBy.includes(userId);

        let destOptions;
        if (isUserStarredDestination) destOptions = { $pull: { starredBy: userId } };
        else destOptions = { $addToSet: { starredBy: userId } };

        destination = await Destination.findOneAndUpdate(
            { _id: destinationId }, destOptions
        ).populate({ path: 'destinationFood destinationActivity destinationAccommodation' });

        if (!destination) throw ApiError.BadRequest('Destination not exist with provided ID');

        return destination;
    } catch (e) {
        throw new UserInputError(e);
    }
};
