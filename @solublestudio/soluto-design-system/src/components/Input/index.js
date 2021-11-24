import React, { forwardRef } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from '../FormGroup/styles.module.scss';
import FormBase from '../FormGroup/FormBase';
const classNameFnc = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
    'text',
]).className;

export const Input = forwardRef(
    (
        {
            type = 'text',
            className,
            wrapperClassName,
            labelClassName,
            validatorClassName,
            name = '',
            label,
            placeholder = '',
            value,
            defaultValue,
            error,
            success,
            size,
            disabled,
            previousContent,
            laterContent,
            ...props
        },
        ref,
    ) => (
        <FormBase
            wrapperClassName={wrapperClassName}
            labelClassName={labelClassName}
            validatorClassName={validatorClassName}
            name={name}
            label={label}
            error={error}
            success={success}>
            {previousContent ? previousContent : null}
            <input
                ref={ref}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                aria-label={label ? label : placeholder ? placeholder : ''}
                {...(value && { value })}
                {...(defaultValue && { defaultValue })}
                {...(disabled && { disabled })}
                {...classNameFnc(
                    [
                        'form-control',
                        size ? `form-control-${size}` : '',
                        error ? 'is-invalid' : '',
                        success ? 'is-valid' : '',
                        className ? className : '',
                    ].join(' '),
                )}
                {...props}
            />
            {laterContent ? laterContent : null}
        </FormBase>
    ),
);
