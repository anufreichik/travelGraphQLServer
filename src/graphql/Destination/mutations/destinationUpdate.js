import Destination from '../../../models/destinationModel.js';
import { UserInputError } from 'apollo-server-express';
import ApiError from "../../../utils/apiError.js";
import {Validate} from "../../../utils/validation.js";

export const destinationUpdate = async (_, { destinationId, values }, { userData }) => {
    try {

        if (!Validate.mongoId.check(destinationId)) throw ApiError.NotFound();

        const destination = await Destination.findOneAndUpdate(
            { _id: destinationId },
            { $set: values },
            { new: true },
        ).populate({ path: 'destinationFood destinationActivity destinationAccommodation' });

        if (!destination) throw ApiError.BadRequest('Destination not exist with provided ID');

        return destination;
    } catch (e) {
        throw new UserInputError(e);
    }
};
