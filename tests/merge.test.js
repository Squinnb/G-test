import {merge} from "../merge"
import dataTwo from "../src/data2.json"

test("Returns one array of theme park data", ()=> {
    const arr1 = dataTwo.slice(0,100);
    const arr2 = dataTwo.slice(400, 500);
    expect(merge(arr1, arr2).length === 200)
})
