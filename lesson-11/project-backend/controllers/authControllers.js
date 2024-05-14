import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";

const {BASE_URL} = process.env;

const {JWT_SECRET} = process.env;

const signup = async(req, res)=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const verificationCode = nanoid();
    
    const newUser = await authServices.signup({...req.body, verificationCode});

    const verificationEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`
    }

    await sendEmail(verificationEmail);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await authServices.findUser({verificationCode});
    if(!user) {
        throw HttpError(404, "Email not found or alreadt verify");
    }
    await authServices.updateUser({_id: user._id}, {verify: true, verificationCode: ""});

    res.json({
        message: "Email verify success"
    })
}

const resendEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(404, "User not found");
    }

    if(user.verify) {
        throw HttpError(400, "Email already verify");
    }

    const verificationEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`
    }

    await sendEmail(verificationEmail);

    res.json({
        message: "Verify email send"
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw HttpError(401, "Email not verify");
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
    verify: ctrlWrapper(verify),
    resendEmail: ctrlWrapper(resendEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}