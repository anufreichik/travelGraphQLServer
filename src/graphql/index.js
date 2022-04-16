import {makeExecutableSchema} from "@graphql-tools/schema";
import merge from 'lodash.merge';

import {destinationResolvers} from "./Destination/destinationResolver.js";
import {destinationTypes} from "./Destination/destinationTypes.js";
import {userResolvers} from "./User/userResovers.js";
import {userTypes} from "./User/userTypes.js";
import {foodResolvers} from "./Food/foodResolvers.js";
import {foodTypes} from "./Food/foodTypes.js";
import {activityTypes} from "./Activity/activityTypes.js";
import {activityResolvers} from "./Activity/activityResolvers.js";
import {accommodationTypes} from "./Accommodation/accommodationTypes.js";
import {accommodationResolvers} from "./Accommodation/accommodationResolvers.js";


// Multiple files to keep your project modularised
export const schema = makeExecutableSchema({
    typeDefs: [
        userTypes,
        destinationTypes,
        foodTypes,
        activityTypes,
        accommodationTypes
    ],
    resolvers: merge(
        userResolvers,
        destinationResolvers,
        foodResolvers,
        activityResolvers,
        accommodationResolvers
    ),
});
