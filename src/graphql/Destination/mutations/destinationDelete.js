import Destination from '../../../models/destinationModel.js';
import {AuthenticationError, UserInputError, ValidationError} from 'apollo-server-express';
import {Validate} from "../../../utils/validation.js";
import ApiError from "../../../utils/apiError.js";
import {checkAuth} from "../../../utils/check-auth.js";


export const destinationDelete = async (root, {destinationId}, context) => {
    try {
        const user = checkAuth(context);

        if(!Validate.mongoId.check(destinationId)) throw ApiError.NotFound();

        const destination = await Destination.findById(destinationId);

        if (!destination) throw new ValidationError('No Destination found by provided ID');

        if(user._id===destination.owner)
        {
            await destination.delete();

            return 'Destination deleted successfully';
        }
        else{
            throw new AuthenticationError('Action not allowed');
        }


    } catch (e) {
        throw new UserInputError(e);
    }
};
