import {validateLoginInput} from "../../../utils/validation.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../../../models/userModel.js';
import {UserInputError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';

function generateToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            firstName: user.firstName
        },
        process.env.SECRET_KEY,
        {expiresIn: '10d'}
    );
}


export const userLogin = async (_, {email, password}) => {
    const { errors, valid } = validateLoginInput(email, password);


    if (!valid) {
        throw new UserInputError('Errors', { errors });
    }

    const user = await User.findOne({ email });

    if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
    }

    const token = generateToken(user);

    return {
        ...user._doc,
        _id: user._id,
        token
    };
}
