export default function getDataProps(props) {
    const result = {};
    const dataArray = Object.keys(props).filter(key => key.startsWith('data-'));
    
    dataArray.forEach(key => {
        result[key] = props[key];
    });

    return result;
}