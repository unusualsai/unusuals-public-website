export default function listToMatrix(list, elementsPerSubArray) {
    let matrix = [],
        k = -1;
    list.forEach((el, i) => {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    });
    return matrix;
}
