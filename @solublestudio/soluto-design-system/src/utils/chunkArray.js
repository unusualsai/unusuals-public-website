export default function chunkArray(array, chunk = 3) {
    let i, j, newArray = [];
    for (i = 0, j = array.length; i < j; i += chunk) {
        newArray.push(array.slice(i, i + chunk));
    }
    
    return newArray;
}