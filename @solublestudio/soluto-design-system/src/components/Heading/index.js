import React from 'react';
  
import CssClassNames from '../../scss/CssClassNames';
const { className, getCssProp } = new CssClassNames({}, [ 'utility', 'text' ]);

export const Heading = ({ children, tag, mt, mb, pt, pb, parentRef, ...props }) => {
    const Tag = [ 'h1','h2','h3','h4','h5','h6','p','span','div' ].includes(tag) ? tag : 'p';
    
    return (
        <Tag 
            {...parentRef && { ref: parentRef }}
            {...props}
            {...className(`${props.className ? props.className : ''} ${tag === 'span' ? 'd-block' : ''} ${getCssProp({ mt, mb, pt, pb }, [ 'mt', 'mb', 'pt', 'pb' ])}`)} 
            dangerouslySetInnerHTML={{ __html: children }}
        />
    )
};