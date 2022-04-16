import Food from '../../../models/foodModel.js';
import { UserInputError } from 'apollo-server-express';
import {checkAuth} from "../../../utils/check-auth.js";
import mongoose from "mongoose";
import Destination from "../../../models/destinationModel.js";



export const foodPlaceCreate = async (root, { values },context) => {
    try {
        const user = checkAuth(context);

        const newID =  new mongoose.Types.ObjectId();
        const foodPlace = new Food({ ...values,  _id: newID, owner: user._id });

        await foodPlace.save();

        await  Destination.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(values.destination) },
            { $push: {destinationFood:newID} });


        return foodPlace;

    } catch (e) {
        throw new UserInputError(e);
    }
};
