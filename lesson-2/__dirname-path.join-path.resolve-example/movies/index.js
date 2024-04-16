import fs from "fs/promises";

export const getAllMovies = async ()=> {
    const data = await fs.readFile("./movies/movies.json", "utf-8");
    return JSON.parse(data);
}

const getMovieById = ()=> {

}

export const addMovie = ()=> {

}