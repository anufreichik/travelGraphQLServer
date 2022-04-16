import Activity from '../../../models/activityModel.js'
import { UserInputError } from 'apollo-server-express';


export const activitiesGetByDestination = async (
    root,
    { destinationId }
) => {
    try {
        const activities = await Activity.find({destination:destinationId});

        return activities;

    } catch (e) {
        throw new UserInputError(e);
    }
};
