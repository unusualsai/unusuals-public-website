import React from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, ['utility']);

export const Section = ({ children, Tag = 'section', ...props }) => (
    <Tag
        {...props}
        {...className(`${props.className || ''} ${moduledStyles.section}`)}>
        {children}
    </Tag>
);
