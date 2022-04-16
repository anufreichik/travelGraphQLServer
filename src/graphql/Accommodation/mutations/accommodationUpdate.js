import Accommodation from '../../../models/accommodationModel.js'
import { UserInputError } from 'apollo-server-express';
import ApiError from "../../../utils/apiError.js";
import {Validate} from "../../../utils/validation.js";
import {checkAuth} from "../../../utils/check-auth.js";

export const accommodationUpdate = async (_, { accommodationId, values }, context) => {
    try {
        const user = checkAuth(context);

        if (!Validate.mongoId.check(accommodationId)) throw ApiError.NotFound();

        const accommodation = await Accommodation.findOneAndUpdate(
            { _id: accommodationId },
            { $set: values },
            { new: true },
        );

        if (!accommodation) throw ApiError.BadRequest('Activity not exist with provided ID');

        return accommodation;
    } catch (e) {
        throw new UserInputError(e);
    }
};
