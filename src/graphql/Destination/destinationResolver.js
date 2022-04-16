
import {destinationGet} from "./queries/destinationGet.js";
import {destinationGetAll} from "./queries/destinationGetAll.js";
import {destinationDelete} from "./mutations/destinationDelete.js";
import {destinationCreate} from "./mutations/destinationCreate.js";
import {destinationUpdate} from "./mutations/destinationUpdate.js";

export const destinationResolvers = {
    Query: {
        destination: destinationGet,
        destinations: destinationGetAll,
    },
    Mutation: {
        destinationCreate: destinationCreate,
        destinationDelete: destinationDelete,
        destinationUpdate: destinationUpdate,
    }
};
