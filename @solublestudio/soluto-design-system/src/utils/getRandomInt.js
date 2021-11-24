export default function getRandomInt(prefix = '') {
    const min = Math.ceil(10000);
    const max = Math.floor(99999);
    return `${prefix}${Math.floor(Math.random() * (max - min + 1)) + min}`;
}