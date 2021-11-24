import React, { forwardRef } from 'react';

import CssClassNames from '../../scss/CssClassNames';

import style from './style.module.scss';

const classNameFnc = new CssClassNames(style, ['utility', 'text']).className;

export const Spinner = forwardRef(
    (
        {
            bsPrefix = 'spinner',
            variant,
            animation = 'border',
            size,
            children,
            as: Component = 'div',
            className,
            ...props
        },
        ref,
    ) => {
        const bsSpinnerPrefix = `${bsPrefix}-${animation}`;

        return (
            <Component
                ref={ref}
                {...props}
                className={[
                    style[bsSpinnerPrefix],
                    classNameFnc(
                        [
                            size && `${bsSpinnerPrefix}-${size}`,
                            variant && `text-${variant}`,
                            className ? className : '',
                        ].join(' '),
                    ).className,
                ].join(' ')}>
                {children}
                <span {...classNameFnc('sr-only')}>Loading...</span>
            </Component>
        );
    },
);
