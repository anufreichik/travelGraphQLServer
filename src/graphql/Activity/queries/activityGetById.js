import Activity from '../../../models/activityModel.js'
import { UserInputError, ValidationError } from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";


export const activityGetById = async (_, {activityId, destinationId}) => {
    try {
        if(!Validate.mongoId.check(activityId)) throw ApiError.NotFound();

        const activity = await Activity.findOne({ _id: activityId, destination:destinationId });

        if (!activity) throw new ValidationError('No Activity found by provided ID');

        return activity;

    } catch (e) {
        throw new UserInputError(e);
    }
};
