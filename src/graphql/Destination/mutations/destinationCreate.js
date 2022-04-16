import Destination from '../../../models/destinationModel.js';
import { UserInputError } from 'apollo-server-express';
import {checkAuth} from "../../../utils/check-auth.js";
import mongoose from "mongoose";


export const destinationCreate = async (root, { values },context) => {
    try {
        const user = checkAuth(context);
        //const destination = await Destination.create({ ...values,  _id: new mongoose.Types.ObjectId(), owner: user._id });
        const destination = new Destination({ ...values,  _id: new mongoose.Types.ObjectId(), owner: user._id });

        await destination.save();

        return await destination.populate({ path: 'destinationFood destinationActivity' });

    } catch (e) {
        throw new UserInputError(e);
    }
};
