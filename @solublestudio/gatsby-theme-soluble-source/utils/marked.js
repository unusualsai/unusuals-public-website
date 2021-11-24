const marked =  require('marked');

marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false
});

function getMarkedText(text) {
    return text ? marked(text).replace(/\n$/, '') : '';
}

function getMarkedTextWithoutWrapper(text) {
    return text ? getMarkedText(text).replace(/<p>|<\/p>/g, '').trim() : '';
}

function getTextWithoutWrapper(text) {
    return text ? getTextWithoutBreaklinesAround(text.replace(/<p[^>]*>|<\/p>/g, '')) : '';
}

function getTextWithoutAnyWrapper(text) {
    return text ? getTextWithoutBreaklinesAround(text.replace(/<p[^>]*>|<\/p>|<h1[^>]*>|<\/h1>|<h2[^>]*>|<\/h2>|<h3[^>]*>|<\/h3>|<h4[^>]*>|<\/h4>|<h5[^>]*>|<\/h5>|<h6[^>]*>|<\/h6>/g, '')) : '';
}

function getTextWithoutBreaklines(text) {
    return text ? getTextWithoutBreaklinesAround(text.replace(/\r?\n|\r/, "")) : '';
}

function getTextWithoutBreaklinesAround(text) {
    return text ? text.trim() : ''
}

function changeFontStyleItalicWithITag(text) {
    if (!text) {
        return '';
    }

    [ ...text.matchAll(/<span[^f]+font-style:\s?italic[^>]+>([^<]+)<\/[^>]+>/gm) ].forEach(match => {
        text = text.replace(match[0], `<i>${match[1]}</i>`);
    });

    return text;
}

function changeFontWeightBoldWithBTag(text) {
    if (!text) {
        return '';
    }

    [ ...text.matchAll(/<span[^f]+font-weight:\s?bold[^>]+>([^<]+)<\/[^>]+>/gm) ].forEach(match => {
        text = text.replace(match[0], `<b>${match[1]}</b>`);
    });

    return text;
}

function changePaddingLeftWithPDataDetached(text) {
    if (!text) {
        return '';
    }

    [ ...text.matchAll(/<p style="padding-left:\s?[4|8|12]0px;">(.*?)<\/p>/gm) ].forEach(match => {
        text = text.replace(match[0], `<p data-detached="true">${match[1]}</p>`);
    });

    return text;
}

function removeStyleTags(text) {
    if (!text) {
        return '';
    }

    return text.replace(/\sstyle=\"[^"]+"\s?/gm, '');
}

module.exports.getMarkedText = getMarkedText;
module.exports.getMarkedTextWithoutWrapper = getMarkedTextWithoutWrapper;
module.exports.getTextWithoutWrapper = getTextWithoutWrapper;
module.exports.getTextWithoutAnyWrapper = getTextWithoutAnyWrapper;
module.exports.getTextWithoutBreaklines = getTextWithoutBreaklines;
module.exports.getTextWithoutBreaklinesAround = getTextWithoutBreaklinesAround;
module.exports.changeFontStyleItalicWithITag = changeFontStyleItalicWithITag;
module.exports.removeStyleTags = removeStyleTags;
module.exports.changeFontWeightBoldWithBTag = changeFontWeightBoldWithBTag;
module.exports.changePaddingLeftWithPDataDetached = changePaddingLeftWithPDataDetached;