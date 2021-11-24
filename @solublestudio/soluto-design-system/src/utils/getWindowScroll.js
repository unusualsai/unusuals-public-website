export default function getWindowScroll() {
    if (typeof window === 'undefined' || typeof window.document === 'undefined') {
        return { x: 0, y: 0 };
    }

    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((window.document.compatMode || '') === 'CSS1Compat');
    
    return {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? window.document.documentElement.scrollLeft : window.document.body.scrollLeft,
        y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? window.document.documentElement.scrollTop : window.document.body.scrollTop
    }
}