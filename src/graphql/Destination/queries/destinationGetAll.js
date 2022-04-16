import Destination from '../../../models/destinationModel.js';
import { UserInputError } from 'apollo-server-express';


export const destinationGetAll = async (
    root,
    { offset, limit }
) => {
    try {

        const totalCount = await Destination.count();

        const destinations = await Destination.find()
            //.populate('destinationFood destinationActivity')
            .populate('destinationFood')
            .populate('destinationActivity')
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        return {
            list: destinations,
            hasPrev: offset >= limit,
            hasNext: offset < totalCount - limit,
            totalPages: Math.round(totalCount / limit),
            totalCount,
        };

    } catch (e) {
        throw new UserInputError(e);
    }
};
