import Destination from '../../../models/destinationModel.js';
import { UserInputError, ValidationError } from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";


export const destinationGet = async (_, {destinationId}) => {
    try {
        if(!Validate.mongoId.check(destinationId)) throw ApiError.NotFound();

        const destination = await Destination.findOne({ _id: destinationId })
            .populate({ path: 'destinationFood destinationActivity destinationAccommodation' });

        if (!destination) throw new ValidationError('No Destination found by provided ID');

        return destination;

    } catch (e) {
        throw new UserInputError(e);
    }
};
