export default function() {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.innerHeight;
}