import React from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const classNameFnc = new CssClassNames(moduledStyles, ['utility']).className;
import styles from '../Container/styles.module.scss';

export const GridContainer = ({
    children,
    className,
    noGutters,
    Tag = 'div',
}) => {
    return (
        <Tag
            {...classNameFnc(
                [
                    'wrapper',
                    noGutters ? styles['no-gutters'] : '',
                    className ? className : '',
                ].join(' '),
            )}>
            {children}
        </Tag>
    );
};
