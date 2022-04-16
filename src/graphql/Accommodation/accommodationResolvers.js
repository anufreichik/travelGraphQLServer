import {accommodationCreate} from "./mutations/accommodationCreate.js";
import {accommodationUpdate} from "./mutations/accommodationUpdate.js";
import {accommodationDelete} from "./mutations/accommodationDelete.js";
import {accommodationGetById} from "./queries/accommodationGetById.js";
import {accommodationsGetByDestination} from "./queries/accommodationsGetByDestination.js";

export const accommodationResolvers = {
    Query: {
        accommodation: accommodationGetById,
        accommodations: accommodationsGetByDestination,
    },
    Mutation: {
        accommodationCreate: accommodationCreate,
        accommodationDelete: accommodationDelete,
        accommodationUpdate: accommodationUpdate,
    }
};
