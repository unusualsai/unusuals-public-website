import React, { forwardRef } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from '../FormGroup/styles.module.scss';
import FormBase from '../FormGroup/FormBase';
const classNameFnc = new CssClassNames(moduledStyles, [ 'utility', 'transition', 'text' ]).className;

export const Textarea = forwardRef(({
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
    ...props
}, ref) => (
    <FormBase
        wrapperClassName={wrapperClassName}
        labelClassName={labelClassName}
        validatorClassName={validatorClassName}
        name={name}
        label={label}
        error={error}
        success={success}
    >
        <textarea 
            ref={ref}
            id={name}
            name={name}
            placeholder={placeholder}
            aria-label={label ? label : (placeholder ? placeholder : '')}
            {...value && { value }}
            {...defaultValue && { defaultValue }}
            {...disabled && { disabled }}
            {...classNameFnc([
                'form-control',
                size ? `form-control-${size}` : '',
                error ? 'is-invalid' : '',
                success ? 'is-valid': '',
                className ? className : ''
            ].join(' '))}
            {...props}
        />
    </FormBase>
));