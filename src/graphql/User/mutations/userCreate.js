import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../../../models/userModel.js';
import {UserInputError} from 'apollo-server-express';
import { validateRegisterInput} from "../../../utils/validation.js";
import jwt from 'jsonwebtoken';

function generateToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            firstName: user.firstName
        },
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );
}

export const userCreate = async (_,
                                 {
                                     registerInput: {email, password, firstName, lastName}
                                 }) => {


        // Validate user data
        const { valid, errors } = validateRegisterInput(
            firstName,
            email,
            password
        );
        if (!valid) {
            throw new UserInputError('Errors', { errors });
        }

        // TODO: Make sure user doesnt already exist
        const user = await User.findOne({email});
        if (user) {
            throw new UserInputError('Email is taken', {
                errors: {
                    username: 'This email is taken'
                }
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            firstName: firstName || email,
            lastName: lastName,
            password: hashPassword
        });

        const res = await newUser.save();

        const token = generateToken(res);


        return {
            ...res._doc,
            _id: res._id,
            token
        };

};
