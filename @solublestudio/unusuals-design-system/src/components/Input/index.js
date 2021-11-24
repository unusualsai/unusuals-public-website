import React, { forwardRef } from 'react';

import {
    className as classNameFnc,
    Input as RBCInput,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

const FormInput = forwardRef(
    (
        {
            placeholder = '',
            label = '',
            transparent = false,
            type = 'text',
            name = 'input',
            dark = false,
            required = false,
            error,
            className,
            wrapperClassName,
            ...props
        },
        ref,
    ) => {
        return (
            <RBCInput
                ref={ref}
                label={label}
                name={name}
                type={type}
                placeholder={placeholder}
                error={error}
                required={required}
                className={[
                    style.input,
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

const Input = forwardRef(({ submit = false, ...props }, ref) => {
    return submit ? (
        <div {...classNameFnc('d-flex')}>
            <FormInput
                ref={ref}
                {...props}
                wrapperClassName={`flex-grow-1 ${
                    props.wrapperClassName ? props.wrapperClassName : ''
                }`}
            />
            <button type="submit" className={style.submit} />
        </div>
    ) : (
        <FormInput ref={ref} {...props} />
    );
});

export default Input;
