import getWindowScroll from './getWindowScroll';
import animate from './animate';

export default function animateScroll(yScrollPoint, extra = 0, speed = 0.1) {
    const currentScroll = getWindowScroll();
    const toY = yScrollPoint < 5 ? 0 : yScrollPoint + extra;
    
    animate(
        window.document.scrollingElement || window.document.documentElement, 
        'scrollTop', 
        '',
        currentScroll.y || 0,
        toY || 0,
        Math.abs(toY - currentScroll.y) * speed,
        true
    );
}