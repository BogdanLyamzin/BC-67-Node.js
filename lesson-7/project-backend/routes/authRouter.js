import express from "express";

import authControllers from "../controllers/authControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import { userSignupSchema, userSigninSchema } from "../schemas/authSchemas.js";

import validateBody from "../decorators/validateBody.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupSchema), authControllers.signup);

authRouter.post("/signin", isEmptyBody, validateBody(userSigninSchema), authControllers.signin);

export default authRouter;