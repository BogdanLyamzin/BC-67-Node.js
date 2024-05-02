import bcrypt from "bcrypt";

import User from "../models/User.js";

export const findUser = filter => User.findOne(filter);

export const signup = async (data)=> {
    const {password} = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return User.create({...data, password: hashPassword});
}

export const comparePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword);

export const updateUser = (filter, data)=> User.findOneAndUpdate(filter, data);