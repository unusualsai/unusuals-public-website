export default function animate(elem, style, unit, from, to, time, prop) {
    if (!elem) {
        return;
    }

    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from))+unit;
            } else {
                elem.style[style] = (from + step * (to - from))+unit;
            }
            if (step === 1) {
                clearInterval(timer);
            }
        }, 15);

    if (prop) {
        elem[style] = from+unit;
    } else {
        elem.style[style] = from+unit;
    }
}