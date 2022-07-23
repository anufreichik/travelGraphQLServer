import Food from '../../../models/foodModel.js';
import {AuthenticationError, UserInputError, ValidationError} from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";
import {checkAuth} from "../../../utils/check-auth.js";
import Destination from "../../../models/destinationModel.js";
import mongoose from "mongoose";


export const foodPlaceDelete = async (root, {foodPlaceId}, context) => {
    try {
        const user = checkAuth(context);

        if(!Validate.mongoId.check(foodPlaceId)) throw ApiError.NotFound();

        const foodPlace = await Food.findById(foodPlaceId);

        if (!foodPlace) throw new ValidationError('No Food Place found by provided ID');

        if(user._id===foodPlace.owner.toString())
        {
            await foodPlace.delete();
            await Destination.findOneAndUpdate({_id: mongoose.Types.ObjectId(foodPlace.destination)},
                {$pull: {destinationFood: foodPlaceId}},
                {new: true},);
            return 'Food Place deleted successfully';
        }
        else{
            throw new AuthenticationError('Action not allowed');
        }


    } catch (e) {
        throw new UserInputError(e);
    }
};
