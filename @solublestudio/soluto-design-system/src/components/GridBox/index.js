import React from 'react';

import CssClassNames from '../../scss/CssClassNames';
const { className: classNameFnc, getCssProp } = new CssClassNames({}, [
    'utility',
    'text',
]);

import styles from '../Container/styles.module.scss';

export const GridBox = ({
    children,
    html,
    className,
    Tag = 'div',
    atts,
    onClick,
    ...props
}) => {
    return (
        <Tag
            onClick={onClick ?? null}
            {...classNameFnc(
                [
                    styles['col-gutter'],
                    ...getCssProp(props, ['pl', 'pr', 'pt', 'pb'])
                        .split(' ')
                        .filter((cls) => !!cls.trim())
                        .map((cls) => styles[cls.trim()]),
                    className ? className : '',
                ].join(' '),
            )}
            {...(atts ? atts : {})}
            {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}>
            {children}
        </Tag>
    );
};
