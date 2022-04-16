import Accommodation from '../../../models/accommodationModel.js'
import { UserInputError, ValidationError } from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";


export const accommodationGetById = async (_, {accommodationId, destinationId}) => {
    try {
        if(!Validate.mongoId.check(accommodationId)) throw ApiError.NotFound();

        const accommodation = await Accommodation.findOne({ _id: accommodationId, destination:destinationId });

        if (!accommodation) throw new ValidationError('No Accommodation found by provided ID');

        return accommodation;

    } catch (e) {
        throw new UserInputError(e);
    }
};
