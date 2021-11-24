import React, { forwardRef } from 'react';

import {
    className as classNameFnc,
    Textarea as RBCTextarea,
} from '@solublestudio/soluto-design-system';

import style from '../Input/style.module.scss';

const Textarea = forwardRef(
    (
        {
            placeholder = '',
            label = '',
            transparent = true,
            name = 'input',
            dark = false,
            error,
            className,
            wrapperClassName,
            ...props
        },
        ref,
    ) => {
        return (
            <RBCTextarea
                ref={ref}
                label={label}
                name={name}
                placeholder={placeholder}
                error={error}
                className={[
                    style.input,
                    transparent ? style.transparent : '',
                    dark ? style.dark : '',
                    label ? style['with-label'] : '',
                    className ? className : '',
                ].join(' ')}
                wrapperClassName={wrapperClassName ? wrapperClassName : ''}
                labelClassName={
                    classNameFnc(`caption ${style.label}`).className
                }
                {...props}
            />
        );
    },
);

export default Textarea;
