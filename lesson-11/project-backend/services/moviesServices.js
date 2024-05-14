import Movie from "../models/Movie.js";

export const getAllMovies = ({filter = {}, fields, setting = {}})=> 
    Movie.find(filter, fields, setting).populate("owner", "username email");

export const getMovie = filter => Movie.findOne(filter);

export const addMovie = (data)=> Movie.create(data);

export const updateMovie = (filter, data)=> Movie.findOneAndUpdate(filter, data);

export const deleteMovie = async (filter)=> Movie.findOneAndDelete(filter);