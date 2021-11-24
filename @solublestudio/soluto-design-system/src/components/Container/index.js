import React from 'react';

import hasScrollbar from '../../utils/hasScrollbar';
import getDataProps from '../../utils/getDataProps';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className, getCssProp } = new CssClassNames(moduledStyles, ['utility']);

if (hasScrollbar() && typeof window !== 'undefined' && window.document) {
    window.document.body.dataset.scrollbar = 'true';
}

export const Container = ({ children, isFluid = false, ...props }) => (
    <div
        {...getDataProps(props)}
        {...className(
            `${props.className || ''} ${
                isFluid ? 'container-fluid' : 'container'
            } ${getCssProp(props, ['pt', 'pb', 'pr', 'mb', 'mt'])}`,
        )}>
        {children}
    </div>
);
