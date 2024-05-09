import calcWeightIndex from "./calcWeightIndex.js";

/*
1. Given weight in kg in height in metr.
2. Return (weight / (height * height)) round 2.
3. If given invalid data throw error with correct message.

90, 1.9 => 24.93
1.9, 90 => error 'Weight must be 1 argument and height - 2'
 => error 'weight and height required'
'90', '1.9' => error 'weight and height must be number'
-90, 1.9 => error 'weight and heiht must be integer'
*/

describe("test calcWeightInex function", ()=> {
    test("90, 1.9 => 24.93", ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);
        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    return this.result === value;
                }
            }
        }
        */
    })

    test("1.9, 90 => error 'Weight must be 1 argument and height - 2'", ()=> {
        expect(() => calcWeightIndex(1.9, 90)).toThrow('Weight must be 1 argument and height - 2');
    })

    test(" => error 'weight and height required'", ()=> {
        expect(() => calcWeightIndex()).toThrow('weight and height required');
    })

    it("'90', '1.9' => error 'weight and height must be number'", ()=> {
        expect(() => calcWeightIndex('90', '1.9')).toThrow('weight and height must be number');
    })

    test("-90, 1.9 => error 'weight and heiht must be integer'", ()=> {
        expect(() => calcWeightIndex(-90, 1.9)).toThrow('weight and heiht must be integer');
    })
})