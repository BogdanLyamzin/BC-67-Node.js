const calcWeightIndex = (weight, height)=> {
    if(weight === undefined ||height === undefined) {
        throw new Error('weight and height required');
    }

    if(typeof weight !== "number" || typeof height !== "number") {
        throw new Error('weight and height must be number');
    }

    if(weight <= 0 || height <= 0 ) {
        throw new Error('weight and heiht must be integer');
    }

    if(weight < height) {
        throw new Error('Weight must be 1 argument and height - 2');
    }

    const result = (weight / (height ** 2)).toFixed(2);
    return Number(result);
}

export default calcWeightIndex;