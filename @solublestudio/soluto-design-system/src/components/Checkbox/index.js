import React, { forwardRef } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from '../FormGroup/styles.module.scss';
import FormBase from '../FormGroup/FormBase';
const classNameFnc = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
    'text',
]).className;

export const Checkbox = forwardRef(
    (
        {
            className,
            wrapperClassName,
            labelClassName,
            validatorClassName,
            name = '',
            label,
            checked,
            defaultChecked,
            error,
            disabled,
            id,
            isRadio,
            isSwitch,
            ...props
        },
        ref,
    ) => (
        <FormBase
            wrapperClassName={`${
                wrapperClassName ? wrapperClassName : ''
            } custom-control ${isRadio ? 'custom-radio' : ''} ${
                isSwitch ? 'custom-switch' : ''
            } ${!isRadio && !isSwitch ? 'custom-checkbox' : ''}`}
            validatorClassName={validatorClassName}
            error={error}>
            <input
                ref={ref}
                type={isRadio ? 'radio' : 'checkbox'}
                {...classNameFnc(
                    `custom-control-input ${className ? className : ''} ${
                        error ? 'is-invalid' : ''
                    }`,
                )}
                id={isRadio ? id : name}
                name={name}
                {...(disabled && { disabled })}
                {...(checked && { checked: true })}
                {...(defaultChecked && { defaultChecked: true })}
                {...props}
            />
            <label
                {...classNameFnc(`custom-control-label ${labelClassName}`)}
                htmlFor={isRadio ? id : name}
                dangerouslySetInnerHTML={{ __html: label }}
            />
        </FormBase>
    ),
);
