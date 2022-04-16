import Accommodation from '../../../models/accommodationModel.js'
import {AuthenticationError, UserInputError, ValidationError} from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";
import {checkAuth} from "../../../utils/check-auth.js";
import Destination from "../../../models/destinationModel.js";
import mongoose from "mongoose";


export const accommodationDelete = async (root, {accommodationId}, context) => {
    try {
        const user = checkAuth(context);

        if (!Validate.mongoId.check(accommodationId)) throw ApiError.NotFound();

        const accommodation = await Accommodation.findById(accommodationId);

        if (!accommodation) throw new ValidationError('No Accommodation found by provided ID');

        if (user._id === accommodation.owner) {
            await accommodation.delete();
            //remove id from destination model destinattionAccommodation
            await Destination.findOneAndUpdate({_id: mongoose.Types.ObjectId(accommodation.destination)},
                {$pull: {destinationAccommodation: accommodationId}},
                {new: true},);
            return 'Accommodation deleted successfully';
        } else {
            throw new AuthenticationError('Action not allowed');
        }


    } catch (e) {
        throw new UserInputError(e);
    }
};
