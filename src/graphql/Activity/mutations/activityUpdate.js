import Activity from '../../../models/activityModel.js'
import { UserInputError } from 'apollo-server-express';
import ApiError from "../../../utils/apiError.js";
import {Validate} from "../../../utils/validation.js";
import {checkAuth} from "../../../utils/check-auth.js";

export const activityUpdate = async (_, { activityId, values }, context) => {
    try {
        const user = checkAuth(context);

        if (!Validate.mongoId.check(activityId)) throw ApiError.NotFound();

        const activity = await Activity.findOneAndUpdate(
            { _id: activityId },
            { $set: values },
            { new: true },
        );

        if (!activity) throw ApiError.BadRequest('Activity not exist with provided ID');

        return activity;
    } catch (e) {
        throw new UserInputError(e);
    }
};
