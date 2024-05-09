import Joi from "joi";

import { genreList, releaseYearRegexp } from "../constants/movie-constants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    favorte: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
});

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorte: Joi.boolean(),
    genre: Joi.string().valid(...genreList),
    releaseYear: Joi.string().pattern(releaseYearRegexp),
})