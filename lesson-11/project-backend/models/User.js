import {Schema, model} from "mongoose";

import {handleSaveError, setUpdateSetting} from "./hooks.js";

import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    }
}, {versionKey: false, timestamps: true});

userSchema.pre("findOneAndUpdate", setUpdateSetting);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
