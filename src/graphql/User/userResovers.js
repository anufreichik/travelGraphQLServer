import {userGet} from "./queries/userGet.js";
import {userGetAll} from "./queries/userGetAll.js";
import {userCreate} from "./mutations/userCreate.js";
import {userLogin} from "./mutations/userLogin.js";

export const userResolvers = {
    Query: {
        user: userGet,
        users: userGetAll,
    },
    Mutation: {
        userCreate: userCreate,
        userLogin:userLogin
    },

};
