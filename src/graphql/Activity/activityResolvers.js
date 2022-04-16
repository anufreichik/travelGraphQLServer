import {activityGetById} from "./queries/activityGetById.js";
import {activitiesGetByDestination} from "./queries/activitiesGetByDestination.js";
import {activityCreate} from "./mutations/activityCreate.js";
import {activityDelete} from "./mutations/activityDelete.js";
import {activityUpdate} from "./mutations/activityUpdate.js";

export const activityResolvers = {
    Query: {
        activity: activityGetById,
        activities: activitiesGetByDestination,
    },
    Mutation: {
        activityCreate: activityCreate,
        activityDelete: activityDelete,
        activityUpdate: activityUpdate,
    }
};
