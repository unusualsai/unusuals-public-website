export default function hasScrollbar() {
    if (typeof window === 'undefined') {
        return false;
    }

    window.document.body.style.overflowY = 'scroll';
    const hasScrollBar = window.innerWidth > document.documentElement.clientWidth;
    window.document.body.style.overflowY = null;

    return hasScrollBar;
}