export default function isMobile() {
    return typeof window !== 'undefined' && window.innerWidth < 992;
}