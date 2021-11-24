import React  from 'react';

import CssClassNames from '../../scss/CssClassNames';
const { className, getCssProp } = new CssClassNames({}, [ 'utility' ]);

export const Spacer = (props) => (
    <div 
        {...className(`${getCssProp(props, [ 'pl', 'pr', 'pt', 'pb' ])}`)}
    />
);