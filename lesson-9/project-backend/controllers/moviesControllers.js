import fs from "fs/promises";
import path from "path";

import * as moviesServices from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const postersPath = path.resolve("public", "posters");

const getAll = async (req, res) => {
    const fields = "-createdAt -updatedAt";
    const {_id: owner} = req.user;
    const filter = {owner};
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const setting = {skip, limit};
    const result = await moviesServices.getAllMovies({filter, fields, setting});

    res.json(result);
}

const getById = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await moviesServices.getMovie({owner, _id});
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const add = async (req, res) => {
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(postersPath, filename);
    await fs.rename(oldPath, newPath);

    const poster = path.join("posters", filename);
    const {_id: owner} = req.user;
    const result = await moviesServices.addMovie({...req.body, owner, poster});

    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await moviesServices.updateMovie({owner, _id}, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await moviesServices.deleteMovie({owner, _id});
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}