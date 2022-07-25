import Activity from '../../../models/activityModel.js'
import {AuthenticationError, UserInputError, ValidationError} from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";
import {checkAuth} from "../../../utils/check-auth.js";
import Destination from "../../../models/destinationModel.js";
import mongoose from "mongoose";


export const activityDelete = async (root, {activityId}, context) => {
    try {
        const user = checkAuth(context);

        if(!Validate.mongoId.check(activityId)) throw ApiError.NotFound();

        const activity = await Activity.findById(activityId);

        if (!activity) throw new ValidationError('No Activity found by provided ID');

        if(user._id===activity.owner.toString())
        {
            await activity.delete();

            await Destination.findOneAndUpdate({_id: mongoose.Types.ObjectId(activity.destination)},
                {$pull: {destinationFood: activityId}},
                {new: true},);
            return 'Activity deleted successfully';
        }
        else{
            throw new AuthenticationError('Action not allowed');
        }


    } catch (e) {
        throw new UserInputError(e);
    }
};
