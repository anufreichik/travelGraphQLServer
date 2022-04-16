import Activity from '../../../models/activityModel.js'
import { UserInputError } from 'apollo-server-express';
import {checkAuth} from "../../../utils/check-auth.js";
import mongoose from "mongoose";
import Destination from "../../../models/destinationModel.js";


export const activityCreate = async (root, { values },context) => {
    try {
        const user = checkAuth(context);
        const newID =  new mongoose.Types.ObjectId();
        const activity = new Activity({ ...values,  _id: newID, owner: user._id });

        await activity.save();

        await  Destination.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(values.destination) },
            { $push: {destinationActivity:newID} });

        return activity;

    } catch (e) {
        throw new UserInputError(e);
    }
};
