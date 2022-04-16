import Accommodation from "../../../models/accommodationModel.js";
import { UserInputError } from 'apollo-server-express';
import {checkAuth} from "../../../utils/check-auth.js";
import mongoose from "mongoose";
import Destination from "../../../models/destinationModel.js";


export const accommodationCreate = async (root, { values },context) => {
    try {
        const user = checkAuth(context);
        const newID =  new mongoose.Types.ObjectId();

        const newAccommodation = new Accommodation({ ...values,  _id: newID, owner: user._id });

        await newAccommodation.save();
        await  Destination.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(values.destination) },
            { $push: {destinationAccommodation:newID} });



        return newAccommodation;

    } catch (e) {
        throw new UserInputError(e);
    }
};
