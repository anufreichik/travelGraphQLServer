import Food from '../../../models/foodModel.js'
import { UserInputError } from 'apollo-server-express';


export const foodPlacesGetByDestination = async (
    root,
    { destinationId }
) => {
    try {
       // const count = await Food.countDocuments({ destination: destinationId });

        const foodPlaces = await Food.find({destination:destinationId});

        return foodPlaces;

    } catch (e) {
        throw new UserInputError(e);
    }
};
