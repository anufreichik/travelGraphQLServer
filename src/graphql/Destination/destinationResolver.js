
import {destinationGet} from "./queries/destinationGet.js";
import {destinationGetAll} from "./queries/destinationGetAll.js";
import {destinationsGetByUser} from "./queries/destinationsByUser.js";
import {destinationDelete} from "./mutations/destinationDelete.js";
import {destinationCreate} from "./mutations/destinationCreate.js";
import {destinationUpdate} from "./mutations/destinationUpdate.js";
import {destinationUpdateStarred} from "./mutations/destinationUpdateStarred.js";

export const destinationResolvers = {
    Query: {
        destination: destinationGet,
        destinations: destinationGetAll,
        userdestinations: destinationsGetByUser,
    },
    Mutation: {
        destinationCreate: destinationCreate,
        destinationDelete: destinationDelete,
        destinationUpdate: destinationUpdate,
        destinationUpdateStarred:destinationUpdateStarred,
    }
};
