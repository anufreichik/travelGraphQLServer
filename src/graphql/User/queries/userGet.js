import User from '../../../models/userModel.js';
import { UserInputError } from 'apollo-server';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";


export const userGet = async (_, { userId }, { userData}) => {
    try {

        if(!Validate.mongoId.check(userId)) throw ApiError.NotFound();

        const user = await User.findById(userId);

        if (!user) throw ApiError.NotFound();

        return {
            ...user._doc
        };

    } catch (e) {
        throw new UserInputError(e);
    }
};
