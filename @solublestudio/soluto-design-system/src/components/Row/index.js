import React, { forwardRef } from 'react';

import getDataProps from '../../utils/getDataProps';

import CssClassNames from '../../scss/CssClassNames';

import moduledStyles from '../Container/styles.module.scss';

const { className, getCssProp } = new CssClassNames(moduledStyles, ['utility']);

export const Row = forwardRef(({ children, noGutters, ...props }, ref) => (
    <div
        ref={ref}
        {...getDataProps(props)}
        {...className(
            `${props.className || ''} row ${
                noGutters ? 'no-gutters' : ''
            } ${getCssProp(props, ['pt', 'pb', 'mb', 'mt'])}`,
        )}>
        {children}
    </div>
));
