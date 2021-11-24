import React, { forwardRef } from 'react';

import getDataProps from '../../utils/getDataProps';

import CssClassNames from '../../scss/CssClassNames';

import moduledStyles from '../Container/styles.module.scss';

const { className, getCssProp } = new CssClassNames(moduledStyles, ['utility']);

export const Col = forwardRef(({ children, animate, style, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...getDataProps(props)}
            {...className(
                `col col-gutter ${props.className || ''} ${
                    props.col ? getCssProp(props, 'col') : 'col-12'
                } ${getCssProp(props, [
                    'offset',
                    'order',
                    'pl',
                    'pr',
                    'pt',
                    'pb',
                    'mt',
                    'mb',
                ])}`,
            )}
            {...animate}
            style={style ? style : null}>
            {children}
        </div>
    );
});
