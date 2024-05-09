import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

const signup = async(req, res)=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }
    
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await authServices.comparePassword(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;

    const payload = {id};

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await authServices.updateUser({_id: id}, {token});

    res.json({
        token,
    })
}

const getCurrent = async(req, res)=> {
    const {email, username} = req.user;

    res.json({
        email,
        username,
    })
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await authServices.updateUser({_id}, {token: ""});

    res.json({
        message: "Signout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}