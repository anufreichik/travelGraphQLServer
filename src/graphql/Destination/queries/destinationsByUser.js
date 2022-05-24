import Destination from "../../../models/destinationModel.js";
import {UserInputError} from "apollo-server-express";

export const destinationsGetByUser = async (_, {owner}) => {
    try {

        const destinations = await Destination.find({ owner: owner })
            .populate({ path: 'destinationFood destinationActivity' })
            .sort({ createdAt: -1 })

        return destinations;

    } catch (e) {
        throw new UserInputError(e);
    }
};
