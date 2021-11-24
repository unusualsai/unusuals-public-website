import React from 'react';

import getDataProps from '../../utils/getDataProps';

import CssClassNames from '../../scss/CssClassNames';
const { className, getCssProp } = new CssClassNames({}, [ 'text', 'utility' ]);

export const Text = ({ children, tag, addBreaklines = true, style, ...props }) => {
    let Tag = [ 'p', 'span', 'div', 'li', 'blockquote' ].includes(tag) ? tag : 'span';

    return (
        <Tag 
            {...getDataProps(props)} 
            {...className(`
                ${props.className || ''}
                ${getCssProp(props, [ 'mt', 'mb' ])}
            `)}
            style={style ? style : null}
            dangerouslySetInnerHTML={{
                __html: children ? (addBreaklines ? children.replace(/(?:\r\n|\r|\n)/g, '<br>') : children) : ''
            }} 
        />
    )
}