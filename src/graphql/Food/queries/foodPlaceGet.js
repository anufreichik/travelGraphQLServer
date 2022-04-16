import Food from '../../../models/foodModel.js'
import { UserInputError, ValidationError } from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";


export const foodPlaceGet = async (_, {foodPlaceId, destinationId}) => {
    try {
        if(!Validate.mongoId.check(foodPlaceId)) throw ApiError.NotFound();

        const foodPlace = await Food.findOne({ _id: foodPlaceId, destination:destinationId });

        if (!foodPlace) throw new ValidationError('No Destination found by provided ID');

        return foodPlace;

    } catch (e) {
        throw new UserInputError(e);
    }
};
