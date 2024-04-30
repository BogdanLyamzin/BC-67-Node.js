import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "663109c07ddb453a0fb10b37"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const {id} = jwt.verify(token, JWT_SECRET);
    // console.log(id)
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzEwOWMwN2RkYjQ1M2EwZmIxMGIzNyIsImlhdCI6MTcxNDQ5MDU1NywiZXhwIjoxNzE0NTczMzU3fQ.jSjVoBAyvu_VacOzjDtYHUJFSunFOicpqlO_741YRTK";
    jwt.verify(invalidToken, JWT_SECRET);

}
catch(error) {
    console.log(error.message);
}


