import {foodPlaceGet} from "./queries/foodPlaceGet.js";
import {foodPlacesGetByDestination} from "./queries/foodPlacesGetByDestination.js";
import {foodPlaceCreate} from "./mutations/foodPlaceCreate.js";
import {foodPlaceDelete} from "./mutations/foodPlaceDelete.js";
import {foodPlaceUpdate} from "./mutations/foodPlaceUpdate.js";

export const foodResolvers = {
    Query: {
        foodPlace: foodPlaceGet,
        foodPlaces: foodPlacesGetByDestination,
    },
    Mutation: {
        foodPlaceCreate: foodPlaceCreate,
        foodPlaceDelete: foodPlaceDelete,
        foodPlaceUpdate: foodPlaceUpdate,
    }
};
