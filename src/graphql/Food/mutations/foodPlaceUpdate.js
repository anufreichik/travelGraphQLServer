import Food from '../../../models/foodModel.js';
import { UserInputError } from 'apollo-server-express';
import ApiError from "../../../utils/apiError.js";
import {Validate} from "../../../utils/validation.js";
import {checkAuth} from "../../../utils/check-auth.js";

export const foodPlaceUpdate = async (_, { foodPlaceId, values }, context) => {
    try {
        const user = checkAuth(context);

        if (!Validate.mongoId.check(foodPlaceId)) throw ApiError.NotFound();

        const foodPlace = await Food.findOneAndUpdate(
            { _id: foodPlaceId },
            { $set: values },
            { new: true },
        );

        if (!foodPlace) throw ApiError.BadRequest('Food Place not exist with provided ID');

        return foodPlace;
    } catch (e) {
        throw new UserInputError(e);
    }
};
