import Movie from "../models/Movie.js";

export const getAllMovies = ({filter = {}, fields, setting = {}})=> Movie.find(filter, fields, setting);

export const getMovieById = async (_id)=> {
    // const result = await Movie.findOne({_id});
    const result = Movie.findById(_id);
    return result;
}

export const addMovie = (data)=> Movie.create(data);

export const updateMovieById = (id, data)=> Movie.findByIdAndUpdate(id, data);

export const deleteMovieById = async (id)=> Movie.findByIdAndDelete(id);