import HttpError from "../helpers/HttpError.js";

const isEmptyBody = (req, res, next)=> {
    if(!Object.keys(req.body).length) {
        return next(HttpError(400, "Not found object fields"))
    }
    next();
}

export default isEmptyBody;