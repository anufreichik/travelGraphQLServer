import { UserInputError } from 'apollo-server';
import User from '../../../models/userModel.js';

export const userGetAll = async (_, { offset, limit }, { userData}) => {
    try {

        const totalCount = await User.count({ isActivated: true });

        const users = await User.find({ isActivated: true })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        return users;
    } catch (e) {
        throw new UserInputError(e);
    }
};
