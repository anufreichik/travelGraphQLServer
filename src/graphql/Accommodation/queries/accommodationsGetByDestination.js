import Accommodation from '../../../models/accommodationModel.js'
import { UserInputError } from 'apollo-server-express';


export const accommodationsGetByDestination = async (
    root,
    { destinationId }
) => {
    try {
        const accommodations = await Accommodation.find({destination:destinationId});

        return accommodations;

    } catch (e) {
        throw new UserInputError(e);
    }
};
